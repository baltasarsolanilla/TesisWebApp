'use strict';

angular.
    module('estrategiasPage').
        component('estrategiasPage', {
            templateUrl: '../angular/estrategias-page/estrategias-page.html',
            controller: function PerspectivasPageController($scope, $window){
        
                // FuncIones de controler

                $scope.createEstrategia = createEstrategia;
                $scope.updateEstrategia = updateEstrategia;
                $scope.deleteEstrategia = deleteEstrategia;

                $scope.onSelectEstrategia = onSelectEstrategia;

                // Variables de controller
                var controllerName = "ESTRATEGIAS-PAGE-CONTROLLER ->";
                $scope.mision = "Elit reprehenderit aliquip magna culpa. Duis irure sit ex officia sunt adipisicing magna. Ex incididunt sunt sint ut duis exercitation enim anim. Pariatur magna id deserunt commodo laborum ad laborum. Irure incididunt qui officia ut ea amet et eu pariatur est adipisicing occaecat. Voluptate deserunt sint eu mollit laboris dolor id fugiat pariatur ut non commodo. Eiusmod consectetur dolore sunt sunt enim nulla sunt ad aute nostrud laborum tempor ad officia."
                $scope.vision = "Commodo tempor nulla incididunt proident velit ea est proident aliqua fugiat magna irure nostrud pariatur. Duis do ad esse nisi culpa. Qui est incididunt aliquip magna ullamco ipsum Lorem. Magna minim aliquip cillum ea in ut labore ipsum laborum amet aute proident nulla eu. Nisi ex nostrud aliquip deserunt."
                $scope.selectedEstrategia = null;
                        

                function onSelectEstrategia(value){
                    $window.console.log(controllerName + "onSelectEstrategia(value");
                    $scope.selectedEstrategia = value;
                }


                function createEstrategia(){
                    $window.console.log(controllerName + "createEstrategia()");
                    $window.alert("Agregar plan estrategico");
                }

                function updateEstrategia(){
                    $window.console.log(controllerName + "updateEstrategia()");
                    $window.alert("Modificar plan estrategico");
                }

                function deleteEstrategia(){
                    $window.console.log(controllerName + "deleteEstrategia()");
                    $window.alert("Eliminar plan estrategico");
                }
            }
        });