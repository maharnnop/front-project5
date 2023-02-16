import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./profile.css";
import jwt_decode from "jwt-decode";
import M from "materialize-css/dist/js/materialize.min.js";
const Profile = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [editData, setEditData] = useState({});
    const [title,setTitle] = useState([]);
    const [data, setData] = useState([]);
    const url = "http://day4.test/api/tip/";
  
  useEffect(() => {
      M.AutoInit();
    axios
      .get(url + "register/"+params.id)
      .then((res) => {
        console.log(res);
        setEditData(res.data.data)
        
        // M.FormSelect.init(res.data.data.title)
      }).catch((err)=>{})

  }, []);

 
 
  const handleChange = (e) => {
    setEditData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(url + "register/"+params.id ,editData)
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
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
        <select id="title" name="title" onChange={handleChange} defualValue={editData.title}>
        <option value={editData.title} disabled selected>{editData.title}</option>
          <option value="Ms.">Ms.</option>
          <option value="Mr." >Mr.</option>
        </select>
     
        <label>Title</label>
      </div>
      <div class="input-field col s4">
        <input id="first_name" name="first_name" type="text" className="validate" onChange={handleChange} value={editData.first_name} />
        <label class="active" for="first_name">First Name</label>
      </div>
      <div class="input-field col s4">
        <input id="last_name" name="last_name" type="text" className="validate" onChange={handleChange} value={editData.last_name}/>
        <label  class="active" for="last_name">Last Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s6">
        <i class="material-icons prefix">account_circle</i>
        <input id="username" name="username" type="text" className="validate" onChange={handleChange} value={editData.username}/>
        <label class="active" for="username">Username</label>
      </div>
      <div class="input-field col s6">
        <input id="password" name="password" type="password" className="validate" onChange={handleChange} value={editData.password}/>
        <label class="active" for="password">Password</label>
        <span class="helper-text" data-error="wrong" data-success="right">
          Helper text
        </span>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s6">
        <i class="material-icons prefix">mail</i>
        <input id="email" name="email" type="email" className="validate" onChange={handleChange} value={editData.email}/>
        <label class="active" for="email">Email</label>
        <span class="helper-text" data-error="wrong" data-success="right">
          Helper text
        </span>
      </div>
      <div class="input-field col s6">
        <i class="material-icons prefix">phone</i>
        <input id="phone_number" name="phone_number" type="tel" className="validate" onChange={handleChange} value={editData.phone_number}/>
        <label class="active" for="phone_number">Telephone</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <i class="material-icons prefix">place</i>
        <input id="location1" name="location1" type="text" className="validate" onChange={handleChange} value={editData.location1}/>
        <label class="active" for="location1">บ้านเลขที่</label>
      </div>
      <div class="input-field col s4">
        <input id="location2" name="location2" type="text" className="validate" onChange={handleChange} value={editData.location2}/>
        <label class="active" for="location2">ถนน</label>
      </div>
      <div class="input-field col s4">
        <input id="location3" name="location3" type="text" className="validate" onChange={handleChange} value={editData.location3}/>
        <label class="active" for="location3">ตำบล</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <i class="material-icons prefix"></i>
        <input id="location4" name="location4" type="text" className="validate" onChange={handleChange} value={editData.location4}/>
        <label class="active" for="location4">อำเภอ</label>
      </div>
      <div class="input-field col s4">
        <input id="location5" name="location5" type="text" className="validate" onChange={handleChange} value={editData.location5}/>
        <label class="active" for="location5">จังหวัด</label>
      </div>
      <div class="input-field col s4">
        <input id="location6" name="location6" type="text" className="validate" onChange={handleChange} value={editData.location6}/>
        <label class="active" for="location6">Post No.</label>
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
              </div>
              
            </div>
          </div>



   
    </div>
  );
};

export default Profile;
