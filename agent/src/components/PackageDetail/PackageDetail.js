import React, { useState, useEffect, useScript } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PackageDetail.css";
import jwt_decode from "jwt-decode";
import M from "materialize-css/dist/js/materialize.min.js";
import { useCookies } from "react-cookie";
const PackageDetail = (props) => {
  
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["userId", "username"]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [userlist, setUserlist] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [editData, setEditData] = useState({});
  const [insureData, setInsureDta] = useState({});
  const token = { Authorization: `Bearer ${cookies.userId}` }
  const url = "http://localhost:8085/";
  
  useEffect(() => {
    M.AutoInit();
    if (cookies.userId) {
      setEditData((prevState) => ({
        ...prevState,
        insureId: parseInt(params.id),
        agentId: parseInt(jwt_decode(cookies.userId).sub),
        isDraft: true,
      }));
      const agentId = parseInt( jwt_decode(cookies.userId).sub)
      axios.get(url + "agent-user/all/"+agentId,{headers: token})
      .then((res) => {
        console.log(res.data);
        const detail = res.data
        // const arr = [];
        // detail.map((ele) => {
        //     arr.push(<option  value={`${ele.id}`} >
        //         {ele.username}
        //       </option>)
        // });
        // setDataUser(arr);
        setDataUser(detail);
    })
        .catch((err) => {console.log(err);});
    }
    axios
      .get(url + "insure/"+parseInt(params.id))
      .then((res) => {
        console.log(res);
        setInsureDta(res.data);
        setEditData((prevState) => ({
          ...prevState,
          'premium': res.data.premium,
          'periodDay':res.data.periodDay,
          'insureName': res.data.name,
        }))
      })
      .catch((err) => {
          console.log(err);
      });
  }, []);

  //form state
  useEffect(()=>{
    setFormData(<form class="col s12" onSubmit={handleSubmit}>
    
    <div class="row">
     
      <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="title" name="title" onChange={handleChange} value={editData.title}/>
        <label class="active" for="title" >Title</label>
      </div>
      <div class="input-field col s4">
        <input id="firstName" name="firstName" type="text" className="validate" onChange={handleChange} value={editData.firstName}/>
        <label class="active" for="firstName">First Name</label>
      </div>
      <div class="input-field col s4">
        <input id="lastName" name="lastName" type="text" className="validate" onChange={handleChange} value={editData.lastName}/>
        <label class="active" for="lastName">Last Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <i class="material-icons prefix">account_circle</i>
        <input id="idCard" name="idCard" type="text" className="validate" onChange={handleChange} value={editData.idCard}/>
        <label class="active" for="idCard">Personal ID</label>
      </div>
      <div class="input-field col s4">
      <i class="material-icons prefix">today</i>
        <input id="birthDate" name="birthDate" type="date" className="validate" onChange={handleChange} value={editData.birthDate}/>
        <label class="active" for="birthDate">Date of Birth</label>
      </div>
      <div class="input-field col s4">
        <i class="material-icons prefix">mail</i>
        <input id="email" name="email" type="email" className="validate" onChange={handleChange} value={editData.email}/>
        <label class="active" for="email">Email</label>
        <span class="helper-text" data-error="wrong" data-success="right">
          Helper text
        </span>
      </div>
    </div>
    <div class="row">
    <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="premium" disabled name="premium" type="number" className="validate" onChange={handleChange} value={editData.premium}/>
        <label class="active" for="premium">Premium</label>
      </div>
      <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="coverDate" name="coverDate" type="date" className="validate" onChange={handleDate} value={editData.coverDate}/>
        <label class="active" for="coverDate">Coverage Start</label>
        
      </div>
      <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="endDate" name="endDate" disabled type="date" className="validate" onChange={handleChange} value={editData.endDate}/>
        <label class="active" for="endDate">Coverage End</label>
      </div>
    </div>
    <div class="row">
    <div class="row pink lighten-4">
            <h5 className="pink-text text-darken-3">delivery address</h5>
          </div>
    
      <div class="input-field col s4">
        <i class="material-icons prefix">place</i>
        <input id="location1" name="location1" type="text" className="validate" onChange={handleChange} value={editData.location1}/>
        <label class="active" for="location1">บ้านเลขที่</label>
      </div>
      <div class="input-field col s4">
        <input id="location2" name="location2" type="text" className="validate" onChange={handleChange} value={editData.location2}/>
        <label class="active" for="location2">ถนน</label>
      </div>
      <div class="input-field col s4">
        <input id="location3" name="location3" type="text" className="validate" onChange={handleChange}value={editData.location3}/>
        <label class="active" for="location3">ตำบล</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="location4" name="location4" type="text" className="validate" onChange={handleChange} value={editData.location4}/>
        <label class="active" for="location4">อำเภอ</label>
      </div>
      <div class="input-field col s4">
        <input id="location5" name="location5" type="text" className="validate" onChange={handleChange} value={editData.location5}/>
        <label class="active" for="location5">จังหวัด</label>
      </div>
      <div class="input-field col s4">
        <input id="location6" name="location6" type="text" className="validate" onChange={handleChange} value={editData.location6}/>
        <label class="active" for="location6">Post No.</label>
      </div>
    </div>
    <div class="row pink lighten-4">
            <h5 className="pink-text text-darken-3">Beneficiary</h5>
          </div>
    <div class="row">
    <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="benifyFirstName" name="benifyFirstName" type="text" className="validate" onChange={handleChange} value={editData.benifyFirstName}/>
        <label class="active" for="benifyFirstName">First Name</label>
      </div>
      <div class="input-field col s4">
        {/* <i class="material-icons prefix"></i> */}
        <input id="benifyLastName" name="benifyLastName" type="text" className="validate" onChange={handleChange} value={editData.benifyLastName}/>
        <label class="active" for="benifyLastName">Last Name</label>
      </div>
      <div class="input-field col s4">
        {/* <i class="material-icons prefix"></i> */}
        <input id="benifyRelation" name="benifyRelation" type="text" className="validate" onChange={handleChange} value={editData.benifyRelation}/>
        <label class="active" for="benifyRelation">Relation</label>
      </div>
      </div>
    <div className="row">
    <div class="input-field col s6">
      <input
        className="btn waves-effect waves-light pulse  pink lighten-2"
        type="submit"
        value="submit"
      />
      </div>
      <div class="input-field col s6">

      <button className="waves-effect waves-light btn  pink lighten-2" onClick={handleSave}>
        <i class="material-icons left">add_circle</i>Save Draft
      </button>
      </div>
    </div>
  </form>)
  },[editData])

  const handleChange = (e) => {
    setEditData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleDate = (e) => {
    const coverDate = new Date(e.target.value);
    coverDate.setDate(coverDate.getDate() + editData['periodDay'])  
    const endDate = coverDate.toISOString().split('T')[0];
    setEditData((prevState) => ({
      ...prevState,
      'coverDate': e.target.value,
      'endDate': endDate,
    }));
  };

  const handleFill = (e) => {
    e.preventDefault();
    // console.log(dataUser.some(item => item.id == e.target.userId.value));
    if(dataUser.some(item => item.id == e.target.userId.value)){
    axios
      .get("http://day4.test/api/tip/register/"+e.target.userId.value)
      .then((res) => {
        console.log(res);
        const data = {...res.data.data,...editData,
          'id':null,
          'userId':res.data.data.id,
          'birthDate':res.data.data.birth_date,
          'firstName':res.data.data.first_name,
          'lastName':res.data.data.last_name,
          'phoneNumber':res.data.data.phone_number,
          'idCard':res.data.data.id_card,
          
        }
        setEditData(
          data)
      })
      .catch((err) => {
        M.toast({html: "user not found", displayLength: 4000})
          console.log(err);
      });
    }else{ M.toast({html: "user not permission", displayLength: 4000})}
  };

  const handleSave = (e) => {
    M.toast({html: "waiting process", displayLength: 4000})
    e.preventDefault();
    console.log(editData);
    axios
      .post(url + "policy", editData,{headers: token})
      .then((res) => {
        M.toast({html: "draft saved", displayLength: 4000})
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("username already exists");
        } else {
          console.log(err);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    M.toast({html: "waiting process", displayLength: 10000})
    console.log(editData);
    axios
      .post(url + "policy", {...editData,isDraft: false, },{headers: token})
      .then((res) => {
        console.log(res);
        if (cookies.userId) {
          M.toast({html: "submit success", displayLength: 4000})
          navigate("/policy");
        } else navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          M.toast({html: "submit failed", displayLength: 4000})
        } else {
          console.log(err);
        }
      });
  }
   
  return (
    <>
    
    <div className="card-regis z-depth-1">
    <div class="row  pink lighten-4">
      <h4 className="pink-text text-darken-3">Insurance Detail</h4>
    </div>
    <div class="row ">
      <h5 className="pink-text text-darken-3">
        name : {insureData.name}{" "}
      </h5>
      <div class="input-field col s8">
      <h6 className="">{insureData.descript} </h6>
      </div>
      <div class="input-field col s4">

      <h6 className="">premium : {Intl.NumberFormat().format(insureData.premium)} Bath/year</h6>
      <h6 className="">protection : {insureData.periodDay} days</h6>
      </div>
      <div class="input-field col s12">
      <table className="striped centered pink lighten-4  responsive-table">
        <thead className="pink darken-4 grey-text text-lighten-5">
          <tr>
            <th>CASE</th>
            <th>compensation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>live until the end of protection</td>
            <td>{Intl.NumberFormat().format(insureData.returnAlive)}</td>
          </tr>
          <tr>
            <td>death during the protection period</td>
            <td>{Intl.NumberFormat().format(insureData.returnDead)}</td>
          </tr>
          <tr>
            <td>permanent disability</td>
            <td>{Intl.NumberFormat().format(insureData.returnDisability)}</td>
          </tr>
          
          
        </tbody>
      </table>
      </div>
    </div>
  </div>
    <div className="card-regis z-depth-1">
      <div class="row pink ">
        <h4 className="white-text">Buy Insurance </h4>
      </div>
      <form  class="col s12" onSubmit={handleFill}>
      <div class="row">
      <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="userId" name="userId" type="number"/>
        <label  for="userId" >user id</label>
      </div>
    <div class="input-field col s3">
    <input type="submit" value="autofill" className="waves-effect waves-light btn pink lighten-3"/>
      </div>
      </div>
            </form>
    
      
      
      {formData}
    </div>
    </>
  );
};

export default PackageDetail;
