/**
 * Created by u212-pc1 on 2016. 1. 16..
 */
angular.module("dongseo",[])
    .directive("hello",function(){
        return {
            restrict : "EA",
            link : function(scope, iEl, iAtt){
                $(iEl).html("<h1>hello directive</h1>");
            }
        };
    });