import React, { useState, useEffect } from "react";
import axios from "axios";//to establish connection from backend
import { useAuth } from "../../AuthContext";

import { PageHeader, Button } from "@primer/react";//primer is a styling library that we get from react page and button and 
// box design are taken from it
import "./auth.css";

import logo from "../../assets/repo-space.svg";
import { Link ,useNavigate} from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);//we have to detect when the set up is waiting for backend connection
  // generally when we click on signup we connect to backend server and we get response as id or token
  // this tells us when backend connectivity will run and at what point our fun works properly

  const { setCurUser } = useAuth(); //initialising setcurrent user
  const navigate=useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();// page reload on sign up will be prevented

    try {
      setLoading(true);
      //sever url to connect to backend
      const res = await axios.post("http://localhost:3000/signup", {
        email: email,
        password: password,
        username: username,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurUser(res.data.userId);
      

      // window.location.href = "/";
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Signup Failed!");
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
                <PageHeader.Title>Sign Up</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </div>
        </div>
 
        <div className="login-box">
          <div>
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="Username"
              id="Username"
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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
            disabled={loading}
           onClick={handleSignup}
          >
            {loading ? "Loading..." : "Signup"}
          </Button>
      
        </div>
        <div className="pass-box">
          <p>
            Already have an account? <Link to="/auth">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
