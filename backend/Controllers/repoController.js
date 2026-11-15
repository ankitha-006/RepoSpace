const mongoose = require("mongoose"); //here we are using mongoose not mongodb
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");
const createRepo = async (req, res) => {
  try {
    const { owner, name, issues, content, description, visibality } = req.body;
    if (!name) {
      return res.status(404).json({ message: "Repository name is required" });
    }
    if (
      !mongoose.Types.ObjectId.isValid(owner)
    ) //in mongoose its Type.ObjectId and for mongoDb its.ObjectId to access id
    {
      //if owner is a valid mongoose objet true is returned if not if condition will execute
      return res.status(404).json({ message: "Invalid User id " });
    }
    const newRepo = new Repository({
      //creating new repository using repository model
      name, //same values passed in req will be retained
      description,
      visibality,
      owner,
      content,
      issues,
    });
    const result = await newRepo.save(); //this is same as insertOne of mongodb  in mongoose its save
    res
      .status(201)
      .json({ message: "Repository created", repositoryID: result._id });
  } catch (err) {
    console.error("Error during Creating Repo");
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const getAllRepo = async (req, res) => {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issues"); //this is mongoose way of doing if itd mongodb we
    // first establish connection and do find({{}}) on the collection in mongoose case we implement it directly on model
    //Issue and owner are external objects we have to fill them also so we use populate
    //populate runs another fetch whoes id will be written
    //eg: repoid which we get upon creating new repo if we see that particular repo in db it has owner id  this owner id has to be fetched
    //we dont just want the id insted we want the data of that owner such as followers started repo password email etc this is fetched by populate
    //if populate is not used only id will apper on fetching the repo
    res.json(repositories);
  } catch (err) {
    console.error("Error during Feching Repositories");
    res.status(500).send("Server Error");
  }
};

const getRepoById = async (req, res) => {
  const repoId=req.params.id;

try{
 const repository=await Repository.find({_id:repoId})
  .populate("owner")
  .populate("issues");;//filter those repos whoes id matches with given id
    if(!repository)// not found case
        {
return res.status(400).json({message:"Invalid credentislas"})
        }
    res.json(repository);
}
catch(err){
  console.error("Error during Feching Repository by ID");
    res.status(500).send("Server Error");
}
};


const getRepoByName = async (req, res) => {
    const repoName=req.params.name;
try{
 const repository= await Repository.find({name:repoName})
  .populate("owner")
  .populate("issues");;//filter those repos whoes name matches with given name
    if(!repository)// not found case
        {
return res.status(400).json({message:"Invalid credentislas"})
        }
    res.json(repository);
}
catch(err){
  console.error("Error during Feching Repository by name");
  console.error(err);
    res.status(500).send("Server Error");
}
};

const getRepoCurUser = async (req, res) => {
  const userId=req.params.userId;
 try{
const repository=await Repository.find({owner:userId})
if(!repository||repository.length==0)
{
  return res.status(404).json({ message: "User Repository not Found"})
}
res.json({message:"Repository is found",repository})
 }catch(err){
  console.error("Error during Feching Repository by name");
  console.error(err);
    res.status(500).send("Server Error");
}
};

const updateRepoById = async (req, res) => {
  const id=req.params.id;
    const {content,description}=req.body;
try{
    const repository=await Repository.findById({id});
    if(!repository)
{
  return res.status(404).json({ message: "Repository not Found"});
}
  //puting new content to existing content
  repository.content.push(content);
//overriding the description with the description coming from the req
  repository.description=description;
  const uprepo=await repository.save();
  res.json({message:"Updated Repository ",repository:uprepo});

  
}catch(err){
  console.error("Error during Updating Repository by name");
  console.error(err);
    res.status(500).send("Server Error");
}

};
const toggleRepoById = async (req, res) => {
    const id=req.params.id;
try{
    const repository=await Repository.findById({id});
    if(!repository)
{
  return res.status(404).json({ message: "Repository not Found"});
}
  // if its true becomes false if false becomes true
 reposiroty.visibality=!repository.visibality;
  

  const uprepo=await repository.save();
  res.json({message:"Successfull toggling ",repository:uprepo});
  
  
}catch(err){
  console.error("Error during Updating Repository by name");
  console.error(err);
    res.status(500).send("Server Error");
}
};
const deleteRepoById = async (req, res) => {
  const{id}=req.params;
  try{
  const repository=await Repository.findByIdAndDelete(id);
     if(!repository)
{
  return res.status(404).json({ message: "Repository not Found"});
}
res.json({message:"Repository deleted"})
  }
  catch(err){
      console.error("Error during Deleting Repository ");
  console.error(err);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  createRepo,
  getAllRepo,
  getRepoById,
  getRepoByName,
  getRepoCurUser,
  updateRepoById,
  toggleRepoById,
  deleteRepoById,
};
//updat,delete,createrepo   rotes are authorised routes that is only logged in users can use it
//getrepobyid and getrepocuruser  get allrepo can be used by anyone provided  repo public
//users is logined or singediup is checked in the router using middle wear
