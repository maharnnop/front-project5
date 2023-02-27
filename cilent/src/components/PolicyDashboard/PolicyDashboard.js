import React, { useState, useEffect, useScript } from "react";
import jwt_decode from "jwt-decode";
import { redirect, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {  useCookies } from 'react-cookie';
import './PolicyDashboard.css'
import M from "materialize-css/dist/js/materialize.min.js";
function Policy() {
    const [cookies, setCookie,removeCookie] = useCookies(['userId','username']);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const url = "http://day4.test/api/tip/";
    const token = { Authorization: `Bearer ${cookies.userId}` }
    useEffect(() => {
        M.AutoInit();
       
        axios.post(url + "policy/user",{'user_id':parseInt( jwt_decode(cookies.userId).sub)},{headers: token})
      .then((res) => {
        console.log(res.data.data);
        const detail = res.data.data
        const arr = [];
        detail.forEach(ele => {
            arr.push(<tr>
                <td>{ele.id}</td>
                <td>{ele.insure_name}</td>
                <td>{ele.title}</td>
                <td>{ele.first_name}</td>
                <td>{ele.last_name}</td>
                <td>{ele.cover_date}</td>
                <td>{ele.end_date}</td>
                {/* <td>{ele.email}</td> */}
                <td>{ele.premium}</td>
                {/* <td>{ele.benify_first_name}</td> */}
                {/* <td>{ele.benify_last_name}</td> */}
                {/* <td>{ele.location3}</td>
                <td>{ele.location4}</td>
                <td>{ele.location5}</td>
                <td>{ele.location6}</td> */}
                <td><Link to={`/policy/${ele.id}`}>See detail</Link></td>
                
              </tr>)
        });
        setData(arr);
        
    }
        )
        .catch((err) => {
              console.log(err);
          });

      }, []);

      const handleDelete = (id) =>{
        // e.preventDefault();
        axios.delete(url + "policy/"+id)
        .then((res)=>{
          console.log(res)
          navigate("/");})
        .catch((err)=>{console.log(err);})

       
      }
 return (
    <div className="dashboard">
    <table className="striped  centered blue lighten-4 responsive-table">
    <thead className="indigo darken-4 grey-text text-lighten-5">
      <tr > 
            <th>policy No.</th>
          <th>package</th>
          <th>title</th>
          <th>first_name</th>
          <th>last_name</th>
          {/* <th>username</th> */}
          {/* <th>password</th> */}
          <th>cover_date</th>
          <th>end_date</th>
          <th>premium</th>
          
          {/* <th>location4</th>
          <th>location5</th>
          <th>location6</th> */}
          <th></th>
          
          
         
      </tr>
    </thead>

    <tbody>
      {data}
     
    </tbody>
  </table>
    </div>
 )
}

export default Policy;
