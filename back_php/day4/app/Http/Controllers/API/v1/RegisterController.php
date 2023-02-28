<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tip\Register;// add use model

//import email class
use Illuminate\Support\Facades\Mail;
use App\Mail\RegisterSendEmail;
use App\Mail\Register as MailRegister;
use Illuminate\Support\Facades\Hash;

//import pdf
use Barryvdh\DomPDF\Facade\Pdf;


//jwt
// use Tymon\JWTAuth\Facades\JWTFactory;
// use JWTAuth;

class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['index','checkLogin','store','loadPDF','testEmail','destroy','show']]);
    }

    public function index(Request $request)
    {
        $status ="Success";
        $respHttp =200;

        $countTotal = Register::count();
        $registers = Register::select(
            'id',
            'title',
            'first_name',
            'last_name',
            'username',
            'password',
            'id_card',
            'email',
            'phone_number',
            'location1',
            'location2',
            'location3',
            'location4',
            'location5',
            'location6',
            )
            ->orderBy('id','desc')
        ->skip(0)
        ->take(10)
        ->get(); // use for pagination limit data row
        // dd($registers);
        return response()->json([
            'status'=>$status,
            'response'=>$respHttp,
            'data' =>$registers,
            'count_total'=>$countTotal,
        ],$respHttp);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $status ="Success";
        $respHttp =200;
        $jwt =null;
        $email =$request->email;  // send to this email
        $username = $request->username;
        $password = $request->password;

        $credentials = request(['username', 'password']);
        $datas = $request->all();
        $datas['password'] =bcrypt ($request->password);
        // dd($datas);
        $user = Register::create($datas);
        $token = auth()->fromUser($user);
        Mail::to($email)->send(new RegisterSendEmail($email,$username,$password));
        // return response()->json($request, $respHttp, $headers);
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }else{
            $jwt =$token;
        }
        return response()->json([
            'status'=>$status,
            'response'=>$respHttp,
            'token'=>$jwt,
            'detail'=>$request->all(),
            'username'=>$request->username,
        ],$respHttp);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id,Request $request)
    {
        $status ="Success";
        $respHttp =200;
        $header = $request->header('Authorization');
        // if()
        $register = Register::find($id);
        if(!$register){
            $status = "not found id";
            $respHttp =400;
        }
        return response()->json([
            'status'=>$status,
            'response'=>$respHttp,
            'data'=>$register,
            'header'=>$header,
        ],$respHttp);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $status ="Success";
        $respHttp =200;

        $register = Register::find($id);
        if($register){
            $register->update($request->all());
        }else{
            $status = "not found id";
            $respHttp =400;
        }

        return response()->json([
            'status'=>$status,
            'response'=>$respHttp,
        ],$respHttp);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $status ="Success";
        $respHttp =200;

        $register = Register::find($id);
        if($register){
            $register->delete();
        }else{
            $status = "not found id";
            $respHttp =400;
        }

        return response()->json([
            'status'=>$status,
            'response'=>$respHttp,
        ],$respHttp);
    }

    public function testEmail(){

        $datas = [];

        $registers = Register::all()->toArray();

        $pdf = Pdf::loadView('pdf.test', array('registers' => $registers));
        $email ="maharnnop.s@gmail.com";  // send to this email
        $username ="maharnnop.sri";
        $password = "123456";
        $data = [];
        $data['email'] = $email;
        $data['password'] = $password;
        $data['title'] = "policy";

        // \Mail::send('email.register-send-email', $data, function($message)use($data, $pdf) {
        //     $message->to($data["email"], $data["email"])
        //             ->subject($data["title"])
        //             ->attachData($pdf->output(), "text.pdf");
        // });
        Mail::to($email)->send(new RegisterSendEmail($email,$username,$password));
    }

    public function checkLogin(Request $request){
        $status ="Success";
        $respHttp =200;
        $jwt =null;
        $credentials = request(['username', 'password']);
        $username = $request->username;
        $register = Register::where('username',$username)->first();//use  get() --for collection output


        if($register){
            $password = $request->password;
            if (Hash::check($password, $register->password)) { // backslash for redirect for find origin directory
                if (! $token = auth()->attempt($credentials)) {
                    return response()->json(['error' => 'Unauthorized'], 403);
                }else{
                    $jwt =$token;
                }
                // return response()->json([
                //     'status'=>$status,
                //     'response'=>$respHttp,
                //     'register'=>$register,
                // ],$respHttp);
            }else{
                $status ="Password wrong";
                $respHttp =403;
            }

        }else{
            $status ="Not Found user";
            $respHttp =401;
            $username = "unknow";

        }

        return response()->json([
            'status'=>$status,
            'response'=>$respHttp,
            'token'=>$jwt,
            'username'=>$username,
        ],$respHttp);
    }

    public function loadPDF(){
        // dd(\Carbon\Carbon::now()->addYears(1)->format('Y-m-d'))
        // $data=[];
        $registers = Register::all()->toArray();
        // dd($registers);
        $pdf = Pdf::loadView('pdf.test', compact('registers')); // loadview pdf/index.blade.php
        // return $pdf->download('invoice.pdf');
        return $pdf->stream();
        // return view('pdf.index')->with('registers',$registers);
    }
}
