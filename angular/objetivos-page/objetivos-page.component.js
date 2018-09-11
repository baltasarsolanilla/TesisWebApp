'use strict',

angular.
    module('objetivosPage').
        component('objetivosPage', {
            templateUrl: '../angular/objetivos-page/objetivos-page.html',
            controller: function ObjetivosPageController($scope, $window, $uibModal, Objetivo){                
                
                //HTTP REST REQUEST-RESPONSE
                console.log("Objetivos: GET ");
                $scope.objetivos = Objetivo.query(function(objetivos){
                    objetivos.forEach(element => {
                        console.log(element.nombre);    
                    });
                    console.log($scope.objetivos);                  
                });
                
                
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

                    modalInstance.result.then(function (new_objetivo) {
                      $window.console.log(new_objetivo);
                      Objetivo.save(new_objetivo, function(response){
                          console.log("Response de SAVE NEW OBJETIVO --> " + response);
                      })
                    }, function () {
                      $window.console.log('modal-component dismissed at: ' + new Date());
                    });
                }

                function updateObjetivo(){
                    $window.console.log(controllerName + "updateObjetivo()");
                    $window.alert("UPDATE OBJETVIO " + $scope.selectedObjetivo.id);
                    var obj = Objetivo.get({idObjetivo: $scope.selectedObjetivo.id});
                    obj.$promise.then(function(){
                        obj.nombre = "HELLO, WORLD";
                        Objetivo.update(obj, function(response){
                            console.log("Response de UPDATE OBJETIVO --> ");
                            console.log(response)
                        });
                    });
                }

                function deleteObjetivo(){
                    $window.console.log(controllerName + "deleteObjetivo()");
                    $window.alert("ELIMINAR OBJETIVO: " + $scope.selectedObjetivo.id);
                    Objetivo.delete({idObjetivo: $scope.selectedObjetivo.id}, function(response) {
                        console.log("Response de DELETE OBJETIVO --> ");
                        console.log(response);
                    });
                }
            }
        });



angular.
    module('objetivosPage').
        component('modalComponentObjetivo', {
            templateUrl: '../angular/shared-components/modal-form/modal-form-objetivo.modal.html',
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

              $ctrl.objetivoForm = {
                  nombre: "",
                  descripcion: ""
              };

              $ctrl.ok = function () {
                $window.console.log(controllerName + "ok()");
                $ctrl.close({$value: $ctrl.objetivoForm});
              };

              $ctrl.cancel = function () {
                $ctrl.dismiss({$value: 'cancel'});
              };
            }
    });