import React, { useState, useEffect, useScript } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import jwt_decode from "jwt-decode";
import { useCookies } from 'react-cookie';
import M from "materialize-css/dist/js/materialize.min.js";
const Login = (props) => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  const [cookies, setCookie] = useCookies(['userId','username']);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});
  const url = "http://localhost:8085/";

  const handleChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    M.toast({html: "Waiting process ", displayLength: 4000})
    // axios.defaults.xsrfCookieName = "csrftoken";
    // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios
      .post(url + "login",loginData)
      .then((res) => {
        M.toast({html: "Login success ", displayLength: 4000})
        console.log(res);
        // let token = res.data.token.access;
        // let username = res.data.token.username;
        setCookie("userId", res.data.token, {path: "/"});
        setCookie("username", loginData.username, {path: "/"});
        navigate("/");
        // localStorage.setItem("username", username);
        // document.cookies.set("jwt",token)
      })
      .catch((err) => {
        if (err.response.status === 401) {
            M.toast({html: "User Not Found ", displayLength: 4000})
        } else if (err.response.status === 403){
            M.toast({html: "Password wrong ", displayLength: 4000})
        }else{
            M.toast({html: "my web broken ", displayLength: 4000})
        }
      });
  };

  return (
    <div className="card-regis ">
      
      <div className="card" >
            
            <div className="card">
                
              <div class="z-depth-5 card-panel  orange lighten-1">
                <h5 className="grey-text text-lighten-5">LOG IN</h5>
              </div>
              <div class="card-image">
              <img
                src="https://fwdth-ecommerce-prod-storage.s3-ap-southeast-1.amazonaws.com/prd/cms/1676480752/desktop_mainPage_banner_0.jpeg"
                alt="i"
              />
            </div>
              <div class="card-content">
              <div class="row">
        <form class="col s12" onSubmit={handleSubmit}>
         
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
              </span>
            </div>
          </div>
          <div className="row">
            <input
              className="btn-large waves-effect waves-light pulse orange darken-4"
              type="submit"
              value="Login"
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

export default Login;
