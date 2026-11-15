const express= require('express');
const dotenv=require('dotenv');//acess env files 
const cors=require('cors');//cross origin resourse sharing for security  for custom server which is not 
// secure and we need to coonect to user
const mongoose =require('mongoose');//coonect mongodb and for crud operations
const bodyParser=require('body-parser');//helps to read data coming from the
//  req and sent it as response(read write data)typically for JSON to convert from JSON to java script and javascript to json
const http=require('http');//server
dotenv.config();//values of env get enabled on the process 
const {Server}=require('socket.io');

//importing routers
const mainRouter=require("./routes/main.router.js")


let user ="test";

const yargs = require("yargs");
const { initRepo } = require("./Controllers/init.js");
const { add } = require("./Controllers/add.js");
const { commit } = require("./Controllers/commit.js");
const { pullRepo } = require("./Controllers/pull.js");
const { pushRepo } = require("./Controllers/push.js");
const { revertRepo } = require("./Controllers/revert.js");
const { hideBin } = require("yargs/helpers");
yargs(hideBin(process.argv))
  .command("start","starts a server",{},start)
  .command("init", "Initialize new Repo", {}, initRepo)
  .command("add <file>", "Add a file to Repo", (yargs)=>{yargs.positional('file',{
    describe:"File to add to staging area",
    type:"String",
  })}, (argv)=>{
    add(argv.file);
  })
  .command("commit <message>", "Commit to Repo", (yargs)=>{yargs.positional('message',{
    describe:"Add message",
    type:"String"})}, (argv)=>{
    commit(argv.message);
  })
  .command("pull", "Pull from Repo", {}, pullRepo)
  .command("push", "Push into Repo", {}, pushRepo)
  .command("revert <commitID>", "Revert to", (yargs)=>{yargs.positional('commitID',{
    describe:"CommitID to revert to",
    type:"String"})},(argv)=>{
    revertRepo(argv.commitID);
  })
  
  .demandCommand(1, "You need atlest 1 command")
  .help().argv;

function start(){
  const app=express();//express app creaction calling constructer
  const  port=process.env.PORT || 3000;//||because if we deploy it in server server will
  //  provoid a port which will be available  in process.env.port
  app.use(bodyParser.json());//as we are using json we mention it as .json
  app.use(express.json());
  const mongoURI=process.env.MONGODB_URI;
  mongoose.connect(mongoURI).then(()=>{
    console.log("MongoDB connected")
  }).catch((err)=>console.error("Unable to connect",err));//establishes connection with mongodB based on the uri
  app.use(cors({origin:"*"}));//request can come from any url or loctaion and it should be treated as valid path
  //security consernes will be overrided and all requests will be allowed
    app.use("/",mainRouter)
  const httpServer=http.createServer(app);//create app for the express app location created on line 47
  const io=new Server(httpServer,{
    cors:{
      origin:"*",//all requests
      method:["GET","POST"]// user must be able to sent get and post request to server
    },
  });
  io.on("connection",(socket)=>{     //switching on the socket when server is triggered  and we have to add the user to the connection
    socket.on("joinRoom",(userID)=>{//anybody who just logged in will be abled to access this socket
      user=userID;
      console.log("=======");//indicate seperate channel
      console.log(user);//user name
      console.log("=======");
      socket.join(userID);
    })
  })
  //SET up database
  const db= mongoose.connection;
  //once mean all the req which we write here should run once one after the another as soon as the connection is set up
  //we will connect only once and fetch multiple requests
  db.once("open",async()=>{
    console.log("CRUD operations");
    //CRUD operations
  });
  //SERVER CRAEATION
  httpServer.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
  });
}

  

  







  
  