angular.module("todoApp", ['dongseo'])
    .controller("mainCtrl",function($scope, $http){
        $scope.appName = "TODO APP";
        $scope.todos = [];
        $scope.zoom = 15;
        $scope.cordis = [
            {
                name : "동서대",
                cordi:[35.143950, 129.010616]
            },
            {
                name : "부산역",
                cordi:[35.114909, 129.041324]
            }
        ];
        $scope.selectedCordi = $scope.cordis[0];
        $scope.getTodos = function(){
            $http.get("todos")
                .success(function(data){
                    $scope.todos = data;
                    console.log(data);
                });
        };

        $scope.addTodo = function(todoText){
            $http.post('add',{
                todo : todoText,
                done : false
            }).success(function(data){
                $scope.getTodos();
            });
        };

        $scope.remain = function(){
            return $scope.todos.reduce(function(p,todo){
                if(todo.done === false) return ++p;
                else return p;
            },0);
        }
    });
