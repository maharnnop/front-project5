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
        setEditData(res.data.data)
        
        // M.FormSelect.init(res.data.data.title)
      }).catch((err)=>{})
  }, []);
  const handleChange = (e) => {
    setSignUpData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
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
            <h4 className="white-text">Edit Insurance</h4>
          </div>
        <form class="col s12" onSubmit={handleSubmit}>
          <div class="row">
           
            <div class="input-field col s4">
              <i class="material-icons prefix"></i>
              <select id="title" name="title" onChange={handleChange} value={editData.title}>
                <option value="" disabled selected>
                  Title
                </option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
              </select>
              <label >Title</label>
            </div>
            <div class="input-field col s4">
              <input id="firstName" name="firstName" type="text" className="validate" onChange={handleChange} tdefualtValue={editData.first_name}/>
              <label class="active" for="firstName">First Name</label>
            </div>
            <div class="input-field col s4">
              <input id="lastName" name="lastName" type="text" className="validate" onChange={handleChange} defualtValue={editData.last_name}/>
              <label class="active" for="lastName">Last Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <i class="material-icons prefix">account_circle</i>
              <input id="idCard" name="idCard" type="text" className="validate" onChange={handleChange} defualtValue={editData.id_card}/>
              <label class="active" for="idCard">Personal ID</label>
            </div>
            <div class="input-field col s4">
            <i class="material-icons prefix">today</i>
              <input id="birthDate" name="birthDate" type="date" className="validate" onChange={handleChange} defualtValue={editData.birth_date}/>
              <label class="active" for="birthDate">Date of Birth</label>
            </div>
            <div class="input-field col s4">
              <i class="material-icons prefix">mail</i>
              <input id="email" name="email" type="email" className="validate" onChange={handleChange} defualtValue={editData.email}/>
              <label class="active" for="email">Email</label>
              <span class="helper-text" data-error="wrong" data-success="right">
                Helper text
              </span>
            </div>
          </div>
          <div class="row">
          <div class="input-field col s4">
              <i class="material-icons prefix"></i>
              <input id="premium" name="premium" type="number" className="validate" onChange={handleChange} defualtValue={editData.primium}/>
              <label class="active" for="premium">Premium</label>
            </div>
            <div class="input-field col s4">
              <i class="material-icons prefix"></i>
              <input id="coverDate" name="coverDate" type="date" className="validate" onChange={handleChange} defualtValue={editData.cover_date}/>
              <label class="active" for="coverDate">Coverage Start</label>
              
            </div>
            <div class="input-field col s4">
              <i class="material-icons prefix"></i>
              <input id="endDate" name="endDate" type="date" className="validate" onChange={handleChange} defualtValue={editData.end_date}/>
              <label class="active" for="endDate">Coverage End</label>
            </div>
          </div>
          <div class="row">
          
          <div class="row pink lighten-5">
            <p>delivery address</p>
          </div>
            <div class="input-field col s4">
              <i class="material-icons prefix">place</i>
              <input id="location1" name="location1" type="text" className="validate" onChange={handleChange} defualtValue={editData.location1}/>
              <label class="active" for="location1">บ้านเลขที่</label>
            </div>
            <div class="input-field col s4">
              <input id="location2" name="location2" type="text" className="validate" onChange={handleChange} defualtValue={editData.location2}/>
              <label class="active" for="location2">ถนน</label>
            </div>
            <div class="input-field col s4">
              <input id="location3" name="location3" type="text" className="validate" onChange={handleChange}defualtValue={editData.location3}/>
              <label class="active" for="location3">ตำบล</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <i class="material-icons prefix"></i>
              <input id="location4" name="location4" type="text" className="validate" onChange={handleChange} defualtValue={editData.location4}/>
              <label class="active" for="location4">อำเภอ</label>
            </div>
            <div class="input-field col s4">
              <input id="location5" name="location5" type="text" className="validate" onChange={handleChange} defualtValue={editData.location5}/>
              <label class="active" for="location5">จังหวัด</label>
            </div>
            <div class="input-field col s4">
              <input id="location6" name="location6" type="text" className="validate" onChange={handleChange} defualtValue={editData.location6}/>
              <label class="active" for="location6">Post No.</label>
            </div>
          </div>
          <div class="row pink lighten-5">
            <p>Beneficiary</p>
          </div>
          <div class="row">
          <div class="input-field col s4">
              <i class="material-icons prefix"></i>
              <input id="benifyFirstName" name="benifyFirstName" type="text" className="validate" onChange={handleChange} defualtValue={editData.benify_first_name}/>
              <label class="active" for="benifyFirstName">First Name</label>
            </div>
            <div class="input-field col s4">
              {/* <i class="material-icons prefix"></i> */}
              <input id="benifyLastName" name="benifyLastName" type="text" className="validate" onChange={handleChange} defualtValue={editData.benify_last_name}/>
              <label class="active" for="benifyLastName">Last Name</label>
            </div>
            <div class="input-field col s4">
              {/* <i class="material-icons prefix"></i> */}
              <input id="benifyRelation" name="benifyRelation" type="text" className="validate" onChange={handleChange} defualtValue={editData.benify_relation}/>
              <label class="active" for="benifyRelation">Relation</label>
            </div>
            </div>
          <div className="row">
            <input
              className="btn-large waves-effect waves-light pulse "
              type="submit"
              value="Edit"
            />
          </div>
        </form>
    </div>
  );
};

export default Policy;
