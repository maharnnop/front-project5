import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  Link} from "react-router-dom";

const Test = ()=>{
  const navigate = useNavigate();
  const [logInData, setLogInData] = useState({});
  const url = 'http://localhost:8085';

  const handleChange = (e) => {
    setLogInData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.defaults.xsrfCookieName = 'csrftoken'
    // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    //axios.defaults.withCredentials = true;
    const headers = {
      "Cache-Control": "no-cache",
      "Accept-Language": "en",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:8085",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      //"Authorization": "Basic dXNlcjowM2VhN2JhYS1mMTQ0LTQ5YWMtOGFhMy02NDE4YWJiNzdhMTk=",
    
    };
    axios
      .post(url+"/token" ,{},
        headers
        // auth: {
        //     username: 'kwan',
        //     password: '1'
        //   }
      )
      .then((res) => {
        console.log(res);
        // let token = res.data.token.access;
        // let username = res.data.token.username;
        // navigate("/");
        // localStorage.setItem("jwt", token);
        // localStorage.setItem("username", username);
      })
      .catch((err) => {
          console.log(err);
      });
  

  };
    return (
        <div>
    
            <h1>Welcome Back !</h1>
    
            <form className="input-login" onSubmit={handleSubmit}>
              <input type="text" placeholder="Username" name="username" onChange={handleChange}/>{" "}
              
              <input type="password" placeholder="Password" name="password" onChange={handleChange}/>{" "}
              
              <input className="login-btn" type="submit" value='Login'/>
            </form>
            <br/> 
            <Link to="/signup" >
              Let's sign up
            </Link>
        
        </div>
      );
}

export default Test;