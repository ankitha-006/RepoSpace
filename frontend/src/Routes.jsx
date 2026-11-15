import React,{useState,useEffect}from 'react';
import {useNavigate,useRoutes} from 'react-router-dom'; 
//this is a function which will be available in the router

//Pages List
import DashBoard from './components/dashboard/Dashboard';
import Profile from './components/user/Profile';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import Create from './components/repo/CreateRepo';
import RepoDetails from './components/repo/RepoDetails';
import { useAuth } from './AuthContext';//custom hook that we had created which info user is logged in or not
const ProjectRoutes=()=>{
 const {curUser,setCurUser}=useAuth();//if user is not set we can set it
 const navigate=useNavigate();//it return a method for changing the loc (if we want to redirect)
 useEffect(()=>{
  const userIdFromStorage=localStorage.getItem("userId");
  //during login the id is set along with jwt tokenit is given by data base which is stored in local storage 
  // we are checking it here this is for every page  every component
  if(userIdFromStorage&&!curUser)
  {
    setCurUser(userIdFromStorage);
    //id is available but user has not  logged in  we set as logged in
  }
  if(!userIdFromStorage && window.location.pathname!=="/auth"&& window.location.pathname!=="/signup")
  {// if user is not present in local storage and the users cur path is not even /auth or /signup 
    //then redirect user to /auth  path to signup first
    navigate("/auth")
  }
  if(userIdFromStorage&& window.location.pathname ==='/auth')
  {
    navigate("/");
    // if user is already logged in and is at path /auth still then nav him to dashboard
  }
 },[curUser,navigate,setCurUser]);//when ever anyone of these 3 things changes the useeffect 
//  will show the effect ie it triggers a re load (rerender)

let element=useRoutes([
    {
        path:"/",
        element:<DashBoard/>
    },
    {
         path:"/auth",
        element:<LogIn/>
    },
    {
         path:"/signup",
        element:<SignUp/>
    },
    {
     path:"/profile",
        element:<Profile/>
    },
     {
     path:"/create",
        element:<Create/>
    },
     {
     path:"/repo/:id",
        element:<RepoDetails/>
    }

]);
return  element;

}
export default ProjectRoutes;