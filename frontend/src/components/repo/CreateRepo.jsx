import React, { useState, useEffect } from "react";
import axios from "axios"; //to establish connection from backend
import { useAuth } from "../../AuthContext";
import logo from "../../assets/repo-space.svg";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader, Button } from "@primer/react";
function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [content, setContent] = useState([]);
  const [issue, setIssue] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setCurUser } = useAuth(); //initialising setcurrent user
  const navigate = useNavigate();
  const handleCreate = async (e) => {
    e.preventDefault(); // page reload on sign up will be prevented
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        setLoading(true);
        //sever url to connect to backend
        const res = await axios.post("http://localhost:3000/repo/create", {
          name: name,
          owner: userId,
          description: description,
          visibility: visibility,
          content: content,
          issue: issue,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("Id", res.data.repositoryID);

        // window.location.href = "/";
        setLoading(false);
        navigate(`/repo/${res.data.repositoryID}`);
      } catch (err) {
        console.error(err);
        alert(" Failed Creating Repository!");
        setLoading(false);
      }
    } else {
      alert("User not found.Please login");
      navigate("/auth");
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title>Create Repository</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </div>
        </div>

        <div className="login-box">
          <div>
            <label className="label">RepoName</label>
            <input
              autoComplete="off"
              name="Reponame"
              id="name"
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Description</label>
            <input
              autoComplete="off"
              name="description"
              id="description"
              className="input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Visibality</label>
            <button
              type="button"
              className={`btn ${visibility ? "btn-success" : "btn-secondary"}`}
              onClick={()=>setVisibility(!visibility)}
            >
              {visibility ? "Public " : "Private"}
            </button>
          </div>
          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleCreate}
          >
            {loading ? "Loading..." : "Create Repo"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Create;
