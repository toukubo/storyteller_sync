#!/usr/bin/env node
var fs = require('fs');
var shell = require('shelljs');

const minimist = require('minimist')
require('./setup_path.js')

const args = minimist(process.argv.slice(2))

restbase = args._[0]
 

syncer = loadSyncerPlugin()
save = function(object,model){
    if (!fs.existsSync("./rest/"+ model.ID +"/")){
        shell.mkdir('-p',"./rest/"+ model.ID +"/")
    }

    // console.log("object : ")
    // console.dir(object)

    file_path = "./rest/"+ model.ID +"/" + object.id + ".json"
    // console.log("object.id : ")
    // console.dir(object.id)

    fs.writeFileSync(file_path,JSON.stringify(object  , null, 2) )
}
NOUNS = {}
NOUNS.ID = "nouns"
NOUNS.TABLE_NAME = "Nouns"
PROJECTS = {}
PROJECTS.ID = "projects"
PROJECTS.TABLE_NAME = "Projects"
ATTRS = {}
ATTRS.ID = "attrs"
ATTRS.TABLE_NAME = "Attrs"
VERBS = {}
VERBS.ID = "verbs"
VERBS.TABLE_NAME = "Verbs"
SENTENCES = {}
SENTENCES.ID = "sentences"
SENTENCES.TABLE_NAME = "Sentences"

console.log("Conventions.LOCAL_REST_BASE : ")
console.dir(Conventions.LOCAL_REST_BASE)


models = [ATTRS,NOUNS,SENTENCES]
syncer.exec(models,save)

// no. should turn this to a module
function loadSyncerPlugin(){
    // for now, ( and @todo ) it should be an options and config loading and setting the plugin,
    // do existance check for the loader
    console.log("plugin_name : ")
    console.log(plugin_name)

    var plugin_name = plugin_name===undefined?"airtable":plugin_name
    console.log("goign to load using plugin : ")
    console.dir(plugin_name)

    var selected_loader = "storyteller_"+plugin_name+"_syncer"
    return require(selected_loader)
}

