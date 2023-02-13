import React, { useState,useEffect,useScript } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Signup.css'
import jwt_decode from "jwt-decode";
import M from 'materialize-css/dist/js/materialize.min.js';
const SignUp = (props) => {
  
  useEffect(()=>{
    M.AutoInit()
  },[])
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({});
  const url = 'http://localhost:8000';

  const handleChange = (e) => {
    setSignUpData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    axios
      .post(url + "/user/signup", signUpData)
      .then((res) => {
        console.log(res);
        let token = res.data.token.access;
        let username = res.data.token.username;
        navigate("/");
        localStorage.setItem("jwt", token);
        localStorage.setItem("username", username);
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
    <div>
      <div id="form_div">Loading...</div>

<button onclick="myform.getFormJSON()">Submit</button>
<button onclick="myform.resetForm()">Reset</button>

        <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
        <i class="material-icons prefix">account_circle</i>
          <input id="first_name" type="text" className="validate"/>
          <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" className="validate"/>
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
        <i class="material-icons prefix"></i>
          <input id="username" type="text" className="validate"/>
          <label for="username">Username</label>
        </div>
        <div class="input-field col s6">
          <input id="password" type="password" className="validate"/>
          <label for="password">Password</label>
          <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
        </div>
      </div>
      <div class="row">
        
        <div class="input-field col s3">
        <i class="material-icons prefix">mail</i>
          <input id="email" type="email" className="validate"/>
          <label for="email">Email</label>
          <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
        </div>
        <div class="input-field col s5">
          <i class="material-icons prefix">phone</i>
          <input id="icon_telephone" type="tel" className="validate"/>
          <label for="icon_telephone">Telephone</label>
        </div>
        <div class="input-field col s3">
          <select>
            <option value="" disabled selected>Choose your option</option>
            <option value="true">Broker</option>
            <option value="false">Agent</option>
          </select>
          <label>Materialize Select</label>
        </div>
      </div>
      <div class="row">
      <div class="input-field col s2">
          <i class="material-icons prefix">place</i>
          <input id="location1" type="text" className="validate"/>
          <label for="location1">บ้านเลขที่</label>
        </div>
        <div class="input-field col s2">
       
          <input id="location2" type="text" className="validate"/>
          <label for="location2">ถนน</label>
        </div>
        <div class="input-field col s2">
         
          <input id="location3" type="text" className="validate"/>
          <label for="location3">ตำบล</label>
        </div>
        <div class="input-field col s2">
       
          <input id="location4" type="text" className="validate"/>
          <label for="location4">อำเภอ</label>
        </div>
        <div class="input-field col s2">
         
          <input id="location5" type="text" className="validate"/>
          <label for="location5">จังหวัด</label>
        </div>
      
      </div>
      <div class="row">
      <div class="input-field col s2">
      <i class="material-icons prefix">assignment_turned_in</i>
      <input id="licent" type="text" class="datepicker"/>
      <label for="licent">licent No.</label>
      </div>
      <div class="input-field col s2">
      <i class="material-icons prefix">date_range</i>
      <input id="enddate" type="text" class="datepicker"/>
      <label for="enddate">enddate</label>
      </div>

      </div>
    </form>
  </div>
        <h1>Registration form</h1>
        <div >
          <form  className="container-signup" onSubmit={handleSubmit}>
            firstname:{" "}
            <input
              type="text"
              name="first_name"
              onChange={handleChange}
              required
            />
            lastname:{" "}
            <input
              type="text"
              name="last_name"
              onChange={handleChange}
              required
            />
            <br />
            email:{" "}
            <input
              type="text"
              name="email"
              onChange={handleChange}
              required
            />
            birthday:{" "}
            <input type="date" name="date_of_birth" onChange={handleChange} required />
            <br />
            username:{" "}
            <input
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
            password:{" "}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
            <br />
            <input className="signup-btn" type="submit" value='Sign-Up'/>
          </form>
        </div>
    </div>
  );
};

export default SignUp;
