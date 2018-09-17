'use strict',

angular.
    module('indicadoresPage').
        component('indicadoresPage', {
            templateUrl: '../angular/indicadores-page/indicadores-page.html',
            controller: function ObjetivosPageController($scope, $window, $uibModal, Indicador){
                var controllerName = "INDICADOR-PAGE-CONTROLLER -> ";  
               
                $scope.createIndicador = createIndicador;
                $scope.updateIndicador = updateIndicador;
                $scope.deleteIndicador = deleteIndicador;
                $scope.onSelectIndicador = onSelectIndicador;
                $scope.selectedIndicador = null;

                this.$onInit = function(){
                    cargarIndicadores();
                }

                function onSelectIndicador(indicador){
                    $scope.selectedIndicador = indicador;

                }

                function updateIndicador(){
                    $window.alert("Modificar indicador con id: " + $scope.selectedIndicador.nombre);
                }

                function deleteIndicador(){
                    $window.alert("Eliminar indicador con id: " + $scope.selectedIndicador.nombre);
                }

                function createIndicador(){
                    var modalInstance = $uibModal.open({
                      animation: true,
                      component: 'modalComponentIndicador'
                    });

                    modalInstance.result.then(function (indicador) {
                      Indicador.save(indicador, function(){
                          
                      })
                    }, function () {
                      $window.console.log('modal-component dismissed at: ' + new Date());
                    });
                }

                //AJAX
                function cargarIndicadores(){
                    Indicador.query(function(indicadores){
                      delete indicadores.$promise;
                      delete indicadores.$resolved;
                      $scope.indicadores = indicadores;
                      console.log($scope.indicadores);
                    });
                  }
            }
        });
angular.
    module('indicadoresPage').
        component('modalComponentIndicador', {
            templateUrl: '../angular/indicadores-page/indicadores-page-modals/crear-indicador.modal.html',
            bindings: {
                close: '&',
                dismiss: '&'
            },
            controller: function ($window) {
                var $ctrl = this;
                var controllerName = "INDICADOR-PAGE-MODAL -> ";

                $ctrl.$onInit = function () {

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