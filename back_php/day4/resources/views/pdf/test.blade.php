<!DOCTYPE html>
<html lang="en">

<head>
    <title>Bootstrap Example</title>
    {{-- <meta charset="utf-8"> --}}
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="{{ public_path() . '/pdf/bootstrap.min.css' }}">
    <script src="{{ public_path() . '/pdf/jquery.min.js' }}"></script>
    <script src="{{ public_path() . '/pdf/bootstrap.min.js' }}"></script>

    <style>

        .row {
            width: 100 px;
            display: flex;
            height: 40px;

        }
        div{
            font-size: 16px;
        }
        .border{
            border: 1px solid rgb(171, 171, 171);
        }
        .border-bottom{
            border-bottom: 1px solid rgb(171, 171, 171);
        }
        .header {
            height: 52px;
            text-align: center;
        }
        .center{
            text-align: center;
        }
        .col {
            width: 50px;
            padding: 10px;
        }
        th,td{
            padding-left: 10px
        }
        span{
            font-weight: bold;
font-size: 20px;
        }
        .banner,.footer{
            width: 680px;
            margin-bottom: 20px;
        }
        .footer{
            position:absolute;
            bottom: 0px;
        }
    </style>

</head>

<body>

    <div class="container">
        {{-- <img src="https://image.makewebeasy.net/makeweb/0/lOuJoJErT/z0001/%E0%B8%97%E0%B8%B4%E0%B8%9E%E0%B8%A2%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%A0%E0%B8%B1%E0%B8%A2_%E0%B9%83%E0%B8%9A%E0%B8%84%E0%B8%B3%E0%B8%82%E0%B8%AD%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B9%84%E0%B8%A7%E0%B8%A3%E0%B8%B1%E0%B8%AA%E0%B9%82%E0%B8%84%E0%B9%82%E0%B8%A3%E0%B8%99%E0%B8%B2_Page_1.jpg"
        style="width:90vw"> --}}
        <img class="banner" src="{{ url('/pdf/banner_pdf.jpg') }}" style="width:90vw">
        <div class="container border ">
            <div class="row border-bottom bg-info header">
                <div class="col-xs-12 ">
                    <span>ใบรับรองกรมธรรม์ประกันชีวิต แผน {{$datas['insure_name']}}</span>
                </div>
            </div>



            <div class="row">
                <div class="col-xs-1">
                    <p>1.รายละเอียดผู้ขอเอาประกันภัย</p>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-2">
                    คำนำหน้า {{$datas['title']}}
                </div>
                <div class="col-xs-5">
                    ชื่อ  {{$datas['first_name']}}
                </div>
                <div class="col-xs-5">
                    นามสกุล  {{$datas['last_name']}}
                </div>
            </div>
            <div class="row">
                <div class="col-xs-4">
                    วันเ/เดือน/ปีเกิด {{$datas['birth_date']}}
                </div>
                <div class="col-xs-5">
                    เลขที่บัตรประจำตัวประชาชน {{$datas['id_card']}}
                </div>

            </div>
            <div class="row">
                <div class="col-xs-2">
                    บ้านเลขที่ {{$datas['location1']}}
                </div>
                <div class="col-xs-3">
                    ถนน {{$datas['location2']}}
                </div>
                <div class="col-xs-3">
                    ตำบล {{$datas['location3']}}
                </div>
                <div class="col-xs-3">
                    อำเภอ {{$datas['location4']}}
                </div>
            </div>

            <div class="row border-bottom ">
                <div class="col-xs-3">
                    จังหวัด {{$datas['location5']}}
                </div>
                <div class="col-xs-3">
                    รหัสไปรษณีย์ {{$datas['location6']}}
                </div>
            </div>


            <div class="row">
                <div class="col-xs-1">
                    2.ผู้รับผลประโยชน์
                </div>
            </div>
            <div class="row border-bottom ">
                <div class="col-xs-3">
                    ชื่อ {{$datas['benify_first_name']}}
                </div>
                <div class="col-xs-3">
                    นามสกุล {{$datas['benify_last_name']}}
                </div>
                <div class="col-xs-4">
                    ความสัมพันธ์ {{$datas['benify_relation']}}
                </div>
            </div>
            <div class="row border-bottom ">
                <div class="col-xs-3">
                    3.ระยะเวลาเอาประกันภัย :
                </div>
                <div class="col-xs-3">
                    เริ่มต้นวันที่ {{$datas['cover_date']}}
                </div>
                <div class="col-xs-4">
                    สิ้นสุดวันที่ {{$datas['end_date']}}
                </div>
            </div>

            <div class="row  ">
                <div class="col-xs-1">
                    4.แผนประกันภัย/รายละเอียดความคุ้มครอง
                </div>
            </div>
            <table class="table table-condensed table-bordered  border-3">

                <thead>
                    <tr class="bg-info center">
                        <th >ข้อตกลงคุ้มครอง</th>
                        <th class="center">จำนวนเงินเอาประกัน (บาท)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>กรณีมีชีวิตอยู่จนครบอายุสัญญา รับเงินก้อนคืน</td>
                        <td class="center">{{$datas['return_alive']}}</td>
                    </tr>
                    <tr>
                        <td>กรณีเสียชีวิตภายในช่วงเอาประกัน</td>
                        <td class="center">{{$datas['return_dead']}}</td>

                    </tr>
                    <tr>
                        <td>กรณีทุพลภาพร้ายแรงถาวร</td>
                        <td class="center">{{$datas['return_disability']}}</td>

                    </tr>
                    <thead>
                        <tr class="bg-info">
                            <td>เบี้ยประกันชีวิตรวม (บาท)/คน/ปี </td>
                            <td class="center">{{$datas['premium']}}</td>

                        </tr>
                    </thead>
                </tbody>
            </table>
        </div>
        <img class="footer" src="{{ url('/pdf/footer_pdf.jpg') }}" style="width:90vw">
</body>

</html>
