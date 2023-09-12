import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // for make prvate comp
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  // for check filled data in console
  const collectData = async () => {
    console.log(name, email, password);

    let result = await fetch("http://localhost:4000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    result = await result.json();
    console.warn(result);
    if (result) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    }
  };
  return (
    <div className="sign-up-component">
      <h1 data-text="REGISTER" className="singup-main-heading">
        REGISTER
      </h1>
      <div className="input-box-container-of-signup-page">
        <input
          type="text"
          className="input-box-signup"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter your name"
        />
        <input
          type="email"
          className="input-box-signup"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
        />
        <input
          type="password"
          className="input-box-signup"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your password"
        />
      </div>
      <button
        onClick={collectData}
        className="sing-up-button"
        type="button"
        style={{ left: "3%" }}
      >
        Sign up
      </button>

     
          <Link to="/login" className="nav-link-in-signUp-page">
            Login
          </Link>
      
    </div>
  );
}

export default SignUp;
