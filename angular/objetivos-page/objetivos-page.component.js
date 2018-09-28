'use strict',

angular.
    module('objetivosPage').
        component('objetivosPage', {
            templateUrl: '../angular/objetivos-page/objetivos-page.html',
            controller: function ObjetivosPageController($scope, $window, $uibModal, Objetivo){                
                var controllerName = "OBJETIVOS-PAGE-CONTROLLER -> ";            
            
                //CRUD
                $scope.createObjetivo = createObjetivo;
                $scope.updateObjetivo = updateObjetivo;
                $scope.deleteObjetivo = deleteObjetivo;
                $scope.addIndicadoresAfectantes = addIndicadoresAfectantes;
                $scope.deleteIndicadoresAfectantes = deleteIndicadoresAfectantes;
                $scope.addObjetivosAfectantes = addObjetivosAfectantes;
                $scope.deleteObjetivosAfectantes = deleteObjetivosAfectantes;

                
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
                      });
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
                        var indexOfObj = $scope.objetivos.findIndex(i => i.id === $scope.objetivoSeleccionado.id);
                        $scope.objetivos.splice(indexOfObj, 1);
                        alert("Objetivo eliminado exitosamente");
                        $window.location.reload();
                    });
                }

                //ADD INDICADOR AFECTANTE
                function addIndicadoresAfectantes(indicadores){
                    angular.forEach(indicadores, function(i) {
                        addSingleIndicadorAfectante(i);
                      });
                }

                function addSingleIndicadorAfectante(indicadorPeso){
                    var ixp = {
                        idIndicador: indicadorPeso.indicador.id,
                        peso: indicadorPeso.peso
                    };
                    Objetivo.addIndicadorAfectante({idObjetivo: $scope.objetivoSeleccionado.id}, ixp, function(response){
                        alert("Indicador afectante relacionado exitosamente");
                        console.log(response);
                    });
                }

                function deleteIndicadoresAfectantes(indicadores){
                    angular.forEach(indicadores, function(i) {
                        deleteSingleIndicadorAfectante(i);
                      });
                }

                function deleteSingleIndicadorAfectante(indicadorPeso){
                    var i = {
                        id: indicadorPeso.indicador.id,
                    };
                    Objetivo.deleteIndicadorAfectante({idObjetivo: $scope.objetivoSeleccionado.id}, i, function(response){
                        alert("Indicador afectante eliminado exitosamente");
                        console.log(response);
                    });
                }

                function addObjetivosAfectantes(objetivos){
                    angular.forEach(objetivos, function(i) {
                        addSingleObjetivoAfectante(i);
                      });
                }

                function addSingleObjetivoAfectante(objetivo){
                    var o = {
                        id: objetivo.objetivoAfectante.id,
                    };
                    Objetivo.addObjetivoAfectante({idObjetivo: $scope.objetivoSeleccionado.id}, o, function(response){
                        alert("Objetivo afectante relacionado exitosamente");
                        console.log(response);
                    });
                }

                function deleteObjetivosAfectantes(objetivos){
                    angular.forEach(objetivos, function(i) {
                        deleteSingleObjetivoAfectante(i);
                      });
                }

                
                function deleteSingleObjetivoAfectante(objetivo){
                    var o = {
                        id: objetivo.objetivoAfectante.id,
                    };
                    Objetivo.deleteObjetivoAfectante({idObjetivo: $scope.objetivoSeleccionado.id}, o, function(response){
                        alert("Objetivo afectante eliminado exitosamente");
                        console.log(response);
                    });
                }

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