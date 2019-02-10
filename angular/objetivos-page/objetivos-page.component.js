'use strict',

angular.
    module('objetivosPage').
        component('objetivosPage', {
            templateUrl: '../angular/objetivos-page/objetivos-page.html',
            controller: function ObjetivosPageController($scope, $window, $uibModal, Objetivo, GlobalStorageFactory){                
                var controllerName = "OBJETIVOS-PAGE-CONTROLLER -> ";            
            
                //CRUD
                $scope.updateObjetivo = updateObjetivo;
                $scope.addIndicadoresAfectantes = addIndicadoresAfectantes;
                $scope.deleteIndicadoresAfectantes = deleteIndicadoresAfectantes;
                $scope.addObjetivosAfectantes = addObjetivosAfectantes;
                $scope.deleteObjetivosAfectantes = deleteObjetivosAfectantes;
                $scope.selectDefault = "FIRST";

                //Otras
                $scope.onSelectObjetivo = onSelectObjetivo;

                // Variables del controller
                
                this.$onInit = function() {
                    $scope.objetivoSeleccionado = {
                        "descripcion" : "Descripción del objetivo seleccionado..."
                    };
                };

                //Watcher para sincronizar el objetivo a modificar con la estrategia seleccionada en el menu lateral.
                $scope.$watch(function() { return GlobalStorageFactory.getEstrategia(); }, function(estrategiaSeleccionada) {
                    if (estrategiaSeleccionada != undefined) {
                        cargarObjetivos();
                    }
                });


                function onSelectObjetivo(value){
                    $scope.objetivoSeleccionado = value;
                    $scope.selectDefault = "NO_CHANGE";
                }

                //UPDATE OBJETIVO
                function updateObjetivo(){
                    var obj = {
                        id: $scope.objetivoSeleccionado.id,
                        nombre: $scope.objetivoSeleccionado.nombre,
                        descripcion: $scope.objetivoSeleccionado.descripcion
                    };
                    var modalInstance = $uibModal.open({
                        animation: true,
                        component: 'modalModificarObjetivo',
                        resolve: {
                          obj: function () {
                            return obj;
                          }
                        }
                    });
  
                    modalInstance.result.then(function (obj) {
                        Objetivo.update(obj, function(objetivo_modificado){
                            alert("Objetivo modificado exitosamente");
                            var indexOfObj = $scope.objetivos.findIndex(i => i.id === objetivo_modificado.id);
                            $scope.objetivos.splice(indexOfObj, 1, objetivo_modificado);
                            GlobalStorageFactory.setActualizarEstrategias(true);
                            GlobalStorageFactory.setAccion("UPDATE");
                        });
                    }, function () {
                        $window.console.log('modal-component dismissed at: ' + new Date());
                    });
                }
                

                //ADD INDICADOR AFECTANTE
                function addIndicadoresAfectantes(indicadores){
                    angular.forEach(indicadores, function(i) {
                        addSingleIndicadorAfectante(i);
                    });
                    GlobalStorageFactory.setActualizarEstrategias(true);
                    GlobalStorageFactory.setAccion("UPDATE");
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
                    GlobalStorageFactory.setActualizarEstrategias(true);
                    GlobalStorageFactory.setAccion("UPDATE");
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
                    GlobalStorageFactory.setActualizarEstrategias(true);
                    GlobalStorageFactory.setAccion("UPDATE");
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
                    GlobalStorageFactory.setActualizarEstrategias(true);
                    GlobalStorageFactory.setAccion("UPDATE");
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
                    var estrategia = GlobalStorageFactory.getEstrategia();
                    var perspectivas = estrategia.perspectivasAfectantes;
                    var objetivosAfectantes = [];
                    angular.forEach(perspectivas, function(p) {
                        objetivosAfectantes.push.apply(objetivosAfectantes, p.objetivosAfectantes)
                    });
                    $scope.objetivos = objetivosAfectantes;
                }
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