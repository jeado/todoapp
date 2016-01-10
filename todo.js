/**
 * Created by u212-pc1 on 2016. 1. 10..
 */
var todos = [
    {
        done : false,
        todo : "할일1"
    },
    {
        done : true,
        todo : "할일2"
    },
    {
        done : false,
        todo : "할일3"
    }
];

var ul = document.createElement("ul");
ul.className = "list-group";

todos.map(createTodoEl).forEach(function(el){
    ul.appendChild(el);
});

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