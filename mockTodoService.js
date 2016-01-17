angular.module("todoApp")
.factory("todoService",function($q,$timeout){
    var todos = [{ todo: "A", done: false}];

    return {
        getTodos : function(){
            var defer = $q.defer();
            var promise = defer.promise;
            $timeout(function(){
                defer.resolve({data:todos});
            },100);
            return promise;
        },
        addTodo : function(newText){
            var defer = $q.defer();
            var promise = defer.promise;

            $timeout(function(){
                todos.push({
                    todo : newText,
                    done : false
                });
            },100);

            return promise;
        }
    }
});