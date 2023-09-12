import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet, NavLink } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import "./Login.css";
// import AdminLogin from "./AdminLogin";
// import UserLogin from "./UserLogin";



const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-page-component">
    
      <div className="signup-button-container">
   <ul>
        <li>
          <NavLink to="userLogin" className="nav-link" >
            User Login
          </NavLink>
        </li>

        <li>
          <NavLink to="adminLogin" className="nav-link" >
            Admin Login
          </NavLink>
        </li>
        </ul>
        <Outlet/>
      </div>
    </div>
  );
};

export default Login;
