'use strict',

angular.
    module('objetivosAfectadosTable').
        component('objetivosAfectadosTable', {
            templateUrl: '../angular/objetivos-page/objetivos-afectados-table/objetivos-afectados-table.html',
            bindings: {
              addObjetivos: '&',
              deleteObjetivos: '&',
              data: '<'             
            },
            controller: function ObjetivosAfectadosTableController($scope, NgTableParams, Objetivo){
              var controllerName = "OBJETIVOS-AFECTADOS-TABLE-CONTROLLER -> ";

              //Lista de ObjetivosAfectantes en caso de que no se seleccione un objetivo por default.
              $scope.objetivosAfectantes = [
                {
                  objetivoAfectante: {"id":1,"nombre":"Nombre 1"},
                },
                {
                  objetivoAfectante: {"id":2,"nombre":"Nombre 2"},
                },
                {
                  objetivoAfectante: {"id":3,"nombre":"Nombre 3"},
                }
              ];

              // Funciones del controller
              $scope.add = add;
              $scope.del = del;
              $scope.hasChanges = hasChanges;
              $scope.cancelChanges = cancelChanges;
              $scope.saveChanges = saveChanges;

              $scope.onSelectObjetivo = onSelectObjetivo;

              // Variables del controller
              $scope.objetivoSeleccionado = null;
              $scope.deleteCount = 0;
              var originalData = [];
              var listaObjetivosEliminados = [];
              var listaObjetivosAgregados = [];


              //AJAX
              $scope.cargarObjetivos = cargarObjetivos;

              this.$onInit = function() {
                cargarObjetivos();
                originalData = $scope.objetivosAfectantes;
                $scope.tableParams = new NgTableParams({
                  page: 1, // show first page
                  count: 10 // count per page
                  }, {
                  counts: [],
                  dataset: angular.copy(originalData)
                });
              };

              this.$onChanges = function(changes){
                if (changes.data.currentValue){
                  changeDataTable(changes.data.currentValue);
                }
              };

              //Esta funcion recarga el dataset con los objetivosAfecantes del objetivo seleccionado
              function changeDataTable(data){
                originalData = data;
                $scope.tableParams.settings({
                  dataset: angular.copy(originalData)
                });
                $scope.tableParams.reload();
              }

              //Carga el OBJETIVO seleccionado en el search-box.
              function onSelectObjetivo(value){
                $scope.objetivoSeleccionado = value;
              }

              function add() {
                if ($scope.tableParams.settings().dataset.findIndex(i => i.objetivoAfectante.id === $scope.objetivoSeleccionado.id) > -1){
                  alert("Objetivo afectante duplicado");
                  return;
                }

                $scope.isEditing = true;
                $scope.isRowAdded = true;
                
                var objetivoAgregado = {
                  objetivoAfectante: $scope.objetivoSeleccionado
                };
                listaObjetivosAgregados.push(objetivoAgregado);

                $scope.tableParams.settings().dataset.unshift(objetivoAgregado);
                // we need to ensure the user sees the new row we've just added.
                // it seems a poor but reliable choice to remove sorting and move them to the first page
                // where we know that our new item was added to
                $scope.tableParams.sorting({});
                $scope.tableParams.page(1);
                $scope.tableParams.reload();
              }                

              function del(row) {
                listaObjetivosEliminados.push(row);
                _.remove($scope.tableParams.settings().dataset, function(item) {
                  return row === item;
                });
                $scope.deleteCount++;
              
                //Refresco la tabla de objetivos afectantes
                $scope.tableParams.reload().then(function(data) {
                  if (data.length === 0 && $scope.tableParams.total() > 0) {
                    $scope.tableParams.page($scope.tableParams.page() - 1);
                    $scope.tableParams.reload();
                  }
                });
              }
          
              function hasChanges() {
                return $scope.deleteCount > 0 || $scope.isRowAdded;
              }
          
              function resetTableStatus() {
                $scope.isEditing = false;
                $scope.isRowAdded = false;
                $scope.deleteCount = 0;
                listaObjetivosAgregados = [];
                listaObjetivosEliminados = [];
              }

              function cancelChanges() {
                resetTableStatus();
                var currentPage = $scope.tableParams.page();
                $scope.tableParams.settings({
                  dataset: angular.copy(originalData)
                });
              }

              function saveChanges() {
                if ($scope.deleteCount > 0)
                  $scope.$ctrl.deleteObjetivos({objetivos: listaObjetivosEliminados});
                if ($scope.isRowAdded)
                  $scope.$ctrl.addObjetivos({objetivos: listaObjetivosAgregados});
                
                resetTableStatus();
                var currentPage = $scope.tableParams.page();
                originalData = angular.copy($scope.tableParams.settings().dataset);
              }

              //AJAX
              function cargarObjetivos(){
                Objetivo.query(function(objetivos){
                  delete objetivos.$promise;
                  delete objetivos.$resolved;
                  $scope.objetivos = objetivos;
                });
              }
          }
      });
