angular.module("todoApp", ['dongseo'])
    .constant('ZOOM', 15)
    .config(['TestProvider','todoServiceProvider',function(TestProvider,todoServiceProvider){
        //TestProvider.setName("jay");
        console.log(todoServiceProvider);
    }])
    .provider('Test',function(){
        var n = "test";
        this.setName = function(name){
            console.log(name);
            n = name;
        };
        this.$get = function(){
            return {
                name : n
            }
        }
    })
    .controller("mainCtrl",function($scope, $http, ZOOM, todoService, Test){
        console.log(Test);
        $scope.appName = "TODO APP";
        $scope.todos = [];
        $scope.zoom = ZOOM;
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

        todoService.getTodos()
            .then(function(data){
                $scope.todos = data.data;
            });

        $scope.addTodo = function(todoText){
            todoService.addTodo(todoText).then(function(data){
                    todoService.getTodos().then(function(data){
                        $scope.todos = data.data;
                    });
                });
        };

        $scope.remain = function(){
            return $scope.todos.reduce(function(p,todo){
                if(todo.done === false) return ++p;
                else return p;
            },0);
        }
    });
