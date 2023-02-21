import React, { useState, useEffect, useScript } from "react";
import jwt_decode from "jwt-decode";
import { redirect, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './Dashboard.css'
import M from "materialize-css/dist/js/materialize.min.js";
function Dashboard() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const url = "http://day4.test/api/tip/";
    useEffect(() => {
        M.AutoInit();

        axios.get(url + "register")
      .then((res) => {
        console.log(res.data.data);
        const detail = res.data.data
        const arr = [];
        detail.forEach(ele => {
            arr.push(<tr>
                <td>{ele.id}</td>
                <td>{ele.title}</td>
                <td>{ele.first_name}</td>
                <td>{ele.last_name}</td>
                <td>{ele.username}</td>
                <td>{ele.id_card}</td>
                <td>{ele.email}</td>
                <td>{ele.phone_number}</td>
                <td>{ele.location1}</td>
                <td>{ele.location2}</td>
                <td>{ele.location3}</td>
                <td>{ele.location4}</td>
                <td>{ele.location5}</td>
                <td>{ele.location6}</td>
                <td><Link to={`/Profile/${ele.id}`}>Edit</Link></td>
                <td><button onClick={()=>{handleDelete(ele.id)}}>Delete</button></td>
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
        axios.delete(url + "register/"+id)
        .then((res)=>{
          console.log(res)
          navigate("/signup");})
        .catch((err)=>{console.log(err);})

       
      }
 return (
    <div className="dashboard">
    <table className="striped  pink lighten-4  responsive-table">
    <thead className="pink darken-4 grey-text text-lighten-5">
      <tr > 
            <th>Id</th>
          <th>title</th>
          <th>first_name</th>
          <th>last_name</th>
          <th>username</th>
          <th>id_card</th>
          <th>email</th>
          <th>phone_number</th>
          <th>location1</th>
          <th>location2</th>
          <th>location3</th>
          <th>location4</th>
          <th>location5</th>
          <th>location6</th>
          <th></th>
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

export default Dashboard;
