const mongoose =require('mongoose');
const {Schema}=mongoose;
const issueSchema= new Schema({
    //  timestamps:true,
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
    },
    status :{
        type:String,
        enum:["open","closed"], //category of issue is selected from the enum
        default:"open",//issues when created  by default is open
    },
    repository:{
    type:Schema.Types.ObjectId, // this means its going to point to another object that is repomodel its a link
    ref:"Repository",
    required:true,
    },
})
const Issue = mongoose.model("Issue",issueSchema);
module.exports=Issue;