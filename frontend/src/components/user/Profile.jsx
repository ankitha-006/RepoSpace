import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import Userlogo from '../../assets/user-profile-logo.svg'
import { useAuth } from "../../AuthContext";
import HeatMap from "./HeatMap";
const Profile= () => {
    const navigate = useNavigate();//its used in sub menu switch between overview  and stared repos
  const [userDetails, setUserDetails] = useState({ userName: "username" });//for empty we give default name as username
  const { setCurUser } = useAuth();//fetching cur User

  useEffect(() => {//fetch data only first load  no rerender as no fields update in profile
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {//if id exits means user is currently logged in fetch data of the user
        try {
          const response = await axios.get(
            `http://localhost:3000/getUser/${userId}`
          );
        
           setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);
  return (
         <>
      <Navbar />
      <UnderlineNav aria-label="Repository">
        <UnderlineNav.Item
          aria-current="page"
          icon={BookIcon}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Overview
        </UnderlineNav.Item>

        <UnderlineNav.Item
          onClick={() => navigate("/repo")}
          icon={RepoIcon}
          sx={{
            backgroundColor: "transparent",
            color: "whitesmoke",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Starred Repositories
        </UnderlineNav.Item>
      </UnderlineNav>

      <button
        onClick={() => {
          localStorage.removeItem("token");//uponlogout remove evrything
          localStorage.removeItem("userId");
          setCurUser(null);

          window.location.href = "/auth";//redirect user to /authscreen
        }}
        style={{position:"absolute",right:"10px", top:"95px"}}
        id="logout"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image"></div>


          <div className="name" style={{color:"#c9d1d9"}}>
          
            <h3 >{userDetails.userName}</h3>
       
          </div>

          <button className="follow-btn " >Follow</button>

          <div className="follower  d-flex" style={{color:"#c9d1d9"}}>
            <p className="me-2">10 Follower</p>
            <p>3 Following</p>
          </div>
        </div>

        <div className="heat-map-section mt-4 mx-5">
         <HeatMapProfile/>
        </div>
      </div>
    </>
  )
}

export default Profile;
