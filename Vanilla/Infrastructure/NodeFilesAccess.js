var fs = require("fs");
var path = require("path");

function filesLister(path) {
    var allFiles = fs.readdirSync(path);
    return {
        files: allFiles
            .filter(function (f) { 
                try{
                    return fs.statSync(path + f).isFile(); 
                }
                catch(e){
                    return false;
                }
            })
            .map(function (f) { return { name: f, path: path+f } }),
        folders: allFiles
            .filter(function (f) { 
                try{
                    return fs.statSync(path + f).isDirectory();     
                }
                catch(e){
                    return false;
                }
                
            })
            .map(function (f) { return {expanded:false,files:[],folders:[],name:f,path:path+f+"/"} })
    };
};

function fileOpener(path2){
    return {name:(path.basename(path2)),path:path2,content:fs.readFileSync(path2, "utf8"),selected:false}
}

function fileSaver(path,content){
    fs.writeFileSync(path,content);
}






