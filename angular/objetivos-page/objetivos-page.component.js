'use strict';

angular.
    module('objetivosPage').
        component('objetivosPage', {
            templateUrl: '../angular/objetivos-page/objetivos-page.html',
            controller: function ObjetivosPageController($scope, $window){                
                
                // Funciones del controller
                $scope.onSelectObjetivo = onSelectObjetivo;
                $scope.createObjetivo = createObjetivo;
                $scope.updateObjetivo = updateObjetivo;
                $scope.deleteObjetivo = deleteObjetivo;

                // Variables del controller
                var controllerName = "OBJETIVOS-PAGE-CONTROLLER -> ";
                $scope.selectedObjetivo = null;


                function onSelectObjetivo(value){
                    $window.$window.console.log(controllerName + "onSelectObjetivo(value)");
                    $scope.selectedObjetivo = value;
                }

                function createObjetivo(){
                    $window.$window.console.log(controllerName + "createObjetivo()");
                    $window.alert("CREAR OBJETIVO");
                }

                function updateObjetivo(){
                    $window.$window.console.log(controllerName + "updateObjetivo()");
                    $window.alert("UPDATE OBJETVIO " + $scope.selectedObjetivo.name);
                }

                function deleteObjetivo(){
                    $window.$window.console.log(controllerName + "deleteObjetivo()");
                    $window.alert("ELIMINAR OBJETIVO: " + $scope.selectedObjetivo.name);
                }
            }
        });