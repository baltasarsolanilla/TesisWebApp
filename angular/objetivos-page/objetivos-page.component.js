'use strict';

angular.
    module('objetivosPage').
        component('objetivosPage', {
            templateUrl: '../angular/objetivos-page/objetivos-page.html',
            controller: function PerspectivaObjetivosTableController($scope){                
                // $scope.simpleList = [{"id":1,"name":"Nissim","age":41,"money":454},{"id":2,"name":"Mariko","age":10,"money":-100},{"id":3,"name":"Mark","age":39,"money":291},{"id":4,"name":"Allen","age":85,"money":871},{"id":5,"name":"Dustin","age":10,"money":378},{"id":6,"name":"Macon","age":9,"money":128}];
                
                $scope.onSelect = onSelect;
                $scope.createObjetivo = createObjetivo;
                $scope.updateObjetivo = updateObjetivo;
                $scope.deleteObjetivo = deleteObjetivo;

                function onSelect(value){
                    console.log("objetivos-page -- onSelect");
                    $scope.objetivoSelected = value;
                }

                function createObjetivo(){
                    alert("CREAR OBJETIVO");
                }

                function updateObjetivo(){
                    alert("UPDATE OBJETVIO " + $scope.objetivoSelected.name);
                }

                function deleteObjetivo(){
                    alert("ELIMINAR OBJETIVO: " + $scope.objetivoSelected.name);
                }
            }
        });