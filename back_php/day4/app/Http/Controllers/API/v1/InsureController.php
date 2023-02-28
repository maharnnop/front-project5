<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tip\Insure;// add use model

class InsureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function __construct() {
        $this->middleware('auth:api', ['except' => ['index','show']]);
    }
    public function index(Request $request)
    {
        $status ="Success";
        $respHttp =200;

        $countTotal = Insure::count();
        $registers = Insure::select(
            'id',
            'name',
        'descript',
        'premium',
        'period_day',
        'return_alive',
        'return_dead',
        'return_disability',
            )
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


        $datas = $request->all();
        // dd($datas);
        Insure::create($datas);
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

        $register = Insure::find($id);

        return response()->json([
            'status'=>$status,
            'response'=>$respHttp,
            'data'=>$register,
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

        $register = Insure::find($id);
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

        $register = Insure::find($id);
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
}
