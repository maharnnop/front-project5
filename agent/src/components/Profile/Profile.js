import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./profile.css";
import jwt_decode from "jwt-decode";
// import {encode,decode} from "cryptorjs";
// require('cryptorjs')
import { useCookies } from "react-cookie";
import M from "materialize-css/dist/js/materialize.min.js";
const Profile = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId", "username"]);
  const params = useParams();
  const agentId = parseInt( jwt_decode(cookies.userId).sub)
  const navigate = useNavigate();
  const [editData, setEditData] = useState({});
  const [title, setTitle] = useState([]);
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const token = { Authorization: `Bearer ${cookies.userId}` };
  const url = "http://localhost:8085/";

  useEffect(() => {
    M.AutoInit();
    axios
      .get(url + "agent/" + agentId, { headers: token })
      .then((res) => {
        console.log(res);
        setEditData(res.data);

        // M.FormSelect.init(res.data.data.title)
      })
      .catch((err) => {});

      axios.get(url + "agent-user/all/"+agentId,{headers: token})
      .then((res) => {
        console.log(res.data);
        const detail = res.data
        const arr = [];
        detail.forEach(ele => {
            arr.push(<tr>
                <td>{ele.id}</td>
                <td>{ele.title}</td>
                <td>{ele.firstName}</td>
                <td>{ele.lastName}</td>
                <td>{ele.username}</td>
                <td>{ele.idCard}</td>
                <td>{ele.email}</td>
                <td><button onClick={()=>{handleDelete(ele.agentUserId)}}>Delete</button></td>
              </tr>)
        });
        setDataUser(arr);
        
    }
        )
        .catch((err) => {
              console.log(err);
          });
      
  }, []);

  const handleChangeCheckbox = (e) => {
    if (e.target.value === "on") {
      setEditData((prevState) => ({
        ...prevState,
        isAgent: true,
      }));
    } else {
      setEditData((prevState) => ({
        ...prevState,
        isAgent: false,
      }));
    }
  };

  const handleChange = (e) => {
    setEditData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleDelete = (id) => {
    console.log(id);
    axios.delete(url + "agent-user/"+id,{headers: token})
        .then((res)=>{
          console.log(res)
          navigate("/signup");})
        .catch((err)=>{console.log(err);})
  };




  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(url + "agent/" + agentId, editData, { headers: token })
      .then((res) => {
        M.toast({html: "Profile updated", displayLength: 4000})
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("username already exists");
        } else {
          console.log(err);
        }
      });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const addUser = {userId:e.target.userId.value, agentId:agentId}
    axios
      .post(url + "agent-user", addUser, { headers: token })
      .then((res) => {
        M.toast({html: "User updated", displayLength: 4000})
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          M.toast({html: "User Not found", displayLength: 4000})
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="card-regis ">
      <div className="card horizontal con">
        <div class="card-stacked">
          <div class="z-depth-5 card-panel   pink darken-4">
            <h5 className="grey-text text-lighten-5">Register</h5>
          </div>
          <div class="card-content">
            <div class="row">
              <form class="col s12" onSubmit={handleSubmit}>
                <div class="row">
                  <div class="input-field col s4">
                    <i class="material-icons prefix"></i>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      onChange={handleChange}
                      value={editData.title}
                    />
                    <label class="active" for="title">
                      Title
                    </label>
                  </div>
                  <div class="input-field col s4">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="validate"
                      onChange={handleChange}
                      value={editData.firstName}
                    />
                    <label class="active" for="firstName">
                      First Name
                    </label>
                  </div>
                  <div class="input-field col s4">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="validate"
                      onChange={handleChange}
                      value={editData.lastName}
                    />
                    <label class="active" for="lastName">
                      Last Name
                    </label>
                  </div>
                </div>
                {/* <div class="row">
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
    </div> */}
                <div class="row">
                  <div class="input-field col s4">
                    <i class="material-icons prefix"></i>
                    <label>
                      <input
                        type="checkbox"
                        id="isAgent"
                        name="isAgent"
                        onChange={handleChangeCheckbox}
                        disabled="disabled"
                        checked={editData.isAgent ? "checked" : null}
                      />
                      <span>Agent</span>
                    </label>
                  </div>
                  <div class="input-field col s4">
                    <input
                      id="licentNo"
                      name="licentNo"
                      type="text"
                      className="validate"
                      onChange={handleChange}
                      value={editData.licentNo}
                    />
                    <label class="active" for="licentNo">
                      Licent No
                    </label>
                  </div>
                  <div class="input-field col s4">
                    <input
                      id="licentExp"
                      name="licentExp"
                      type="date"
                      className="validate"
                      onChange={handleChange}
                      value={
                        editData.licentExp
                          ? editData.licentExp.split("T")[0]
                          : null
                      }
                    />
                    <label class="active" for="licentExp">
                      Exp Date
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <i class="material-icons prefix">mail</i>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="validate"
                      onChange={handleChange}
                      value={editData.email}
                    />
                    <label class="active" for="email">
                      Email
                    </label>
                    <span
                      class="helper-text"
                      data-error="wrong"
                      data-success="right"
                    >
                      Helper text
                    </span>
                  </div>
                  <div class="input-field col s6">
                    <i class="material-icons prefix">phone</i>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      className="validate"
                      onChange={handleChange}
                      value={editData.phoneNumber}
                    />
                    <label class="active" for="phoneNumber">
                      Telephone
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s4">
                    <i class="material-icons prefix">place</i>
                    <input
                      id="location1"
                      name="location1"
                      type="text"
                      className="validate"
                      onChange={handleChange}
                      value={editData.location1}
                    />
                    <label class="active" for="location1">
                      บ้านเลขที่
                    </label>
                  </div>
                  <div class="input-field col s4">
                    <input
                      id="location2"
                      name="location2"
                      type="text"
                      className="validate"
                      onChange={handleChange}
                      value={editData.location2}
                    />
                    <label class="active" for="location2">
                      ถนน
                    </label>
                  </div>
                  <div class="input-field col s4">
                    <input
                      id="location3"
                      name="location3"
                      type="text"
                      className="validate"
                      onChange={handleChange}
                      value={editData.location3}
                    />
                    <label class="active" for="location3">
                      ตำบล
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s4">
                    <i class="material-icons prefix"></i>
                    <input
                      id="location4"
                      name="location4"
                      type="text"
                      className="validate"
                      onChange={handleChange}
                      value={editData.location4}
                    />
                    <label class="active" for="location4">
                      อำเภอ
                    </label>
                  </div>
                  <div class="input-field col s4">
                    <input
                      id="location5"
                      name="location5"
                      type="text"
                      className="validate"
                      onChange={handleChange}
                      value={editData.location5}
                    />
                    <label class="active" for="location5">
                      จังหวัด
                    </label>
                  </div>
                  <div class="input-field col s4">
                    <input
                      id="location6"
                      name="location6"
                      type="text"
                      className="validate"
                      onChange={handleChange}
                      value={editData.location6}
                    />
                    <label class="active" for="location6">
                      Post No.
                    </label>
                  </div>
                </div>
                <div className="row">
                  <input
                    className="btn waves-effect waves-light pulse pink lighten-3 "
                    type="submit"
                    value="Edit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="card horizontal con">
        <div class="card-stacked">
          <div class="z-depth-5 card-panel   pink darken-4">
            <h5 className="grey-text text-lighten-5">User</h5>
          </div>
          <div class="card-content">
            <div class="row">
              <form class="col s12" onSubmit={handleAdd}>
                <div class="row">
                    
                  <div class="input-field col s3">
                    <i class="material-icons prefix"></i>
                    <label>
                      Add New User :
                    </label>
                  </div>
                  <div class="input-field col s3">
                    <input
                      id="userId"
                      name="userId"
                      type="text"
                      className="validate"
                    />
                    <label class="active" for="userId">
                      User register No.
                    </label>
                  </div>
                  <div class="input-field col s3">
                    <input
                    className="btn waves-effect waves-light pulse  pink lighten-3"
                    type="submit"
                    value="ADD"
                  />
                  </div>
                 
                </div>
                
              </form>
            </div>
            <div class="row">
            <table className="striped centered pink lighten-4  responsive-table">
    <thead className="pink darken-4 grey-text text-lighten-5">
      <tr > 
            <th>Id</th>
          <th>first_name</th>
          <th>last_name</th>
          <th>username</th>
          <th>id_card</th>
          <th>email</th>
          <th></th>
          <th></th>
      </tr>
    </thead>

    <tbody>
      {dataUser}
     
    </tbody>
  </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
