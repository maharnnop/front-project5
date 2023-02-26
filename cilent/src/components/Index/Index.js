import React, {  useState, useEffect } from "react";
import axios from "axios";
import Package from "./Package";
import M from "materialize-css/dist/js/materialize.min.js";
import { useNavigate,Link} from "react-router-dom";
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
  const url = "http://day4.test/api/tip/";
  useEffect(() => {
      M.AutoInit();

      axios.get(url + "insure")
    .then((res) => {
      console.log(res);
      const detail = res.data.data
      const arr = [];
      detail.forEach(ele => {
        arr.push(<Package detail={ele} key={ele.id} />)
      });
      setData(arr);
      
  }
      )
      .catch((err) => {
            console.log(err);
        });
        if (cookies.userId) {
          const token = { Authorization: `Bearer ${cookies.userId}` }
          axios.post(url + "draft/user",{'user_id':parseInt( jwt_decode(cookies.userId).sub)},{headers: token})
          .then((res) => {
            console.log(res);
            const detail = res.data.data
            const arr = [];
            detail.forEach(ele => {
              arr.push(<tr><td ><Link to={`/draft/${ele.id}`}>darft No.{ele.id}  {ele.insure_name} : {ele.first_name} - {ele.last_name}</Link></td></tr>)
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
      {cookies.userId? <a class="waves-effect waves-light btn modal-trigger indigo lighten-3" href="#modal1">Draft</a>:null}
  

{/* <!-- Modal Structure --> */}
<div id="modal1" class="modal">
  <div class="modal-content">
    
    <table className="highlight blue lighten-5  responsive-table centered">
    <thead className="blue lighten-2  grey-text text-lighten-5">
  <tr>
    <th>Draft</th></tr>
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