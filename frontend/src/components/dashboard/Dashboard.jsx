import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './dashboard.css'
import Navbar from '../Navbar';

const Dashboard = () => {
  const [repositories,setRepositories]=useState([]);//only cur user repos
  const[searchQuery,setQuery]=useState("");//value that uses writes in search field
  const[suggrepos,setSuggrepos]=useState([]);//all repos of all the users
  const [searches,setSearches]=useState([]);//search results based on user repos we filter it
  useEffect(()=>{// fetching of data useEffect
    const userId=localStorage.getItem("userId");
    //fetch for userspecific repo
    const fetchRepos=async()=>{
      try{
 const response = await axios.get(`http://localhost:3000/repo/user/${userId}`);
 const data= response.data;
 setRepositories(data.repository)//repository is the name of the array that we get in console  of chrome
    }
  catch(err)
  {
    console.error("Error while fetching repository",err);
  }}
  //fetching suggested repos all repos of db 
  const fetchSugRepo=async()=>{
    try{
const response = await axios.get(`http://localhost:3000/repo/all`);
 const data= response.data;

 
setSuggrepos(data)//only data becuse the data itself is containg all repos
    }
    catch(err)
    {
      console.error("Error while fetching repository",err);
    }
  }
    fetchRepos();
    fetchSugRepo();
  },[])
  
    useEffect(()=>{
      if(searchQuery==''){
        setSearches(repositories);//if no query then show all repositories of the user
      }
      else{
        const filteredRepo=repositories.filter(repo=>repo.name.toLowerCase().includes(searchQuery.toLowerCase()));
        // if repo name comes inside search query and if it matches the repo name or if its part of the repository name
        //then set the search results to the filtered repo
      
      setSearches(filteredRepo);}
    },[searchQuery,repositories]);

  
  return (<><Navbar/>
      <div className="container-fluid mt-5 d-flex  vh-100 flex-column">
        <div className="row h-100 mb-5">
        <div className="col-md-4 d-flex">
         <div class="card w-100 h-100 border flex-fill shadow-sm p-3 "style={{ backgroundColor: '#161b22', borderColor: '#30363d', color: '#c9d1d9' }}>
  <div class="card-body">
            <h3>Suggested Repositories</h3>
            {suggrepos.map((repo)=>{
              return(
              <div key={repo._id}>
              <h4>{repo.name}</h4>
              <h4>{repo.description}</h4>
               </div>);
            })}</div></div>
        </div>
        {/* side pannel 2 and 1 main pannel */}
        <div className='col-md-4 d-flex'>
          <div class="card w-100 border h-100  flex-fill shadow-sm p-3 "style={{ backgroundColor: '#161b22', borderColor: '#30363d', color: '#c9d1d9' }}>
  <div class="card-body">
          <div  id='search'>
              <h3>Your Repositories</h3>
          <input type="text" value={searchQuery} placeholder='Search...' onChange={(e)=>setQuery(e.target.value)}></input>
          </div>
        
          {searches.map((repo)=>{
            return(
              <div key={repo._id}>
              <h4>{repo.name}</h4>
              <h4>{repo.description}</h4>
               </div>);
          })

          }</div></div>
        </div>
        <div className='col-md-4 d-flex'>
          <div class="card w-100 h-100 flex-fill border shadow-sm p-3 "style={{ backgroundColor: '#161b22', borderColor: '#30363d', color: '#c9d1d9' } }>
  <div class="card-body">
          <h3>Upcoming Events</h3>
          <ul>
            <li><p>Tech Conferance -Sep 15</p></li>
             <li><p>Developer Meetup -Oct 6</p></li>
             <li><p>React Summit - Nov 21</p></li>
          </ul></div></div>
        </div></div>
      </div></>
  )
}

export default Dashboard;