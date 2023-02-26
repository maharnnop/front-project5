import React, {  useState, useEffect } from "react";
import axios from "axios";
import Package from "./Package";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import './Index.css'
import jwt_decode from "jwt-decode";
// import LoadingSpinner from "../Loading/Loading";

const Index = () =>{
    const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [draftData, setDraftData] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userId", "username"]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // axios.defaults.xsrfCookieName = "csrftoken";
  // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  const url = "http://localhost:8085/";
  useEffect(() => {
      M.AutoInit();

      axios.get(url + "insure")
    .then((res) => {
      console.log(res);
      const detail = res.data
      const arr = [];
      detail.forEach(ele => {
        arr.push(<Package detail={ele} key={ele.id} />)
      });
      setData(arr);
      
  })
      .catch((err) => { console.log(err);});

        if (cookies.userId) {
          const token = { Authorization: `Bearer ${cookies.userId}` }
          axios.post(url + "draft/agent",{agentId:parseInt(jwt_decode(cookies.userId).sub)},{headers: token})
          .then((res) => {
            console.log(res);
            const detail = res.data
            const arr = [];
            detail.forEach(ele => {
              arr.push(<tr ><Link to={`/draft/${ele.id}`}>{ele.insureName} : {ele.firstName} - {ele.lastName}</Link></tr>)
            });
            setDraftData(arr);
            
        })
            .catch((err) => { console.log(err);});
        }
    }, []);

  return (
    <div >
      <h1 >Insurance Packages</h1>
       {/* {isLoading ? <LoadingSpinner /> : null} */}
      {/* <div className="container-package">{packages}</div> */}
      {/* <!-- Modal Trigger --> */}
  <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Draft</a>

  {/* <!-- Modal Structure --> */}
  <div id="modal1" class="modal">
    <div class="modal-content">
      
      <table className="striped  pink lighten-4  responsive-table">
      <thead className="pink  grey-text text-lighten-5">
    <tr>Draft</tr>
      </thead>
    <tbody>
    {draftData}
      </tbody>
      </table> 
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">close</a>
    </div>
  </div>


      <div className="container-package">
        {/* <Package detail={1}  />
        <Package detail={2}  />
        <Package detail={3}  />
        <Package detail={4} />
        <Package detail={5} />
        <Package detail={6}  /> */}
        {data}
        </div>
    </div>
  );
};

export default Index;