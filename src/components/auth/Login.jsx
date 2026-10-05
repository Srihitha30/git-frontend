import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Button } from "@primer/react";
import "./auth.css";

import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3002/login", {
        email: email,
        password: password,
      });
      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);

      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">

      {/* GitHub Logo */}
      <div className="login-logo-container">
        <img
          className="logo-login"
          src={logo}
          alt="GitHub Logo"
        />
      </div>

      <div className="login-box-wrapper">

        {/* Sign In Heading */}
        <div className="login-heading">
          <h1
            style={{
              color: "white",
              fontSize: "32px",
              margin: "0",
              textAlign: "center",
            }}
          >
            Sign In
          </h1>
        </div>

        {/* Login Form */}
        <div className="login-box">

          {/* Email */}
          <div>
            <label className="label">
              Email address
            </label>

            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="div">
            <label className="label">
              Password
            </label>

            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </Button>

        </div>

        {/* Create Account */}
        <div className="pass-box">
          <p>
            New to GitHub?{" "}
            <Link to="/signup">
              Create an account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;