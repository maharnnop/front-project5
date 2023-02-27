import React, { useState, useEffect, useScript } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import jwt_decode from "jwt-decode";
import { useCookies } from 'react-cookie';
import M from "materialize-css/dist/js/materialize.min.js";
const SignUp = (props) => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  const [cookies, setCookie] = useCookies(['userId','username']);
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({});
  const url = "http://day4.test/api/tip/";

  const handleChange = (e) => {
    setSignUpData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    M.toast({html: "Waiting process ", displayLength: 10000})
    // axios.defaults.xsrfCookieName = "csrftoken";
    // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios
      .post(url + "register",signUpData)
      .then((res) => {
        console.log(res);
        M.toast({html: "Signup success ", displayLength: 4000})
        setCookie("userId", res.data.token, {path: "/"});
        setCookie("username", res.data.username, {path: "/"});
    
        navigate("/dashboard");
        // localStorage.setItem("jwt", token);
        // localStorage.setItem("username", username);
        // document.cookies.set("jwt",token)
      })
      .catch((err) => {
        M.toast({html: "duplicate id card ", displayLength: 4000})
        if (err.response.status === 400) {
          alert("username already exists");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="card-regis ">
      
      <div className="card horizontal con" >
            <div class="card-image">
              <img
                src="https://www.bluechipthai.com/assets/images/tiph2.001(1).jpeg"
                alt="i"
              />
            </div>
            <div class="card-stacked">
              <div class="z-depth-5 card-panel   blue darken-4">
                <h5 className="grey-text text-lighten-5">Register</h5>
              </div>
              <div class="card-content">
              <div class="row">
        <form class="col s12" onSubmit={handleSubmit}>
          <div class="row">
           
    
              <div class="input-field col s3">
              <i class="material-icons prefix"></i>
              <input id="title" name="title" type="text" className="validate" onChange={handleChange}/>
              <label for="title">Title</label>
            </div>
         
            <div class="input-field col s4">
              <input id="first_name" name="first_name" type="text" className="validate" onChange={handleChange}/>
              <label for="first_name">First Name</label>
            </div>
            <div class="input-field col s4">
              <input id="last_name" name="last_name" type="text" className="validate" onChange={handleChange}/>
              <label for="last_name">Last Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">account_circle</i>
              <input id="username" name="username" type="text" className="validate" onChange={handleChange}/>
              <label for="username">Username</label>
            </div>
            <div class="input-field col s6">
              <input id="password" name="password" type="password" className="validate" onChange={handleChange}/>
              <label for="password">Password</label>
              <span class="helper-text" data-error="wrong" data-success="right">
                Helper text
              </span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">mail</i>
              <input id="email" name="email" type="email" className="validate" onChange={handleChange}/>
              <label for="email">Email</label>
              <span class="helper-text" data-error="wrong" data-success="right">
                Helper text
              </span>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">phone</i>
              <input id="phone_number" name="phone_number" type="tel" className="validate" onChange={handleChange}/>
              <label for="phone_number">Telephone</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix"></i>
              <input id="id_card" name="id_card" type="tel" className="validate" onChange={handleChange}/>
              <label for="id_card">ID-CARD</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <i class="material-icons prefix">place</i>
              <input id="location1" name="location1" type="text" className="validate" onChange={handleChange}/>
              <label for="location1">บ้านเลขที่</label>
            </div>
            <div class="input-field col s4">
              <input id="location2" name="location2" type="text" className="validate" onChange={handleChange}/>
              <label for="location2">ถนน</label>
            </div>
            <div class="input-field col s4">
              <input id="location3" name="location3" type="text" className="validate" onChange={handleChange}/>
              <label for="location3">ตำบล</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <i class="material-icons prefix"></i>
              <input id="location4" name="location4" type="text" className="validate" onChange={handleChange}/>
              <label for="location4">อำเภอ</label>
            </div>
            <div class="input-field col s4">
              <input id="location5" name="location5" type="text" className="validate" onChange={handleChange}/>
              <label for="location5">จังหวัด</label>
            </div>
            <div class="input-field col s4">
              <input id="location6" name="location6" type="text" className="validate" onChange={handleChange}/>
              <label for="location6">Post No.</label>
            </div>
          </div>
          <div className="row">
            <input
              className="btn-large waves-effect waves-light pulse  indigo darken-2"
              type="submit"
              value="Sign-Up"
            />
          </div>
        </form>
      
      </div>
              </div>
              
            </div>
          </div>
      
    </div>
  );
};

export default SignUp;
