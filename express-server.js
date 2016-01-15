var express = require("express");
var bodyParser = require('body-parser');
var app = express();

var todos = [
    {
        done : false,
        todo : "server todo1"
    },
    {
        done : true,
        todo : "server todo2"
    },
    {
        done : false,
        todo : "server todo3"
    }
];

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(8080, function () {
    console.log("server started in 8080")
});

app.get("/todos", function (req, res) {
    res.write(JSON.stringify(todos));
    res.end();
});

app.post('/add', function (req, res) {
   var newTodo = req.body;
    todos.push(newTodo);
    res.end();
});