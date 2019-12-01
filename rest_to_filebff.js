const path = require('path');
const fs = require('fs');
require('./setup_path.js')
const shell = require('shelljs')

if (!fs.existsSync("./nouns/")){
    shell.mkdir('-p',"./nouns/")
}

attrs = []

const attrsPath = path.join("./rest/", "attrs");
pwd = process.cwd()

fs.readdir(attrsPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        let filePath = pwd+"/"+attrsPath+"/"+file;
        if(filePath.endsWith(".json")){

            // console.log(filePath); 
            attr = require(filePath)
            // console.log(attr); 
            attrs.push(attr)
            }
    });
});
console.log("attrs : ")
console.dir(attrs)


var nouns= []
const nounsPath = path.join("./rest/", 'nouns');
console.log("nounsPath : ")
console.dir(nounsPath)
fs.readdir(nounsPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        let filePath = pwd+"/rest/nouns/"+file;

        if(filePath.endsWith(".json")){
            noun = require(filePath)
            noun.attrs = []
            attrs.forEach(function(attr){
                if(attr.noun){
                    if(attr.noun[0]==noun.id){
                        noun.attrs.push(attr)
                    }
                }
            })
            // console.log(noun); 
            nouns.push(noun)
        }

    
        // console.log("object : ")
        // console.dir(object)
    
        file_path = "./nouns/" + noun.name + ".json"
        // console.log("object.id : ")
        // console.dir(object.id)
    
        fs.writeFileSync(file_path,JSON.stringify(noun  , null, 2) )

    });
    console.log("nouns : ")
    console.dir(nouns)
 
});
