#!/usr/bin/env node
var fs = require('fs');
var shell = require('shelljs');


const minimist = require('minimist')
require('./setup_path.js')


const args = minimist(process.argv.slice(2))

restbase = args._[0]

//should loop if Storyteller Compose is on
var nounObject = {
    noun : {
        name: "Noun",
        project: "storyteller",
        attrs:[
            {
                name: "name",
                type: "string"
             },
         ]
    }
 };


syncer = loadSyncerPlugin()
nounObjects=syncer.nounObjects

console.log(nounObjects)

if (!fs.existsSync(NOUN_BASE)){
    shell.mkdir('-p',NOUN_BASE)
}
nounObjects.forEach(function(nounObject){
    noun_file_path = NOUN_BASE  + nounObject.name + ".json"
    fs.writeFileSync(noun_file_path,JSON.stringify(nounObject   , null, 2) )
})

// no. should turn this to a module
function loadSyncerPlugin(){
    // for now, ( and @todo ) it should be an options and config loading and setting the plugin,
    // do existance check for the loader
    var plugin_name =  "airtable"
    var selected_loader = "storyteller_"+"airtable"+"_syncer"
    return require(selected_loader)
}