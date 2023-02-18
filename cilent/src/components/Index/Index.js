import React, {  useState, useEffect } from "react";
import axios from "axios";
import Package from "./Package";
import M from "materialize-css/dist/js/materialize.min.js";
import { useNavigate } from "react-router-dom";
import './Index.css'
// import LoadingSpinner from "../Loading/Loading";

const Index = () =>{
    const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

    }, []);

  return (
    <div >
      <h1 >Insurance Packages</h1>
       {/* {isLoading ? <LoadingSpinner /> : null} */}
      {/* <div className="container-package">{packages}</div> */}
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