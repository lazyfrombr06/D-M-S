import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, Routes, Route } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import './Login.css'

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const HandleLogin = async () => {
    console.log(email, password);

    let result = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.warn(result);

    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please enter valid details");
    }
  };

  return (
    <div className="login-component product-component">
      <h2 className="product-comp-heading">Admin Login</h2>

      <div className="input-box-container-of-log-in-page input-box-container-of-signup-page">
        <input
          type="email"
          placeholder="Enter your email"
          className="input-box-signup"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="input-box-container-for-password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="input-box-signup input-box-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {/* show password button */}
          {showPassword ? (
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="show-hide-button"
            >
              <FaEyeSlash />
            </button>
          ) : (
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="show-hide-button"
            >
              <FaEye />
            </button>
          )}
        </div>
        <button className="sing-up-button" type="button" onClick={HandleLogin}>
          Login
        </button>

        <div className="not-a-user">
          Not an user : 
       <NavLink to='/signUp'> sign up</NavLink>
                 </div>
      </div>
    </div>
  );
};

export default AdminLogin;
