const fs=require('fs').promises;
const path=require('path');
const {s3,S3_BUCKET}=require('../config/aws-config');
async function pullRepo() {
 const repoPath=path.resolve(process.cwd(),"repospace");
 const commitsPath=path.join(repoPath,"commits");
 try{
   const data=await s3.listObjectsV2({Bucket:S3_BUCKET,Prefix:"commits"}).promise();
   //aws method listobject whoes version is V2 pass the bucket name from where u what to pull and the folder name from which u want to pull as prefix
  const objects=data.Contents;
  //List for all files and folders within our s3 bucket 
  for(const obj of objects)//reads folder one by one
  {
    const key=obj.Key;//folder name 
    const commitDir=path.join(commitsPath,path.dirname(key).split('/').pop());
    await fs.mkdir(commitDir,{recursive:true});//reads files inside a folder one by one
    const params={
        Bucket:S3_BUCKET,
        Key:key,
    }
    const fileContent=await s3.getObject(params).promise();//for each object we can read the content based on parameters
    await fs.writeFile(path.join(repoPath,key),fileContent.Body);
    //downloading the files and moving them to relavent path
    console.log('All commits pulled from s3 ');  
}

 }
 catch(err){
    console.error("Unable to pull",err);
 }
}
module.exports={pullRepo};