const fs = require("fs");
const path = require("path");
const { promisify } = require("util"); 
//util is a package which is preinstalled internal API of node which allows us to check for existing things revert 
// output depend on ID if we have a commit which maches this id only then we can do it
// if no id exits there is no use of it for handling this we use promisify it is basically used as wrapper
//the functions can take effect  only if necessery things exits  theses are wrapped by wrapper 
const readdir=promisify(fs.readdir);//Overriding in a way  where we can wrap it within promisify 
//we have created our modified version of directory which is inside promicify ie it can only read 
// if the directory exists if doesnot exist gives error message
const copyFile=promisify(fs.copyFile);//if any commit exists with the specified name then copy it inside the  parent
//  Directory so that changes get reverwrted

async function revertRepo(commitID) {
  const repoPath= path.resolve(process.cwd(),'repospace');
  const commitPath=path.join(repoPath,'commits');

  try{
    const commitDir=path.join(commitPath,commitID);
      const files=await readdir(commitDir);//costum overided method readdir used toed read the commitDir
      //ifd an error occurs that means no such folder with given commit id exits
      //this throws the error to catch
      const parDir=path.resolve(repoPath,'..');//this line is used only if that folder or file exits
      //.. as we have to go one dir out from current dir 
      for(const file of files)
      {
        await copyFile(path.join(commitDir,file),path.join(parDir,file));
           // copy file from commit dir ,file name to parDir director ,filename
      }
      console.log(`Commit with commitId:${commitID} reverted succesfully`);
  }
  catch(err)
  {
    console.error('Error reverting the commit',err);
  }
}
module.exports = { revertRepo };
