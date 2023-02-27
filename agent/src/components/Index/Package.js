import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
// import RadialBar from "../Invest/RadialBar";
import M from "materialize-css/dist/js/materialize.min.js";
import './Package.css'

const Package =(props) =>{
  const [data, setData] = useState([]);
    const navigate = useNavigate();
    
return (
<div className="main ">
<div className="card ">
    <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src="https://yt3.googleusercontent.com/ytc/AL5GRJUotvw7bfLarOOUXvoc9cPU2yQPrZAU-mqMVoNGyg=s900-c-k-c0x00ffffff-no-rj" alt="img-card"/>
    </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">{props.detail.name}<i className="material-icons right">more_vert</i></span>
      <p><Link to={"/packages/"+props.detail.id}>Detail more..</Link></p>
    </div>
    <div className="card-reveal">
      <span className="card-title grey-text text-darken-4">{props.detail.name}<i className="material-icons right">close</i></span>
      <p>{props.detail.descript}</p>
      <p>premium : {props.detail.premium}</p>
      <p>coverage : {props.detail.period_day} day</p>
    <Link to={"/packages/"+props.detail.id} className="btn-floating btn waves-effect waves-light red"><i class="material-icons">add_circle</i></Link>
    </div>
  </div>

</div>
)
}

export default Package