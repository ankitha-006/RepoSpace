const mongoose = require("mongoose"); //here we are using mongoose not mongodb
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

const createIssue=async(req,res)=>{//user must be logged in and there must be a repo
    const {title,description}=req.body;
    const {id}=req.params;//repo id
    try{
    const issue=new Issue({
        title,
        description,
        repository:id
    })

    await issue.save();

    res.status(201).json({message:"Issue created "})
}catch(err){
      console.error("Error during Creating Issue");
    console.error(err);
    res.status(500).send("Server Error");
}

}
const getAllIssues=async(req,res)=>{
    const {id}=req.params;//repo id
    try{
       const issues = await Issue.find({repository:id}); 
       if(!issues)
       {
  return res.status(404).json({message:"Issue not Found"})
       }
       res.status(200).json(issues)
    }catch(err){
           console.error("Error during Fetching Issue");
    console.error(err);
    res.status(500).send("Server Error");

    }
}
const getIssueById=async(req,res)=>{
    const {id}=req.params;
    try{
        const issue=await Issue.findById(id);
         if(!issue)
        {
            return res.status(404).json({message:"Issue not Found"})
        }
        res.status(200).json(issues)

    }catch(err){
            console.error("Error during Deleting Issue");
    console.error(err);
    res.status(500).send("Server Error");
    }
}
const updateIssueById=async(req,res)=>{

    const {id}=req.params;
    const {title,description,status}=req.body;
    try{
        const issue=await Issue.findById(id);
        if(!issue)
        {
            return res.status(404).json({message:"Issue not Found"})
        }
    
        issue.title=title;
        issue.description=description;
        issue.status=status;
        const upissue=await issue.save();
        res.json({message:"Issue updated",issue:upissue});
    }catch(err){
            console.error("Error during Updating Issue");
    console.error(err);
    res.status(500).send("Server Error");
    }
}
const deleteIssueById=async(req,res)=>{
    const {id}=req.params;
try{
    const issue=await Issue.findByIdAndDelete(id);
    if(!issue)
    {
           
            return res.status(404).json({message:"Issue not Found"})
        
    }
    res.json({message:"Issue deleted succesfully"});

}catch(err){
            console.error("Error during Deleting Issue");
    console.error(err);
    res.status(500).send("Server Error");
    }
}
module.exports={createIssue,getAllIssues,getIssueById,updateIssueById,deleteIssueById};