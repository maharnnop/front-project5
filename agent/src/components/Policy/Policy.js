import React, { useState, useEffect, useScript } from "react";
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";
// import "./PackageDetail.css";
import jwt_decode from "jwt-decode";
import { useCookies } from 'react-cookie';
import M from "materialize-css/dist/js/materialize.min.js";

const Policy = (props) => {
  
  const params = useParams();
  const [editData, setEditData] = useState({});
  const [cookies, setCookie,removeCookie] = useCookies(['userId','username']);
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
 
  const [signUpData, setSignUpData] = useState({
    "agentId":parseInt( jwt_decode(cookies.userId).sub),
    "insureId":parseInt(params.id)});
    const token = { Authorization: `Bearer ${cookies.userId}` }
  const url = "http://localhost:8085/";

  useEffect(() => {
    M.AutoInit();
    axios
      .get(url + "policy/"+params.id,{headers: token})
      .then((res) => {
        console.log(res);
        const coverDate = new Date(res.data.coverDate).toISOString().split('T')[0];
        const endDate = new Date(res.data.endDate).toISOString().split('T')[0];
        const birthDate = new Date(res.data.birthDate).toISOString().split('T')[0];
        setEditData(res.data)
        setEditData((prevState) => ({
          ...prevState,
          'coverDate': coverDate,
          'endDate': endDate,
          'birthDate': birthDate,
          }));
        
        // M.FormSelect.init(res.data.data.title)
      }).catch((err)=>{})
  }, []);
  const handleChange = (e) => {
    setSignUpData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(()=>{
    setFormData(<form class="col s12" onSubmit={handleSubmit}>
    <div class="row">
     
      <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="title" disabled name="title" onChange={handleChange} value={editData.title}/>
        <label class="active" for="title" >Title</label>
      </div>
      <div class="input-field col s4">
        <input id="firstName" disabled name="firstName" type="text" className="validate" onChange={handleChange} value={editData.firstName}/>
        <label class="active" for="firstName">First Name</label>
      </div>
      <div class="input-field col s4">
        <input id="lastName" disabled name="lastName" type="text" className="validate" onChange={handleChange} value={editData.lastName}/>
        <label class="active" for="lastName">Last Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <i class="material-icons prefix">account_circle</i>
        <input id="idCard" disabled name="idCard" type="text" className="validate" onChange={handleChange} value={editData.idCard}/>
        <label class="active" for="idCard">Personal ID</label>
      </div>
      <div class="input-field col s4">
      <i class="material-icons prefix">today</i>
        <input id="birthDate" disabled name="birthDate" type="date" className="validate" onChange={handleChange} value={editData.birthDate}/>
        <label class="active" for="birthDate">Date of Birth</label>
      </div>
      <div class="input-field col s4">
        <i class="material-icons prefix">mail</i>
        <input id="email" disabled name="email" type="email" className="validate" onChange={handleChange} value={editData.email}/>
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
        <input id="coverDate" disabled name="coverDate" type="date" className="validate" onChange={handleDate} value={editData.coverDate}/>
        <label class="active" for="coverDate">Coverage Start</label>
        
      </div>
      <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="endDate" disabled name="endDate" type="date" className="validate" onChange={handleChange} value={editData.endDate}/>
        <label class="active" for="endDate">Coverage End</label>
      </div>
    </div>
    <div class="row">
    
    <div class="row pink lighten-5">
      <p>delivery address</p>
    </div>
      <div class="input-field col s4">
        <i class="material-icons prefix">place</i>
        <input id="location1" disabled name="location1" type="text" className="validate" onChange={handleChange} value={editData.location1}/>
        <label class="active" for="location1">บ้านเลขที่</label>
      </div>
      <div class="input-field col s4">
        <input id="location2" disabled name="location2" type="text" className="validate" onChange={handleChange} value={editData.location2}/>
        <label class="active" for="location2">ถนน</label>
      </div>
      <div class="input-field col s4">
        <input id="location3" disabled name="location3" type="text" className="validate" onChange={handleChange}value={editData.location3}/>
        <label class="active" for="location3">ตำบล</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="location4" disabled name="location4" type="text" className="validate" onChange={handleChange} value={editData.location4}/>
        <label class="active" for="location4">อำเภอ</label>
      </div>
      <div class="input-field col s4">
        <input id="location5" disabled name="location5" type="text" className="validate" onChange={handleChange} value={editData.location5}/>
        <label class="active" for="location5">จังหวัด</label>
      </div>
      <div class="input-field col s4">
        <input id="location6" disabled name="location6" type="text" className="validate" onChange={handleChange} value={editData.location6}/>
        <label class="active" for="location6">Post No.</label>
      </div>
    </div>
    <div class="row pink lighten-5">
      <p>Beneficiary</p>
    </div>
    <div class="row">
    <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="benifyFirstName" disabled name="benifyFirstName" type="text" className="validate" onChange={handleChange} value={editData.benifyFirstName}/>
        <label class="active" for="benifyFirstName">First Name</label>
      </div>
      <div class="input-field col s4">
        {/* <i class="material-icons prefix"></i> */}
        <input id="benifyLastName" disabled name="benifyLastName" type="text" className="validate" onChange={handleChange} value={editData.benifyLastName}/>
        <label class="active" for="benifyLastName">Last Name</label>
      </div>
      <div class="input-field col s4">
        {/* <i class="material-icons prefix"></i> */}
        <input id="benifyRelation" disabled name="benifyRelation" type="text" className="validate" onChange={handleChange} value={editData.benifyRelation}/>
        <label class="active" for="benifyRelation">Relation</label>
      </div>
      </div>
    <div className="row">
      {/* <input
        className="btn-large waves-effect waves-light pulse "
        type="submit"
        value="EDIT"
      /> */}
    </div>
  </form>)
  },[editData])

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
  const handleSubmit = (e) => {
    
    e.preventDefault();
    console.log(signUpData);
    // axios.defaults.xsrfCookieName = "csrftoken";
    // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios
      .put(url + "policy/"+params.id,signUpData)
      .then((res) => {
        console.log(res);
        // let token = res.data.token.access;
        // let username = res.data.token.username;
        navigate("/policy");
        // localStorage.setItem("jwt", token);
        // localStorage.setItem("username", username);
        // document.cookies.set("jwt",token)
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("username already exists");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="card-regis z-depth-1">
        <div class="row pink ">
            <h4 className="white-text">Policy No. {editData.id} : {editData['insureName']}</h4>
          </div>
          {formData}
    </div>
  );
};

export default Policy;
