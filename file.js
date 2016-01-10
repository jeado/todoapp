/**
 * Created by u212-pc1 on 2016. 1. 10..
 */
//console.log(global);
var fs = require("fs");
console.log("starting");
fs.readFile(__dirname+"/todo.json", function(error, data){
   if(error) console.log(error.message);
   else console.log("async contents : "+data);
});
console.log("ending");

console.log("starting");
var fileContents = fs.readFileSync(__dirname+"/todo.json");
console.log("sync contents : "+fileContents);
console.log("ending");
