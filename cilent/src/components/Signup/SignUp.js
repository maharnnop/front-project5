import React, { useState, useEffect, useScript } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import jwt_decode from "jwt-decode";
import M from "materialize-css/dist/js/materialize.min.js";
const SignUp = (props) => {
  useEffect(() => {
    M.AutoInit();
  }, []);
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
    // axios.defaults.xsrfCookieName = "csrftoken";
    // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios
      .post(url + "register",signUpData)
      .then((res) => {
        console.log(res);
        // let token = res.data.token.access;
        // let username = res.data.token.username;
        navigate("/dashboard");
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
    <div className="card-regis ">
      
      <div className="card horizontal con" >
            <div class="card-image">
              <img
                src="https://img.lovepik.com/background/20211030/medium/lovepik-highway-mobile-phone-wallpaper-background-image_400458398.jpg"
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
           
            <div class="input-field col s4">
              <i class="material-icons prefix"></i>
              <select id="title" name="title" onChange={handleChange}>
                <option value="" disabled selected>
                  Title
                </option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
              </select>
              <label>Title</label>
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
              className="btn-large waves-effect waves-light pulse "
              type="submit"
              value="Sign-Up"
            />
          </div>
        </form>
      
      </div>
              </div>
              
            </div>
          </div>



      <h1>Registration form</h1>
      <div>
        <form className="container-signup" onSubmit={handleSubmit}>
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
          <input type="text" name="email" onChange={handleChange} required />
          birthday:{" "}
          <input
            type="date"
            name="date_of_birth"
            onChange={handleChange}
            required
          />
          <br />
          username:{" "}
          <input type="text" name="username" onChange={handleChange} required />
          password:{" "}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
          <br />
          <input className="signup-btn" type="submit" value="Sign-Up" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
