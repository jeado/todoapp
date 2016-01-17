/**
 * Created by u212-pc1 on 2016. 1. 17..
 */
angular.module('dongseo',[])
    .directive('gMap',['$timeout',function($timeout){
        return {
            restrict:"EA",
            scope :{
              zoom : "=",
              center : "="
            },
            link: function (scope,iEl,iAttr) {
                var el = document.createElement('div');
                el.style.width = "100%";
                el.style.height = "600px";
                iEl.prepend(el);

                var map = new google.maps.Map(el, {
                    center: {lat: scope.center[0], lng: scope.center[1]},
                    zoom: 15
                });

                scope.$watch('zoom',function(value){
                    if(value === "") map.setZoom(15);
                    else map.setZoom(Number(value));
                });

                scope.$watch('center',function(value){
                    map.setCenter({lat: value[0], lng: value[1]});
                });

                $timeout(function(){
                    google.maps.event.trigger(map,"resize");
                },100);
            }
        }
    }]);

