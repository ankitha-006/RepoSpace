const fs= require('fs').promises;
const path=require('path');
const {s3,S3_BUCKET}=require('../config/aws-config');
async function pushRepo() {
 const repoPath=path.resolve(process.cwd(),"repospace");
 const commitsPath=path.join(repoPath,'commits');
 try{
     const commitDirs=await fs.readdir(commitsPath);
     //commits folder can contain multiple commits(folders) so when we push everything must be pushed
     for(const commitDir of commitDirs)//folders inside commits folder at folder level
        {
            const commitPath=path.join(commitsPath,commitDir);
            const files=await fs.readdir(commitPath);//files inside each folder of commitDir
            for(const file of files)
            {
                const filePath=path.join(commitPath,file);//path of each file inside the particular folder
                const filecontent=await fs.readFile(filePath);//read the file available in filepath
                const params={
                    Bucket:S3_BUCKET,
                    Key:`commits/${commitDir}/${file}`,
                    Body:filecontent,

                };
                await s3.upload(params).promise();//upload may take time so we use promiss to make it wait untill upload is completed
            }
        }
        console.log("All Commits pushed to S3")   
 }
 catch(err){
   console.error('Error pushing to S3',err)
 }
}
module.exports={pushRepo};