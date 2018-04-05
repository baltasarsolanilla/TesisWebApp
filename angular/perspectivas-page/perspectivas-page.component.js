'use strict';

angular.
    module('perspectivasPage').
        component('perspectivasPage', {
            templateUrl: '../angular/perspectivas-page/perspectivas-page.html',
            controller: function PerspectivasPageController($scope){
                
                $scope.onSelectEstrategia = onSelectEstrategia;
                
                function onSelectEstrategia(value){
                    $scope.selectedEstrategia = value;
                }

                $scope.addEstrategia = addEstrategia;
                $scope.updateEstrategia = updateEstrategia;
                $scope.removeEstrategia = removeEstrategia;

                function addEstrategia(){
                    alert("Agregar plan estrategico");
                }

                function updateEstrategia(){
                    alert("Modificar plan estrategico");
                }

                function removeEstrategia(){
                    alert("Eliminar plan estrategico");
                }
            }
        });