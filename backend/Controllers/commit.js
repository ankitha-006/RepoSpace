const fs=require('fs').promises;
const path=require('path');
const {v4:uuidv4}=require('uuid');
//with version num as it increases securety increases v4 and v5 has more secured uuid  we use v4 as it run faster v5 takes more process time due to encrytion
async function commit(message) {
 const repoPath=path.resolve(process.cwd(),'repospace');
 const stagePath=path.join(repoPath,'staging');
 const commitPath=path.join(repoPath,'commits');
 try{
      const commitID=uuidv4();//constructer call to generate id
      const commitDir=path.join(commitPath,commitID);
      await fs.mkdir(commitDir,{recursive:true});
      const files= await fs.readdir(stagePath);
      //it reads all the file from staging folder
      for(const file of files)
      {
        await fs.copyFile(path.join(stagePath,file),path.join(commitDir,file));
      }
     
      await fs.writeFile(path.join(commitDir,"commit.json"),JSON.stringify({message,"date":new Date().toISOString()}))
      
      console.log(`Commit: ${commitID} created with message ${message} `);
 }
 catch(err){
   console.error('Error commiting the file',err)
 }

}
module.exports={commit};