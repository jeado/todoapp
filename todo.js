/**
 * Created by u212-pc1 on 2016. 1. 10..
 */
var ul = document.createElement("ul");
ul.className = "list-group";

function createTodoEl(todo){
    var liEl = document.createElement("li");
       liEl.className = "list-group-item";
    var viewDivEl = document.createElement("div");
        viewDivEl.className = "view form-group";
    var checkboxDiv = document.createElement("div");
        checkboxDiv.className = "checkbox";
    var labelEl = document.createElement("label");
    var inputEl = document.createElement("input");
        inputEl.setAttribute("type","checkbox");
        inputEl.checked = todo.done;

    labelEl.appendChild(inputEl);
    labelEl.appendChild(document.createTextNode(" "));
    labelEl.appendChild(document.createTextNode(todo.todo));

    checkboxDiv.appendChild(labelEl);
    viewDivEl.appendChild(checkboxDiv);
    liEl.appendChild(viewDivEl);
    return liEl;
}

document.querySelector("#main").appendChild(ul);
$("$new-todo").on("keydown")
document.querySelector("#new-todo").addEventListener("keydown",function(evt){
    if(evt.keyCode === 13){
        var newTodo = evt.target.value;
        if(!!newTodo) {
            var newTodo = { todo : newTodo, done : false };
            ul.appendChild(createTodoEl(newTodo));

            $.post('add', newTodo, function(res){
                console.log(res);
            },"json");
            evt.target.value = "";
            $.material.init();
        }
        evt.preventDefault();
    }
});

$.get("todos")
    .success(function(res){
        var todos = JSON.parse(res);
        todos.map(createTodoEl).forEach(function(el){
            ul.appendChild(el);
        });
        $.material.init();
    });
//document.querySelector("header").addEventListener("click",function(evt){
//    var target = evt.target;
//    if(evt.target.id === "add-todo"){
//        console.log("button clicked!");
//    } else if(evt.target.id === "submit-btn"){
//        //evt.preventDefault();
//        console.log("submit button clicked!");
//    } else{
//        console.log("something other clicked!");
//    }
//});

