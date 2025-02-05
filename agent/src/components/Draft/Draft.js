import React, { useState, useEffect, useScript } from "react";
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";
// import "./PackageDetail.css";
import jwt_decode from "jwt-decode";
import { useCookies } from 'react-cookie';
import M from "materialize-css/dist/js/materialize.min.js";

const Draft = (props) => {
  
  const params = useParams();
  const [editData, setEditData] = useState({});
  const [cookies, setCookie,removeCookie] = useCookies(['userId','username']);
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  
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
          'isDraft':false,
          'coverDate': coverDate,
          'endDate': endDate,
          'birthDate': birthDate,
          }));
          axios.get(url + "insure/"+res.data.insureId,{headers: token})
          .then((data)=>{
            // console.log(data);
            setEditData((prevState) => ({
                ...prevState,
                'insureName': data.data.name,
                'periodDay': data.data.periodDay,
                }));
          }).catch((err)=>{})
        // M.FormSelect.init(res.data.data.title)
      }).catch((err)=>{})
      
  }, []);

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
  const handleSubmit = (e) => {
    M.toast({html: "waiting process", displayLength: 10000})
    e.preventDefault();
    
    axios
      .put(url + "policy/"+params.id,editData,{headers: token})
      .then((res) => {
        M.toast({html: "submit success", displayLength: 4000})
        console.log(res);
        navigate("/policy");
      
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
            <h4 className="white-text">{editData['insureName']}</h4>
          </div>
          <form class="col s12" onSubmit={handleSubmit}>
    <div class="row">
     
      <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="title"  name="title" onChange={handleChange} value={editData.title}/>
        <label class="active" for="title" >Title</label>
      </div>
      <div class="input-field col s4">
        <input id="firstName"  name="firstName" type="text" className="validate" onChange={handleChange} value={editData.firstName}/>
        <label class="active" for="firstName">First Name</label>
      </div>
      <div class="input-field col s4">
        <input id="lastName"  name="lastName" type="text" className="validate" onChange={handleChange} value={editData.lastName}/>
        <label class="active" for="lastName">Last Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <i class="material-icons prefix">account_circle</i>
        <input id="idCard"  name="idCard" type="text" className="validate" onChange={handleChange} value={editData.idCard}/>
        <label class="active" for="idCard">Personal ID</label>
      </div>
      <div class="input-field col s4">
      <i class="material-icons prefix">today</i>
        <input id="birthDate"  name="birthDate" type="date" className="validate" onChange={handleChange} value={editData.birthDate}/>
        <label class="active" for="birthDate">Date of Birth</label>
      </div>
      <div class="input-field col s4">
        <i class="material-icons prefix">mail</i>
        <input id="email"  name="email" type="email" className="validate" onChange={handleChange} value={editData.email}/>
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
        <input id="coverDate"  name="coverDate" type="date" className="validate" onChange={handleDate} value={editData.coverDate}/>
        <label class="active" for="coverDate">Coverage Start</label>
        
      </div>
      <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="endDate"  name="endDate" type="date" className="validate" onChange={handleChange} value={editData.endDate}/>
        <label class="active" for="endDate">Coverage End</label>
      </div>
    </div>
    <div class="row">
    
    <div class="row pink lighten-5">
      <p>delivery address</p>
    </div>
      <div class="input-field col s4">
        <i class="material-icons prefix">place</i>
        <input id="location1"  name="location1" type="text" className="validate" onChange={handleChange} value={editData.location1}/>
        <label class="active" for="location1">บ้านเลขที่</label>
      </div>
      <div class="input-field col s4">
        <input id="location2"  name="location2" type="text" className="validate" onChange={handleChange} value={editData.location2}/>
        <label class="active" for="location2">ถนน</label>
      </div>
      <div class="input-field col s4">
        <input id="location3"  name="location3" type="text" className="validate" onChange={handleChange}value={editData.location3}/>
        <label class="active" for="location3">ตำบล</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="location4"  name="location4" type="text" className="validate" onChange={handleChange} value={editData.location4}/>
        <label class="active" for="location4">อำเภอ</label>
      </div>
      <div class="input-field col s4">
        <input id="location5"  name="location5" type="text" className="validate" onChange={handleChange} value={editData.location5}/>
        <label class="active" for="location5">จังหวัด</label>
      </div>
      <div class="input-field col s4">
        <input id="location6"  name="location6" type="text" className="validate" onChange={handleChange} value={editData.location6}/>
        <label class="active" for="location6">Post No.</label>
      </div>
    </div>
    <div class="row pink lighten-5">
      <p>Beneficiary</p>
    </div>
    <div class="row">
    <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="benifyFirstName"  name="benifyFirstName" type="text" className="validate" onChange={handleChange} value={editData.benifyFirstName}/>
        <label class="active" for="benifyFirstName">First Name</label>
      </div>
      <div class="input-field col s4">
        {/* <i class="material-icons prefix"></i> */}
        <input id="benifyLastName"  name="benifyLastName" type="text" className="validate" onChange={handleChange} value={editData.benifyLastName}/>
        <label class="active" for="benifyLastName">Last Name</label>
      </div>
      <div class="input-field col s4">
        {/* <i class="material-icons prefix"></i> */}
        <input id="benifyRelation"  name="benifyRelation" type="text" className="validate" onChange={handleChange} value={editData.benifyRelation}/>
        <label class="active" for="benifyRelation">Relation</label>
      </div>
      </div>
    <div className="row">
      <input
        className="btn-large waves-effect waves-light pulse "
        type="submit"
        value="Submit"
      />
    </div>
  </form>
    </div>
  );
};

export default Draft;
