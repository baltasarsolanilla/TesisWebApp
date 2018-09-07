'use strict',

angular.
    module('indicadoresPage').
        component('indicadoresPage', {
            templateUrl: '../angular/indicadores-page/indicadores-page.html',
            controller: function ObjetivosPageController($scope, $window, $uibModal, Indicador){
                var controllerName = "INDICADOR-PAGE-CONTROLLER -> ";
                
                //HTTP REST REQUEST-RESPONSE
                $window.console.log("Indicadores: GET ");
                $scope.indicadores3 = Indicador.query(function(indicadores){
                    indicadores.forEach(element => {
                        $window.console.log(element.nombre);    
                    });
                    $window.console.log($scope.indicadores3);                  
                });             
               
                $scope.createIndicador = createIndicador;
                $scope.updateIndicador = updateIndicador;
                $scope.deleteIndicador = deleteIndicador;
                $scope.updateSelectedIndicador = updateSelectedIndicador;
                $scope.selectedIndicador = null;

                function updateSelectedIndicador(idIndicador){
                    $window.console.log(controllerName + "updateSelectedIndicador()");
                    $scope.selectedIndicador = idIndicador;

                }

                function updateIndicador(){
                    $window.console.log(controllerName + "updateIndicador()");
                    $window.alert("Modificar indicador con id: " + $scope.selectedIndicador);
                }

                function deleteIndicador(){
                    $window.console.log(controllerName + "deleteIndicador()");
                    $window.alert("Eliminar indicador con id: " + $scope.selectedIndicador);
                }

                function createIndicador(){
                    $window.console.log(controllerName + "createIndicador()");
                    var modalInstance = $uibModal.open({
                      animation: true,
                      component: 'modalComponentIndicador'
                      // resolve: {
                      //   items: function () {
                      //     return $ctrl.items;
                      //   }
                      // }
                    });

                    modalInstance.result.then(function (userForm) {
                      $window.console.log('ok');
                      $window.console.log(userForm);
                    }, function () {
                      $window.console.log('modal-component dismissed at: ' + new Date());
                    });
                }
            }
        });
angular.
    module('indicadoresPage').
        component('modalComponentIndicador', {
            templateUrl: '../angular/shared-components/modal-form/modal-form-indicador.modal.html',
            bindings: {
                // resolve: '<',
                close: '&',
                dismiss: '&'
            },
            controller: function ($window) {
                var $ctrl = this;
                var controllerName = "INDICADOR-PAGE-MODAL -> ";

                $ctrl.$onInit = function () {
                $window.console.log(controllerName + "onInit()");
                // $ctrl.items = $ctrl.resolve.items;
                // $ctrl.selected = {
                //   item: $ctrl.items[0]
                // };
                };

                $ctrl.indicadorForm = {
                    nombre: "",
                    valor: ""
                };

                $ctrl.ok = function () {
                $window.console.log(controllerName + "ok()");
                $ctrl.close({$value: $ctrl.indicadorForm});
                };

                $ctrl.cancel = function () {
                $ctrl.dismiss({$value: 'cancel'});
                };
            }
    });