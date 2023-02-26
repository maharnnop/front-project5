import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { redirect, useNavigate, Link } from "react-router-dom";
import './Nav.css'
import { Cookies, useCookies } from 'react-cookie';
// hamberger menu
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';

function Nav() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {setSidebar(!sidebar)};
  const [cookies, setCookie,removeCookie] = useCookies(['userId','username']);
  // const [user, setUser,removeUser] = useCookies(['username']);

  const navigate = useNavigate();
  
  const handleLogOut = (e) => {
    // localStorage.removeItem("jwt");
    // localStorage.removeItem("username");
    removeCookie("userId",{path: "/"});
    removeCookie("username",{path: "/"});
  };

  if (cookies.userId ) {
    const decoded = jwt_decode(cookies.userId);
    // const decoded = localStorage.getItem("jwt");
    const username = cookies.username;

    return (
      <>
        <IconContext.Provider value={{ color: 'grey' }}>
        <div className='navbar '>
        <Link className="left-nav" to="/">
        <img style={{ height: "70px" }}
          src="https://promotions.co.th/wp-content/uploads/2021/04/tipinsure.png" alt="logo-tip"/>
            <h3 className="username"><span>User :</span> {username}</h3>
      </Link>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <div className="nav-list">
            
            </div>
            <div className="nav-list">
            <Link to="/">Packages</Link>
          </div>
          <div className="nav-list">
            <Link to="/policy">Policy</Link>
          </div>
          {/* <div className="nav-list">
            <Link to="/dashboard">Dashboard</Link>
          </div> */}
          <div className="nav-list">
            <Link to="/profile">Profile</Link>
          </div>
          {/* <div className="nav-list">
            <Link to="/signup">Singup</Link>
          </div> */}
          <div className="nav-list">
            <Link to="/" onClick={handleLogOut}>Logout</Link>
          </div>

          </ul>
        </nav>
     
        </IconContext.Provider>
   
      </>
    );
  }
  return (
    <>
    <IconContext.Provider value={{ color: 'grey' }}>
   
    <div className='navbar'>
    <Link className="left-nav" to="/">
    <img
      style={{ height: "70px" }}
      src="https://promotions.co.th/wp-content/uploads/2021/04/tipinsure.png"
      alt="logo"
    />
    
  </Link>
      <Link to='#' className='menu-bars'>
        <FaIcons.FaBars onClick={showSidebar} />
      </Link>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
      <ul className='nav-menu-items' onClick={showSidebar}>
        <li className='navbar-toggle'>
          <Link to='#' className='menu-bars'>
            <AiIcons.AiOutlineClose />
          </Link>
        </li>
        <div className="nav-list">
            
          </div>
          <div className="nav-list">
            <Link to="/">Packages</Link>
          </div>
          <div className="nav-list">
            <Link to="/signup">Sign Up</Link>
          </div>
          <div className="nav-list">
            <Link to="/login">Login</Link>
          </div>

      </ul>
    </nav>
 
    </IconContext.Provider>
    </>
  );
}

export default Nav;
