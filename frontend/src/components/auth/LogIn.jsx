import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { PageHeader, Button } from "@primer/react";
import "./auth.css";

import logo from "../../assets/repo-space.svg";
import { Link } from "react-router-dom";

const Login = () => {
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurUser } = useAuth();  // fetching cur user from hook

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurUser(res.data.userId);
      setLoading(false);

      window.location.href = "/"; // navigate("/") can also be used for that import navigate
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title>Log In</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </div>
        </div>
        <div className="login-box">
          <div>
            <label className="label">Email address</label>
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
          <div className="div">
            <label className="label">Password</label>
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

          <Button
            variant="primary"
            className="login-btn"
            disabled={loading} //if true enable else diable the button
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>
        <div className="pass-box">
          <p>
            New to RepoSpace? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;