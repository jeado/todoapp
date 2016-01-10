var fs = require("fs");
var http = require("http");

fs.readFile(__dirname+"/todo.json", function(error, data){
    var todoList = JSON.parse(data);
    console.log(todoList);
});

var server =http.createServer(function(req,res){
    console.log("got request");
    console.log(req.url);

    fs.readFile("."+req.url,function(error, data){
        if(error){
            res.writeHead(404);
            res.end("<h1>not found</h1>");
        }
        else{
            var re = /(?:\.([^.]+))?$/;

            if(re.exec(req.url)[1] === "css")
                res.writeHead(200,{"Content-type":"text/css"});
            else
                res.writeHead(200,{"Content-type":"text/html"});
            res.end(data);
        }
    });

});

server.listen(8080,"localhost", function () {
   console.log("server listening in localhost:8080")
});
