'use strict',

angular.
    module('objetivosPage').
        component('objetivosPage', {
            templateUrl: '../angular/objetivos-page/objetivos-page.html',
            controller: function ObjetivosPageController($scope, $window, $uibModal, Objetivo){                
                var controllerName = "OBJETIVOS-PAGE-CONTROLLER -> ";

                //HTTP REST REQUEST-RESPONSE
                console.log("Objetivos: GET ");
               
            
                //CRUD
                $scope.createObjetivo = createObjetivo;
                $scope.updateObjetivo = updateObjetivo;
                $scope.deleteObjetivo = deleteObjetivo;
                $scope.addIndicadoresAfectantes = addIndicadoresAfectantes;
                
                //AJAX
                $scope.cargarObjetivos = cargarObjetivos;

                //Otras
                $scope.onSelectObjetivo = onSelectObjetivo;

                
                cargarObjetivos();

                // Variables del controller
                
                this.$onInit = function() {
                    cargarObjetivos();
                    $scope.objetivoSeleccionado = {
                        "descripcion" : "Descripción del objetivo seleccionado..."
                    };
                };

                function onSelectObjetivo(value){
                    $scope.objetivoSeleccionado = value;
/*                    console.log("laaaaa cambiooo : " + $scope.objetivoSeleccionado);*/
                }
                
                //CREATE OBJETIVO
                function createObjetivo(){
                    var modalInstance = $uibModal.open({
                      animation: true,
                      component: 'modalCrearObjetivo'
                    });

                    modalInstance.result.then(function (obj) {
                      Objetivo.save(obj, function(objetivo_creado){
                          $scope.objetivos.push(objetivo_creado);
                          alert("Objetivo creado exitosamente");
                      })
                    }, function () {
                      $window.console.log('modal-component dismissed at: ' + new Date());
                    });
                }

                //UPDATE OBJETIVO
                function updateObjetivo(){
                    var modalInstance = $uibModal.open({
                        animation: true,
                        component: 'modalModificarObjetivo',
                        resolve: {
                          obj: function () {
                            return $scope.objetivoSeleccionado;
                          }
                        }
                    });
  
                    modalInstance.result.then(function (obj) {
                        Objetivo.update(obj, function(objetivo_modificado){
                            alert("Objetivo modificado exitosamente");
                            var indexOfObj = $scope.objetivos.findIndex(i => i.id === objetivo_modificado.id);
                            $scope.objetivos.splice(indexOfObj, 1, objetivo_modificado);
                        });
                    }, function () {
                        $window.console.log('modal-component dismissed at: ' + new Date());
                    });
                }
                
                //DELETE OBJETIVO
                function deleteObjetivo(){
                    Objetivo.delete({idObjetivo: $scope.objetivoSeleccionado.id}, function(response) {
                        alert("Objetivo eliminado exitosamente");
                        var indexOfObj = $scope.objetivos.findIndex(i => i.id === $scope.objetivoSeleccionado.id);
                        $scope.objetivos.splice(indexOfObj, 1);
                    });
                }

                //ADD INDICADOR AFECTANTE
                function addIndicadoresAfectantes(indicadores){
                    angular.forEach(indicadores, function(i) {
                        console.log(i);
                      });
                }

                //AJAX
                function cargarObjetivos(){
                    Objetivo.query(function(objetivos){
                        delete objetivos.$promise;
                        delete objetivos.$resolved;
                        $scope.objetivos = objetivos;
                        console.log($scope.objetivos);
                    });
                }
            }
        });



angular.
    module('objetivosPage').
        component('modalCrearObjetivo', {
            templateUrl: '../angular/objetivos-page/objetivos-page-modals/crear-objetivo.modal.html',
            bindings: {
              close: '&',
              dismiss: '&'
            },
            controller: function ($window) {
              var $ctrl = this;

              $ctrl.objetivoForm = {
                  nombre: "",
                  descripcion: ""
              };

              $ctrl.ok = function () {
                $ctrl.close({$value: $ctrl.objetivoForm});
              };

              $ctrl.cancel = function () {
                $ctrl.dismiss({$value: 'cancel'});
              };
            }
    });

angular.
    module('objetivosPage').
        component('modalModificarObjetivo', {
            templateUrl: '../angular/objetivos-page/objetivos-page-modals/modificar-objetivo.modal.html',
            bindings: {
              resolve: '<',
              close: '&',
              dismiss: '&'
            },
            controller: function ($window) {
              var $ctrl = this;

              $ctrl.$onInit = function () {
                $ctrl.objetivoForm = $ctrl.resolve.obj;
              };

              $ctrl.objetivoForm = {
                  nombre: "",
                  descripcion: ""
              };

              $ctrl.ok = function () {
                $ctrl.close({$value: $ctrl.objetivoForm});
              };

              $ctrl.cancel = function () {
                $ctrl.dismiss({$value: 'cancel'});
              };
            }
    });