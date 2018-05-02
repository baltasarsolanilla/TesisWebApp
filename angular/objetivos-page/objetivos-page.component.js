'use strict',

angular.
    module('objetivosPage').
        component('objetivosPage', {
            templateUrl: '../angular/objetivos-page/objetivos-page.html',
            controller: function ObjetivosPageController($scope, $window, $uibModal){                
                
                // Funciones del controller
                $scope.onSelectObjetivo = onSelectObjetivo;
                $scope.createObjetivo = createObjetivo;
                $scope.updateObjetivo = updateObjetivo;
                $scope.deleteObjetivo = deleteObjetivo;

                // Variables del controller
                var controllerName = "OBJETIVOS-PAGE-CONTROLLER -> ";
                $scope.selectedObjetivo = null;


                function onSelectObjetivo(value){
                    $window.console.log(controllerName + "onSelectObjetivo(value)");
                    $scope.selectedObjetivo = value;
                }
                
                function createObjetivo(){
                    $window.console.log(controllerName + "createObjetivo()");
                    var modalInstance = $uibModal.open({
                      animation: true,
                      component: 'modalComponentObjetivo'
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

                function updateObjetivo(){
                    $window.console.log(controllerName + "updateObjetivo()");
                    $window.alert("UPDATE OBJETVIO " + $scope.selectedObjetivo.name);
                }

                function deleteObjetivo(){
                    $window.console.log(controllerName + "deleteObjetivo()");
                    $window.alert("ELIMINAR OBJETIVO: " + $scope.selectedObjetivo.name);
                }
            }
        });



angular.
    module('objetivosPage').
        component('modalComponentObjetivo', {
            templateUrl: '../angular/shared-components/modal-form/modal-form.modal.html',
            bindings: {
              // resolve: '<',
              close: '&',
              dismiss: '&'
            },
            controller: function ($window) {
              var $ctrl = this;
              var controllerName = "OBJETIVO-PAGE-MODAL -> ";

              $ctrl.$onInit = function () {
                $window.console.log(controllerName + "onInit()");
                // $ctrl.items = $ctrl.resolve.items;
                // $ctrl.selected = {
                //   item: $ctrl.items[0]
                // };
              };

              $ctrl.userForm = {
                  nombre: "",
                  descripcion: ""
              };

              $ctrl.ok = function () {
                $window.console.log(controllerName + "ok()");
                $ctrl.close({$value: $ctrl.userForm});
              };

              $ctrl.cancel = function () {
                $ctrl.dismiss({$value: 'cancel'});
              };
            }
    });