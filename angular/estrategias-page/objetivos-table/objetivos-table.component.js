'use strict',
'use strict',

angular.
    module('objetivosTable').
        component('objetivosTable', {
            templateUrl: '../angular/estrategias-page/objetivos-table/objetivos-table.html',
            bindings: {
              data: '<',
              addObjetivos: '&',
              deleteObjetivos: '&'
            },
            controller: function ObjetivosTableController($scope, $window, NgTableParams){
              
              var objetivosFAKE = [
                {
                  id:"1",
                  nombre:"o1",
                },
                {
                  id:"2",
                  nombre:"o2",
                }
              ];

               
              // Funciones de controller
              $scope.add = add;
              $scope.del = del;
              $scope.hasChanges = hasChanges;
              $scope.cancelChanges = cancelChanges;
              $scope.saveChanges = saveChanges;

              // Variables de controller
              var controllerName = "OBJETIVOS-TABLE-CONTROLLER -> ";
              var originalData = [];
              var listaObjetivosAgregados = [];
              var listaObjetivosEliminados = [];
              

              this.$onInit = function() {
                if ($scope.$ctrl.data == undefined)
                  originalData = objetivosFAKE;
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
                  console.log(this);
                }
              };

              //Esta funcion recarga el dataset con los indicadoresAfecantes del objetivo seleccionado
              function changeDataTable(data){
                originalData = data;
                $scope.tableParams.settings({
                  dataset: angular.copy(originalData)
                });
                $scope.tableParams.reload();
              }

              var id = '9999';
              function add() {
                $scope.isEditing = true;
                $scope.isRowAdded = true;
                $scope.tableParams.settings().dataset.unshift({
                  id: id++, 
                  name: $scope.selectedObjetivo.name
                });


                listaObjetivosAgregados.push(nuevo_objetivo);
                // we need to ensure the user sees the new row we've just added.
                // it seems a poor but reliable choice to remove sorting and move them to the first page
                // where we know that our new item was added to
                $scope.tableParams.sorting({});
                $scope.tableParams.page(1);
                $scope.tableParams.reload();
              }
          
              function del(row) {
                $window.console.log(controllerName + "del(row)");
                console.log(row);
                $scope.isRowDeleted = true;
                _.remove($scope.tableParams.settings().dataset, function(item) {
                  return row === item;
                });

                listaObjetivosEliminados.push(row);

                $scope.tableParams.reload().then(function(data) {
                  if (data.length === 0 && $scope.tableParams.total() > 0) {
                    $scope.tableParams.page($scope.tableParams.page() - 1);
                    $scope.tableParams.reload();
                  }
                });
              }
          
              function hasChanges() {
                return $scope.isRowDeleted || $scope.isRowAdded;
              }
          
              function resetTableStatus() {
                $scope.isEditing = false;
                $scope.isRowAdded = false;
                $scope.isRowDeleted = false;
                listaObjetivosAgregados = [];
                listaObjetivosEliminados = [];
              }
          
              function cancelChanges() {
                resetTableStatus();
                $scope.tableParams.settings({
                  dataset: angular.copy(originalData)
                });
              }
          
              function saveChanges() {
                if ($scope.isRowAdded){
                  $scope.$ctrl.addObjetivos({objetivos: listaObjetivosAgregados});
                }

                if ($scope.isRowDeleted){
                  console.log("---------------------------------------------")
                  $scope.$ctrl.deleteObjetivos({objetivos: listaObjetivosEliminados});
                }

                resetTableStatus();
                originalData = angular.copy($scope.tableParams.settings().dataset);
                $scope.tableParams.reload();
              }
              
          
          }
      });