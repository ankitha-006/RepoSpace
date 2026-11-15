const mongoose =require('mongoose');
const {Schema}=mongoose;
const userSchema = new Schema({
    //  timestamps:true,
userName:{
    type:String,
    required:true,
    unique:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:
{
    type:String,
},
followedUser:{//array of all users that currrent user is following
    default:[],
    type:Schema.Types.ObjectId, // this means its going to pont to another object its a link
    ref:"User",
},
repositories:{//array of repos which user has created
    default:[],
    type:Schema.Types.ObjectId, // this means its going to pont to another object that is repo model its a link
    ref:"Repository",
},
star:{//array of repos which user has stared as favorite
    default:[],
    type:Schema.Types.ObjectId, // this means its going to point to another object that is repo model its a link
    ref:"Repository",
}
});
const User= mongoose.model("User",userSchema);
module.exports=User;