angular.module("todoApp")
    .service("todoService",function TodoService($http){
        this.getTodos = function(){
            return $http.get("todos");
        };
        this.addTodo = function(todoText){
            return $http.post('add',{
                todo : todoText,
                done : false
            });
        };
    });