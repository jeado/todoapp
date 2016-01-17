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
var users = [{
    email : "jay",
    pass : "jjj",
    id : 0
}];
var person = {name:'jay',favorite:['딸기','바나나','포도']};

var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var Passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var cookieParser = require("cookie-parser");
var session = require("express-session");

Passport.use('local',
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'pass'},
        function(email, pass, done){

            var user =  users.filter(function(user){ return user.email === email });
            console.log(user);
            if(user[0] === undefined || user[0] === null){
                return done( null, false, { message : "no user" });
            }
            if( user[0].pass !== pass ){
                return done( null, false, { message : "wrong password" });
            }
            done(null, user[0]);
        })
);

app.use(cookieParser());
//app.use(express.static(__dirname));
app.use('/bower_components',express.static(__dirname+'/bower_components'));
app.use('/node_modules',express.static(__dirname+'/node_modules'));
app.use('/todo.js',express.static('todo.js'));
app.use('/gmap.js',express.static('gmap.js'));
app.use('/todoService.js',express.static('todoService.js'));
app.use('/mockTodoService.js',express.static('mockTodoService.js'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(8080, function () {
    console.log("server started in 8080")
});
app.use(session({
    secret : 'sfsdfs',
    resave : false,
    saveUninitialized : false
}));
app.use(Passport.initialize());
app.use(Passport.session());
app.set('view engine','ejs');
Passport.serializeUser(function(user, done){
    console.log(user);
    done(null, user.id);
});
Passport.deserializeUser(function(id, done){
    console.log("id : "+id);
    done(null, users[id]);
});

app.get("/",function(req,res){
    console.log(req.user);
   if(!req.isAuthenticated()){
       res.redirect('/login');
   } else {
       //res.sendFile('index.html',{root: __dirname});
       res.render('index',{ user : req.user });
   }
});
app.get("/login",function(req,res){
    res.sendFile('login.html',{root: __dirname});
});
app.get("/todos", function (req, res) {
    res.write(JSON.stringify(todos));
    res.end();
});

app.get("/person", function (req, res) {
    res.write(JSON.stringify(person));
    res.end();
});
app.post("/login",function(req,res){
    console.log("user : ", req.user);
   Passport.authenticate('local', function(err, user, info){
       if(err) {
           return res.status(500).json({err: err});
       }
       if(!user) {
           return res.status(401).json({err: info});
       }
       req.logIn(user, function(err){
           if(err){
               return res.status(500).json({err : "can not log in"});
           }
           res.status(200).json({status: "login success"});
       });
   })(req, res);
});
app.post("/favorite", function (req, res){
    var newFavorite = req.body.favorite;
    person.favorite.push(newFavorite);
    res.end();
});

app.post('/add', function (req, res) {
   var newTodo = req.body;
    todos.push(newTodo);
    res.end();
});