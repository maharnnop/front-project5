import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link, Navigation } from "react-router-dom";
import RadialBar from "../Invest/RadialBar";
import './Package.css'

const Package =(props) =>{
return (
<div className="main">
<div className="card ">
    <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src="https://materializecss.com/images/office.jpg" alt="img-card"/>
    </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
      <p><Link to="#">This is a link</Link></p>
    </div>
    <div className="card-reveal">
      <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    <Link to="#" className="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">navigate_next</i></Link>
    </div>
  </div>

</div>
)
}

export default Package