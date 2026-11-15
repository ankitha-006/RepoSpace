const fs=require('fs').promises;
const path=require('path');
async function add(filePath) {
 const repoPath=path.resolve(process.cwd(),"repospace");
 const stagePath=path.join(repoPath,"staging");
 try{
     await fs.mkdir(stagePath,{recursive:true});
     const fileName=path.basename(filePath);
     await fs.copyFile(filePath,path.join(stagePath,fileName));
     console.log(`File ${fileName} added to staging area`)
 }
 catch(err){
    console.error('Error adding the file',err)
 }
}
module.exports={add};