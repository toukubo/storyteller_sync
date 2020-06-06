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
Noun = {}
Noun.ID = "nouns"
Noun.TABLE_NAME = "Nouns"
Project = {}
Project.ID = "projects"
Project.TABLE_NAME = "Projects"
Attr = {}
Attr.ID = "attrs"
Attr.TABLE_NAME = "Attrs"
Verb = {}
Verb.ID = "verbs"
Verb.TABLE_NAME = "Verbs"
Sentence = {}
Sentence.ID = "sentences"
Sentence.TABLE_NAME = "Sentences"
Template = {}
Template.ID = "templates"
Template.TABLE_NAME = "Templates"
Story = {}
Story.ID = "stories"
Story.TABLE_NAME = "Stories"
Framework = {}
Framework.ID = "frameworks"
Framework.TABLE_NAME = "Frameworks"
Layer = {}
Layer.ID = "layers"
Layer.TABLE_NAME = "Layers"
Project = {}
Project.ID = "projects"
Project.TABLE_NAME = "Projects"
// Execution = {}
// Execution.ID = "executions"
// Execution.TABLE_NAME = "Executions"
// Generation = {}
// Generation.ID = "generations"
// Generation.TABLE_NAME = "Generations"
// ProjectFramework = {}
// ProjectFramework.ID = "projects_frameworks"
// ProjectFramework.TABLE_NAME = "ProjectsFrameworks"



models = [Attr,Noun,Project,Layer,Sentence,Verb,Template,Story,Framework]
// models = [Attr,Noun,Project,Sentence,Verb,Template,Story,Framework,Execution,Generation,ProjectFramework]
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

