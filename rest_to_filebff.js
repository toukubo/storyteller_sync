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
            file_path = "./nouns/" + noun.name + ".json"
            fs.writeFileSync(file_path,JSON.stringify(noun  , null, 2) )

        }

        // file_path = "./nouns/" + noun.name + ".json"
        // console.log("object.id : ")
        // console.dir(object.id)
    
        // fs.writeFileSync(file_path,JSON.stringify(noun  , null, 2) )

    });
    // console.log("nouns : ")
    // console.dir(nouns)
 
});



var verbs= []
const verbsPath = path.join("./rest/", 'verbs');
console.log("verbsPath : ")
console.dir(verbsPath)
var verbFiles = fs.readdirSync(verbsPath);
verbFiles.forEach(file => {
    let filePath = pwd+"/rest/verbs/"+file;

    if(filePath.endsWith(".json")){
        verb = require(filePath)

        // console.log(noun); 
        verbs.push(verb)
    }
});


var sentences= []
const sentencesPath = path.join("./rest/", 'sentences');
console.log("sentencesPath : ")
console.dir(sentencesPath)
if (!fs.existsSync("./sentences/")){
    shell.mkdir('-p',"./sentences/")
}
fs.readdir(sentencesPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        let filePath = pwd+"/rest/sentences/"+file;

        if(filePath.endsWith(".json")){
            sentence = require(filePath)
            // console.log("verbs : ")
// console.dir(verbs)

            verbs.forEach(function(verb){

                if(sentence.verb==verb.id){
                    sentence.verb = verb.name
                }

            })
            nouns.forEach(noun => {
                if(Array.isArray(sentence.objective)){
                    sentence.objective = sentence.objective[0]
                }
                if(sentence.objective==noun.id){
                    sentence.objective=noun.name
                }
                if(sentence.actor == noun.id){
                    // console.log('hey look it is passing here ')
                    sentence.actor = noun.name
                }
                // console.log('hey look it doesnt for actor ' + sentence.actor + " and for sentence : " )
                // console.debug(sentence)

            });
            // sentence.sentence_string = sentence.actor + " " + sentence.verb+ " " +sentence.objective
            // console.log(noun); 
            sentences.push(sentence)
            // console.debug(sentence)
            // console.debug(": is sentence")
            if(sentence.sentence_string){
                file_path = "./sentences/" + sentence.sentence_string.trim() + ".json"
                fs.writeFileSync(file_path,JSON.stringify(sentence  , null, 2) )        }

            }
            // console.log("object.id : ")
            // console.dir(object.id)
        

    
        // console.log("object : ")
        // console.dir(object)
    


    });
    // console.log("sentences : ")
    // console.dir(sentences)
 
});
