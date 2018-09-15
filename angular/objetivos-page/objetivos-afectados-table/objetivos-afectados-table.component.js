'use strict',

angular.
    module('objetivosAfectadosTable').
        component('objetivosAfectadosTable', {
            templateUrl: '../angular/objetivos-page/objetivos-afectados-table/objetivos-afectados-table.html',
            bindings: {
              id: '<'
            },
            controller: function ObjetivosAfectadosTableController($scope, $window, NgTableParams){
              var controllerName = "OBJETIVOS-AFECTADOS-TABLE-CONTROLLER -> ";

              var simpleList = [{"id":1,"nombre":"Nissim","peso":12.5},
                                {"id":2,"nombre":"Marico","peso":12.5},
                                {"id":3,"nombre":"Mark","peso":25},
                                {"id":4,"nombre":"Allen","peso":25}];

              var simpleList2 =[{"id":1,"nombre":"Macon","peso":5},
                                {"id":2,"nombre":"Griselda","peso":15},
                                {"id":3,"nombre":"Marcelo","peso":30},
                                {"id":4,"nombre":"John","peso":50},
                                {"id":5,"nombre":"Kel","peso":12.5}];
                                
              var originalData = angular.copy(simpleList);

              // this.$onInit = function() {
              //   var originalData = $scope.data;
              // };

              $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10 // count per page
                }, {
                counts: [],
                dataset: angular.copy(simpleList)
              });

              // Funciones del controller
              $scope.add = add;
              $scope.del = del;
              $scope.hasChanges = hasChanges;
              $scope.cancelChanges = cancelChanges;
              $scope.saveChanges = saveChanges;

              $scope.onSelectObjetivo = onSelectObjetivo;
              $scope.onSelectPeso = onSelectPeso;
              $scope.changeDataset = 0;

              // Variables del controller
              $scope.objetivoSeleccionado = null;
              $scope.selectedPeso = null;
              $scope.deleteCount = 0;
              
              //Carga el OBJETIVO seleccionado en el search-box.
              function onSelectObjetivo(value){
                $window.console.log(controllerName + "onSelectObjetivo(value)");
                $scope.objetivoSeleccionado = value;
              }

              //Carga el PESO seleccionado en el search-box.
              function onSelectPeso(value){
                $window.console.log(controllerName + "onSelectPeso(value)");
                $scope.selectedPeso = value;
              }

              //Funcion de prueba para switchear de datset.
              $scope.change = true;
              function changeDataset(idObjetivo){
                $window.console.log(controllerName + "changeDataset(idObjetivo)")
                if ($scope.change)
                  $scope.tableParams.settings({
                    dataset: angular.copy(originalData)
                  });
                else
                  $scope.tableParams.settings({
                    dataset: angular.copy(simpleList2)
                  });
                $scope.change = ! $scope.change;
                $scope.tableParams.reload();
              }

              this.$onChanges = function(changes){
                $window.console.log(controllerName + "onChanges(changes)");
                if (changes.id){
                  $scope.changeDataset = changes.id.currentValue;
                  changeDataset(changes.id.currentValue);
                }
              }

              var id = '100';
              function add() {
                $window.console.log(controllerName + "add()");
                $scope.isEditing = true;
                $scope.isRowAdded = true;
                $scope.tableParams.settings().dataset.unshift({
                  id: id++, 
                  nombre: $scope.objetivoSeleccionado.nombre,
                  peso: $scope.selectedPeso.nombre
                });
                // we need to ensure the user sees the new row we've just added.
                // it seems a poor but reliable choice to remove sorting and move them to the first page
                // where we know that our new item was added to
                $scope.tableParams.sorting({});
                $scope.tableParams.page(1);
                $scope.tableParams.reload();
              }
          
              function del(row) {
                $window.console.log(controllerName + "del(row)");
                _.remove($scope.tableParams.settings().dataset, function(item) {
                  return row === item;
                });
                $scope.deleteCount++;
                $scope.tableParams.reload().then(function(data) {
                  if (data.length === 0 && $scope.tableParams.total() > 0) {
                    $scope.tableParams.page($scope.tableParams.page() - 1);
                    $scope.tableParams.reload();
                  }
                });
              }
          
              function hasChanges() {
                $window.console.log(controllerName + "hasChanges()");
                return $scope.deleteCount > 0 || $scope.isRowAdded;
              }
          
              function resetTableStatus() {
                $window.console.log(controllerName + "resetTableStatus()");
                $scope.isEditing = false;
                $scope.isRowAdded = false;
                $scope.deleteCount = 0;
              }
          
              function cancelChanges() {
                $window.console.log(controllerName + "cancelChanges()");
                resetTableStatus();
                var currentPage = $scope.tableParams.page();
                $scope.tableParams.settings({
                  dataset: angular.copy(originalData)
                });
              }
          
              function saveChanges() {
                $window.console.log(controllerName + "saveChanges()");
                resetTableStatus();
                var currentPage = $scope.tableParams.page();
                originalData = angular.copy($scope.tableParams.settings().dataset);
              }
          }
      });
