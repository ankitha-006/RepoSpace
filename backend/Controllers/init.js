
const fs=require('fs').promises;
//promiss helps in creating a hidden folder inside it creates json file automatically
const path=require("path");//path to current directory
async function initRepo() {
     const repoPath=path.resolve(process.cwd(),'repospace')
 //repositary path stores the path of the folder which will be created when init is called process.cwd gives current working directory,repospace is hidden folder name
const commitsPath=path.join(repoPath,"commits");
    try{
        await fs.mkdir(repoPath,{recursive:true})
        await fs.mkdir(commitsPath,{recursive:true})
           //recursive true means if one folder hidden exits  another folder can be created inside the same existing folder 
        await fs.writeFile(path.join(repoPath,"config.json"),JSON.stringify({buckets:"s3 bucket"}))
       // create a file whose pathis joined to repoPath and file name is config.json,inside json we store string detais so JSON.stringify
console.log("Repository initiallised");     

}
catch(err)
{
    console.error('Error initializing the repositry',err)

}
}

module.exports={initRepo};
