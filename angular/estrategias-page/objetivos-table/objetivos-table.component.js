'use strict',

angular.
    module('objetivosTable').
        component('objetivosTable', {
            templateUrl: '../angular/estrategias-page/objetivos-table/objetivos-table.html',
            bindings: {
              idPerspectiva: '<'
            },
            controller: function ObjetivosTableController($scope, $window, NgTableParams){
              var simpleList = [{"id":1,"name":"Nissim","age":41,"money":454},{"id":2,"name":"Mariko","age":10,"money":-100},{"id":3,"name":"Mark","age":39,"money":291},{"id":4,"name":"Allen","age":85,"money":871},{"id":5,"name":"Dustin","age":10,"money":378},{"id":6,"name":"Macon","age":9,"money":128}];
              var simpleList2 = [{"id":3,"name":"Mark","age":39,"money":291},{"id":4,"name":"Allen","age":85,"money":871},{"id":5,"name":"Dustin","age":10,"money":378},{"id":6,"name":"Macon","age":9,"money":128}];
              var originalData = angular.copy(simpleList);

              $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10 // count per page
                }, {
                counts: [],
                dataset: angular.copy(simpleList)
              });
              
              // Funciones de controller
              $scope.add = add;
              $scope.del = del;
              $scope.hasChanges = hasChanges;
              $scope.cancelChanges = cancelChanges;
              $scope.saveChanges = saveChanges;

              $scope.onSelectObjetivo = onSelectObjetivo;
              $scope.changeDataset = changeDataset;

              // Variables de controller
              var controllerName = "OBJETIVOS-TABLE-CONTROLLER -> ";
              $scope.deleteCount = 0;
              $scope.selectedObjetivo = null;
              
              //Carga el OBJETIVO seleccionado en el search-box.
              function onSelectObjetivo(value){
                $window.console.log(controllerName + "onSelectObjetivo(value)");
                $scope.selectedObjetivo = value;
              }

              //Esta funcion es la que va a cargar le nuevo dataset una vez seleccionado una perspectiva.
              function changeDataset(idPerspectiva){
                $window.console.log(controllerName + "changeDataset(idPerspectiva)");
                if ((idPerspectiva % 2) === 0)
                  $scope.tableParams.settings({
                    dataset: angular.copy(originalData)
                  });
                else
                  $scope.tableParams.settings({
                    dataset: angular.copy(simpleList2)
                  });
                $scope.tableParams.reload();
              }

              this.$onChanges = function(changes){
                $window.console.log(controllerName + "onChanges(changes)");
                if (changes.idPerspectiva)
                  $scope.changeDataset(changes.idPerspectiva.currentValue);
              }

              var id = '100';
              function add() {
                $window.console.log(controllerName + "add()");
                $scope.isEditing = true;
                $scope.isRowAdded = true;
                $scope.tableParams.settings().dataset.unshift({
                  id: id++, 
                  name: $scope.selectedObjetivo.name
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
