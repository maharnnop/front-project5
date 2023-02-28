<!DOCTYPE html>
<html lang="en">

<head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>


   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('pdf/bootstrap.min.css') }}">
    <script src="{{  asset('/pdf/jquery.min.js') }}"></script>
    <script src="{{  asset('/pdf/bootstrap.min.js') }}"></script>
<style>


    @font-face {
    font-family: 'THSarabunNew';
    font-style: normal;
    font-weight: normal;
    src: url("{{ asset('fonts/THSarabunNew.ttf') }}") format('truetype');
}
    body {
        font-family: "THSarabunNew";
    }
    table{
    margin:10px;
}
.row{
    width: 100 px;
    display: flex;
    height:40px;
}
.header{
    height:80px;
    text-align: center;
}
.col{
    width:50px;
    padding: 10px;
}
</style>
<link rel="stylesheet" href="{{ public_path() . '/pdf/bootstrap.min.css' }}">
    <script src="{{ public_path() . '/pdf/jquery.min.js' }}"></script>
    <script src="{{ public_path() . '/pdf/bootstrap.min.js' }}"></script>
</head>

<body>
    <div class="container">
        {{-- <img src="https://image.makewebeasy.net/makeweb/0/lOuJoJErT/z0001/%E0%B8%97%E0%B8%B4%E0%B8%9E%E0%B8%A2%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%A0%E0%B8%B1%E0%B8%A2_%E0%B9%83%E0%B8%9A%E0%B8%84%E0%B8%B3%E0%B8%82%E0%B8%AD%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B9%84%E0%B8%A7%E0%B8%A3%E0%B8%B1%E0%B8%AA%E0%B9%82%E0%B8%84%E0%B9%82%E0%B8%A3%E0%B8%99%E0%B8%B2_Page_1.jpg"
            style="width:90vw"> --}}
        {{-- <img src="{{ url('/pdf/banner_pdf.jpg') }}" style="width:90vw"> --}}
        <div class="container border border-dark">
            <div class="row border border-dark header">
                <div class="col">
                    <h4>ใบคำขอเอาประกันภัย</h4>
                    <h4>กรมธรรม์ประกันชีวิต</h4>
                </div>
            </div>



            <div class="row">
                <div class="col">
                    <p>1.รายละเอียดผู้ขอเอาประกันภัย</p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    {{-- คำนำหน้า  --}} title
                </div>
                <div class="col">
                    {{-- ชื่อ --}} firstname
                </div>
                <div class="col">
                    นามสกุล
                </div>
            </div>
            <div class="row">
                <div class="col">
                    วันเ/เดือน/ปีเกิด
                </div>
                <div class="col">
                    เลขที่บัตรประจำตัวประชาชน
                </div>
                <div class="col">
                    อายุ ปี
                </div>

            </div>
            <div class="row">
                <div class="col">
                    บ้านเลขที่
                </div>
                <div class="col">
                    ถนน
                </div>
                <div class="col">
                    ตำบล
                </div>
                <div class="col">
                    อำเภอ
                </div>
            </div>

            <div class="row border-bottom border-dark">
                <div class="col">
                    จังหวัด
                </div>
                <div class="col">
                    รหัสไปรษณีย์
                </div>
                <div class="col">
                    เบอร์โทรศัพท์
                </div>
            </div>


        <div class="row">
            <div class="col">
                2.ผู้รับผลประโยชน์
            </div>
        </div>
        <div class="row border-bottom border-dark">
            <div class="col">
                ชื่อ
            </div>
            <div class="col">
                นามสกุล
            </div>
            <div class="col">
                ความสัมพันธ์
            </div>
        </div>
        <div class="row border-bottom border-dark">
            <div class="col">
                3.ระยะเวลาเอาประกันภัย :
            </div>
            <div class="col">
                เริ่มต้นวันที่
            </div>
            <div class="col">
                สิ้นสุดวันที่
            </div>
        </div>

        <div class="row border-bottom border-dark">
            <div class="col">
                4.แผนประกันภัย/รายละเอียดความคุ้มครอง
            </div>
        </div>
        <table class="table table-condensed table-bordered  border-3">

            <thead>
                <tr class="table-info">
                    <th>ข้อตกลงคุ้มครอง</th>
                    <th>จำนวนเงินเอาประกัน (บาท)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>กรณีมีชีวิตอยู่จนครบอายุสัญญา รับเงินก้อนคืน</td>
                    <td>30000 </td>
                </tr>
                <tr>
                    <td>กรณีเสียชีวิตภายในช่วงเอาประกัน</td>
                    <td>40000 </td>

                </tr>
                <tr>
                    <td>กรณีทุพลภาพร้ายแรงถาวร</td>
                    <td>50000 </td>

                </tr>
                <thead>
                    <tr class="table-info">
                        <td>เบี้ยประกันชีวิตรวม (บาท)/คน/ปี </td>
                        <td>500</td>

                    </tr>
                </thead>
                {{-- @foreach ($registers as $register)
      <tr>
        @foreach ($register as $key => $val)
        <td>{{$key}}</td>
        @endforeach
         <td>{{$register['first_name']}}</td>
          <td>{{$register['last_name']}}</td>
          <td>{{$register['email']}}</td>
         </tr>

      @endforeach  --}}
            </tbody>
        </table>
    </div>
    {{-- <img src="{{ url('/pdf/footer_pdf.jpg') }}" style="width:90vw"> --}}
</body>

</html>
