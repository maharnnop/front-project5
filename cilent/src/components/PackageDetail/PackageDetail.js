import React, { useState, useEffect, useScript } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PackageDetail.css";
import jwt_decode from "jwt-decode";
import M from "materialize-css/dist/js/materialize.min.js";
import { useCookies } from "react-cookie";
const PackageDetail = (props) => {
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["userId", "username"]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const token = { Authorization: `Bearer ${cookies.userId}` };
  const [editData, setEditData] = useState({});
  const [insureData, setInsureDta] = useState({});

  const url = "http://day4.test/api/tip/";

  useEffect(() => {
    M.AutoInit();
    if (cookies.userId) {
      setEditData((prevState) => ({
        ...prevState,
        // 'insure_id': parseInt(params.id),
        user_id: parseInt(jwt_decode(cookies.userId).sub),
      }));
    } else {
      setEditData((prevState) => ({
        ...prevState,
        is_draft: false,
        // 'insure_id': parseInt(params.id),
      }));
    }
    axios
      .get(url + "insure/" + parseInt(params.id))
      .then((res) => {
        // console.log(res);
        setInsureDta(res.data.data);
        setEditData((prevState) => ({
          ...prevState,
          insure_id: parseInt(params.id),
          insure_name: res.data.data.name,
          premium: res.data.data.premium,
          period_day: res.data.data.period_day,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //form state
  useEffect(() => {
    setFormData(
      <form class="col s12" onSubmit={handleSubmit}>
        <div class="row">
          <div class="input-field col s4">
            <i class="material-icons prefix"></i>
            <input
              id="title"
              name="title"
              onChange={handleChange}
              value={editData.title}
            />
            <label class="active" for="title">
              Title
            </label>
          </div>
          <div class="input-field col s4">
            <input
              id="first_name"
              name="first_name"
              type="text"
              className="validate"
              onChange={handleChange}
              value={editData.first_name}
            />
            <label class="active" for="first_name">
              First Name
            </label>
          </div>
          <div class="input-field col s4">
            <input
              id="last_name"
              name="last_name"
              type="text"
              className="validate"
              onChange={handleChange}
              value={editData.last_name}
            />
            <label class="active" for="last_name">
              Last Name
            </label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s4">
            <i class="material-icons prefix">account_circle</i>
            <input
              id="id_card"
              name="id_card"
              type="text"
              className="validate"
              onChange={handleChange}
              value={editData.id_card}
            />
            <label class="active" for="id_card">
              Personal ID
            </label>
          </div>
          <div class="input-field col s4">
            <i class="material-icons prefix">today</i>
            <input
              id="birth_date"
              name="birth_date"
              type="date"
              className="validate"
              onChange={handleChange}
              value={editData.birth_date}
            />
            <label class="active" for="birth_date">
              Date of Birth
            </label>
          </div>
          <div class="input-field col s4">
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
            <span class="helper-text" data-error="wrong" data-success="right">
              Helper text
            </span>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s4">
            <i class="material-icons prefix"></i>
            <input
              id="premium"
              disabled
              name="premium"
              type="number"
              className="validate"
              onChange={handleChange}
              value={editData.premium}
            />
            <label class="active" for="premium">
              Premium
            </label>
          </div>
          <div class="input-field col s4">
            <i class="material-icons prefix"></i>
            <input
              id="cover_date"
              name="cover_date"
              type="date"
              className="validate"
              onChange={handleDate}
              value={editData.cover_date}
            />
            <label class="active" for="cover_date">
              Coverage Start
            </label>
          </div>
          <div class="input-field col s4">
            <i class="material-icons prefix"></i>
            <input
              id="end_date"
              name="end_date"
              disabled
              type="date"
              className="validate"
              onChange={handleChange}
              value={editData.end_date}
            />
            <label class="active" for="end_date">
              Coverage End
            </label>
          </div>
        </div>
        <div class="row">
          <div class="row indigo lighten-4">
            <h5 className="indigo-text text-darken-3">delivery address</h5>
          </div>
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
        <div class="row">
          <div class="row indigo lighten-4">
            <h5 className="indigo-text text-darken-3">Beneficiary</h5>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s4">
            <i class="material-icons prefix"></i>
            <input
              id="benify_first_name"
              name="benify_first_name"
              type="text"
              className="validate"
              onChange={handleChange}
              value={editData.benify_first_name}
            />
            <label class="active" for="benify_first_name">
              First Name
            </label>
          </div>
          <div class="input-field col s4">
            {/* <i class="material-icons prefix"></i> */}
            <input
              id="benify_last_name"
              name="benify_last_name"
              type="text"
              className="validate"
              onChange={handleChange}
              value={editData.benify_last_name}
            />
            <label class="active" for="benify_last_name">
              Last Name
            </label>
          </div>
          <div class="input-field col s4">
            {/* <i class="material-icons prefix"></i> */}
            <input
              id="benify_relation"
              name="benify_relation"
              type="text"
              className="validate"
              onChange={handleChange}
              value={editData.benify_relation}
            />
            <label class="active" for="benify_relation">
              Relation
            </label>
          </div>
        </div>
        <div className="row">
          <input
            className="btn-large waves-effect waves-light pulse "
            type="submit"
            value="submit"
          />
          {cookies.userId ? (
            <button
              className="waves-effect waves-light btn"
              onClick={handleSave}
            >
              <i class="material-icons left">cloud</i>Save Draft
            </button>
          ) : null}
        </div>
      </form>
    );
  }, [editData]);

  const handleChange = (e) => {
    setEditData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleDate = (e) => {
    const coverDate = new Date(e.target.value);
    coverDate.setDate(coverDate.getDate() + editData["period_day"]);
    const endDate = coverDate.toISOString().split("T")[0];
    setEditData((prevState) => ({
      ...prevState,
      cover_date: e.target.value,
      end_date: endDate,
    }));
  };

  const handleFill = (e) => {
    e.preventDefault();
    axios
      .get(url + "register/" + parseInt(jwt_decode(cookies.userId).sub), {
        headers: token,
      })
      .then((res) => {
        console.log(res);
        const data = { ...res.data.data, ...editData, id: null };
        setEditData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSave = (e) => {
    e.preventDefault();
    M.toast({ html: "wait process ", displayLength: 4000 });
    // console.log(editData);
    // axios.defaults.xsrfCookieName = "csrftoken";
    // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios
      .post(url + "policy", { ...editData, is_draft: true })
      .then((res) => {
        console.log(res);
        M.toast({ html: "save draft complete ", displayLength: 4000 });
        if (cookies.userId) {
          navigate("/policy");
        } else navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("username already exists");
        } else {
          console.log(err);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    M.toast({ html: "wait process ", displayLength: 4000 });
    axios
      .post(url + "policy", { ...editData, is_draft: false })
      .then((res) => {
        M.toast({ html: "submit complete ", displayLength: 4000 });
        console.log(res);
        if (cookies.userId) {
          navigate("/policy");
        } else navigate("/");
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
    <>
      <div className="card-regis z-depth-1">
        <div class="row  indigo lighten-4">
          <h4 className="indigo-text text-darken-3">Insurance Detail</h4>
        </div>
        <div class="row ">
          <h5 className="indigo-text text-darken-3">
            name : {insureData.name}{" "}
          </h5>
          <h6 className="">detail : {insureData.descript} </h6>
          <h6 className="">premium : {insureData.premium} Bath/year</h6>
          <h6 className="">protection : {insureData.period_day} days</h6>
          <table className="striped centered indigo lighten-4  responsive-table">
            <thead className="indigo darken-4 grey-text text-lighten-5">
              <tr>
                <th>CASE</th>
                <th>compensation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>live until the end of protection</td>
                <td>{insureData.return_alive}</td>
              </tr>
              <tr>
                <td>death during the protection period</td>
                <td>{insureData.return_dead}</td>
              </tr>
              <tr>
                <td>permanent disability</td>
                <td>{insureData.return_disability}</td>
              </tr>
              
              
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-regis z-depth-1">
        <div class="row  indigo lighten-4">
          <h4 className="indigo-text text-darken-3">Buy Insurance </h4>
        </div>
        {cookies.userId ? (
          <button
            className="waves-effect waves-light btn indigo lighten-3"
            onClick={handleFill}
          >
            <i class="material-icons left">add_circle</i>Auto filled
          </button>
        ) : null}
        {formData}
      </div>
    </>
  );
};

export default PackageDetail;
