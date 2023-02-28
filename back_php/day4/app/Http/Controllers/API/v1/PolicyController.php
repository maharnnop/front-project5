<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tip\Policy;// add use model
use App\Models\Tip\Register;
use App\Models\Tip\Insure;

//import email class
use Illuminate\Support\Facades\Mail;
use App\Mail\PolicySendEmail;


//import pdf
use Barryvdh\DomPDF\Facade\Pdf;

class PolicyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['index','store','destroy']]);
    }

    public function index()
    {
        $status ="Success";
        $respHttp =200;

        $countTotal = Policy::count();
        $policys = Policy::select(
            'id',
            'insure_id',
            'user_id',
            'agent_id',
            'title',
            'first_name',
            'last_name',
            'id_card',
            'email',
            'location1',
            'location2',
            'location3',
            'location4',
            'location5',
            'location6',
            'birth_date',
            'cover_date',
            'end_date',
            'premium',
            'benify_first_name',
            'benify_last_name',
            'benify_relation',
            )
            ->orderBy('id','desc')
        ->skip(0)
        // ->take(10)
        ->get(); // use for pagination limit data row
        // dd($policys);
        return response()->json([
            'status'=>$status,
            'response'=>$respHttp,
            'data' =>$policys,
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
        $email =$request->email;  // send to this email
        $first_name = $request->first_name;
        $last_name = $request->last_name;

        $datas = $request->all();
        $insure = Insure::find($request->insure_id);

        // dd($request->insure_id);
        Policy::create($datas);
        //is_draft = false send email comfirm
        if(!$request->is_draft){
            $datas['insure_name'] =$insure->name;
        $datas['return_alive'] =$insure->return_alive;
        $datas['return_dead'] =$insure->return_dead;
        $datas['return_disability'] =$insure->return_disability;
            Mail::to($email)->send(new PolicySendEmail($email,$datas));

        }
        // return response()->json($request, $respHttp, $headers);
        return response()->json([
            'status'=>$status,
            'response'=>$respHttp,
            'detail'=>$request->all()
        ],$respHttp);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $status ="Success";
        $respHttp =200;

        $policy = Policy::find($id);

        return response()->json([
            'status'=>$status,
            'response'=>$respHttp,
            'data'=>$policy,
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
        $email =$request->email;  // send to this email
        $datas = $request->all();
        $policy = Policy::find($id);
        $insure = Insure::find($request->insure_id);
        if($policy){
            if(!$request->is_draft){
                $datas['insure_name'] =$insure->name;
            $datas['return_alive'] =$insure->return_alive;
            $datas['return_dead'] =$insure->return_dead;
            $datas['return_disability'] =$insure->return_disability;
                Mail::to($email)->send(new PolicySendEmail($email,$datas));

            }
            $policy->update($request->all());
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

        $policy = Policy::find($id);
        if($policy){
            $policy->delete();
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
        $email ="maharnnop.s@gmail.com";  // send to this email

        $password = "123456";
        Mail::to($email)->send(new PolicySendEmail($email,$password));
    }

    public function loadPDF(){
        // dd(\Carbon\Carbon::now()->addYears(1)->format('Y-m-d'))
        // $data=[];
        $policys = Policy::all()->toArray();
        // dd($policys);
        $pdf = Pdf::loadView('pdf.index', compact('policys')); // loadview pdf/index.blade.php
        return $pdf->download('invoice.pdf');
    }
    public function userPolicy(Request $request)
    {
        $status ="Success";
        $respHttp =200;
        $userid = $request->user_id;
        $countTotal = Policy::count();
        // dd($request->all());
        $idCard = Register::select('id','id_card')->where('id', $userid)->first()->id_card;
        $policys = Policy::select(
            'id',
            'insure_id',
            'insure_name',
            'user_id',
            'agent_id',
            'title',
            'first_name',
            'last_name',
            'id_card',
            'email',
            'location1',
            'location2',
            'location3',
            'location4',
            'location5',
            'location6',
            'birth_date',
            'cover_date',
            'end_date',
            'premium',
            'benify_first_name',
            'benify_last_name',
            'benify_relation',
            )->where('is_draft',false)
            ->where(function($query) use ($userid,$idCard){
                $query->where('user_id', $userid)
                ->orWhere('id_card', $idCard);})
            ->orderBy('id','desc')
        ->skip(0)
        // ->take(10)
        ->get(); // use for pagination limit data row
        // dd($policys);
        return response()->json([
            'status'=>$status,
            'response'=>$respHttp,
            'data' =>$policys,
            'count_total'=>$countTotal,
        ],$respHttp);
    }
    public function userDraft(Request $request)
    {
        $status ="Success";
        $respHttp =200;
        $userid = $request->user_id;
        $countTotal = Policy::count();
        $idCard = Register::select('id','id_card')->where('id', $userid)->first()->id_card;
        // dd($idCard);
        $policys = Policy::select(
            'id',
            'insure_id',
            'insure_name',
            'user_id',
            'agent_id',
            'title',
            'first_name',
            'last_name',
            'id_card',
            'email',
            'location1',
            'location2',
            'location3',
            'location4',
            'location5',
            'location6',
            'birth_date',
            'cover_date',
            'end_date',
            'premium',
            'benify_first_name',
            'benify_last_name',
            'benify_relation',
            )->where('is_draft',true)
            ->where(function($query) use ($userid,$idCard) {
                $query->where('user_id', $userid)
                ->orWhere('id_card', $idCard);})
            ->orderBy('id','desc')
        ->skip(0)
        // ->take(10)
        ->get(); // use for pagination limit data row
        // dd($policys);
        return response()->json([
            'status'=>$status,
            'response'=>$respHttp,
            'data' =>$policys,
            'count_total'=>$countTotal,
        ],$respHttp);
    }
}
