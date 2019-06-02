#!/usr/bin/env node
var fs = require('fs');
var shell = require('shelljs');

const minimist = require('minimist')
require('./setup_path.js')

const args = minimist(process.argv.slice(2))

restbase = args._[0]
 

syncer = loadSyncerPlugin()
save = function(object,model){
    if (!fs.existsSync(Conventions.LOCAL_REST_BASE +"/"+ model.ID +"/")){
        shell.mkdir('-p',Conventions.LOCAL_REST_BASE +"/"+ model.ID +"/")
    }

    noun_file_path = Conventions.LOCAL_REST_BASE +"/"+ model.ID +"/" + object.name + ".json"
    fs.writeFileSync(noun_file_path,JSON.stringify(object  , null, 2) )
}
models = [NOUNS,PROJECTS,ATTRS]
syncer.exec(models,save)

// no. should turn this to a module
function loadSyncerPlugin(){
    // for now, ( and @todo ) it should be an options and config loading and setting the plugin,
    // do existance check for the loader
    var plugin_name =  "airtable"
    var selected_loader = "storyteller_"+"airtable"+"_syncer"
    return require(selected_loader)
}
