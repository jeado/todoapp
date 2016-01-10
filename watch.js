var fs = require('fs');

fs.watchFile(__dirname+"/todo.json", function (c) {
   console.log(fs.readFileSync(__dirname+"/todo.json").toString());
});