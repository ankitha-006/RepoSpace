const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {MongoClient, ReturnDocument}=require('mongodb');
// flower brackets because its a class
const dotenv= require('dotenv');
dotenv.config();//initializing 
const uri=process.env.MONGODB_URI;
var ObjectId=require('mongodb').ObjectId;//its a package 

let client;    //This variable establishes the connection
async function connectClient(){//connects client to db its async as it takes time to connect
   if(!client)//if connection is not established yet
   {
    client= new MongoClient(uri);
    await client.connect();//wait til connection gets established
   }
}

const signUp=async (req,res)=>{
    const {username,password,email}=req.body;
    //{}means destructuring
    try{
        await connectClient();//establishes connection
        const db=client.db("repospace");//repospace is the name given in .env  mongodb_uri(/?) connection with repospace db
        const usersCollection=db.collection("users");//creating collection
        // if collction not there it gets created


        //check if the user already exits
        const user=await usersCollection.findOne({userName:username});
        if(user)//found case
        {
return res.status(400).json({message:"User already exists"})
        }
        //if not found create one
        const salt=await bcrypt.genSalt(10);// number of times encryption must be run by default its 10.
        // it encrypts 10 times to get a secured set up 
        //
        const hashedPassword=await bcrypt.hash(password,salt);
        //encrypting user password(take password from user then encrypt it) this goes into db
        const newUser={
            userName:username,
            password:hashedPassword,
            email,
            repositories:[],
            followedUsers:[],
            startRepo:[]
        }
        const result= await usersCollection.insertOne(newUser);//adding the user to db

        const token=jwt.sign({id:result.insertedId},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});//the insertId mongodb automatically creates when a new user is added
    res.json({token,userId:result.insertId});// it needs to be in json so obj syntax
    }catch(err){
        console.error("Error during sign up",err);
        res.status(500).send("server error");
    }
    
}
const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        await connectClient();//establishes connection
        const db=client.db("repospace");//repospace is the name given in .env  mongodb_uri(/?) connection with repospace db
        const usersCollection=db.collection("users");//creating collection
        // if collction not there it gets created
 //check if the user already exits
        const user=await usersCollection.findOne({email});
        if(!user)// not found case
        {
return res.status(400).json({message:"Invalid credentislas"})
        }
        const isMatch=await bcrypt.compare(password,user.password);//check if the pass coming from req and password of user found in dbare same
                                  //it encrypts the password and compares with user.password if there is a match true
            if(!isMatch)
            {
               return res.status(400).json({message:"Invalid credentislas"}) 
            }
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
            res.json({token,userId:user._id});
    }catch(err){
        console.error("Error during login",err);
        res.status(500).send("server error");
    }
}

const getAllUsers=async (req,res)=>{
    try{
        await connectClient();
        const db=client.db("repospace");
        const usersCollection=db.collection("users");
        
        const users=await usersCollection.find({}).toArray();//find everything and store  it in the form of array
        res.json(users);//it gives error during fetching converting citcular structure to json this happends becauses data in users is
        //not in json format so to fix it we converted it to array

    }catch(err){
           console.error("Error during fetching",err);
        req.status(500).send("Server error")
    }
}

const getUserProfile=async(req,res)=>{
    const curId=req.params.id;//access the parameters from url
    try{

     await connectClient();//establishes connection
        const db=client.db("repospace");//repospace is the name given in .env  mongodb_uri(/?) connection with repospace db
        const usersCollection=db.collection("users");//creating collection
        const user=await usersCollection.findOne({_id:new ObjectId(curId)});//mongodb has findeOne in mongoose we have findById functionality same
        //in mondodb _id is of type Object class and curId here is in string so we convert it to object class
               if(!user)// not found case
        {
return res.status(400).json({message:"Invalid credentislas"})
        }
        res.send(user,{message:"Profile fetched!"})
    }catch(err){
         console.error("Error during fetching",err);
        res.status(500).send("Server error")
    }
    
}
const updateUserProfile=async(req,res)=>{
      const curId=req.params.id;//access the parameters from url
      const {email,password}=req.body;
      try{
         await connectClient();//establishes connection
        const db=client.db("repospace");//repospace is the name given in .env  mongodb_uri(/?) connection with repospace db
        const usersCollection=db.collection("users");
        let updateFields={email};//updatefiels is an object
        if(password)//if password is provided
        {
          const salt=await bcrypt.genSalt(10);
          updateFields.password=await  bcrypt.hash(password,salt);
          
        }
        //if password is undefined this if condition will not work only email will be updatedin that case
       const result=await usersCollection.findOneAndUpdate({_id:new ObjectId(curId)},{$set:updateFields},{returnDocument:"after"});//all fields  in updateField 
    //    object will be updated   once the doc is updsted we should get the document in response so that we can show the user  this has beeen 
    //updated 

      if(!result)
      {
            return res.status(404).json({message:"User not found"})
      }
      res.send(result)

      }
      catch(err){
            console.error("Error during updating",err);
        res.status(500).send("Server error")
      }
}
const deleteUserProfile=async(req,res)=>{
     const curId=req.params.id;
     try{ await connectClient();//establishes connection
        const db=client.db("repospace");//repospace is the name given in .env  mongodb_uri(/?) connection with repospace db
        const usersCollection=db.collection("users");
        const result=await usersCollection.deleteOne({_id:new ObjectId(curId)});
        if(result.deleteCount==0)// if count is zee user is not present
        {
           return res.status(404).json({message:"User not found"})
        }
       res.json({message:"User Profile Deleted"});
     }
     catch(err)
     {
            console.error("Error during deletion",err);
        res.status(500).send("Server error")
     }
    
}
module.exports={getAllUsers,signUp,login,getUserProfile,updateUserProfile,deleteUserProfile}