const { Timestamp } = require('mongodb');
const mongoose =require('mongoose');
const {Schema}=mongoose;
const repoSchema=new Schema({
    // timestamps:true,//add two files to evry insertion updation deletion which is created at and updated at
    name:
    {
        type:String,
        required:true,
        unique:true, //within same repo name should be unique
    },
    description:{
        type:String,
    },
    content:[{ //its the list of file or folders name
      type:String,
    }],
    visibality:
    {
       type:Boolean, //true public false private
    },
    owner:{
         type:Schema.Types.ObjectId, // this means its going to point to another object that is user model its a link
    ref:"User",
    required:true,
    },
    issues:
    [{
    type:Schema.Types.ObjectId, // this means its going to point to another object that is user model its a link
    ref:"Issue",
    required:true,
    }]
});
const Repository = mongoose.model("Repository",repoSchema);
module.exports=Repository;
