'use strict';

angular.
    module('perspectivasTable').
        component('perspectivasTable', {
            templateUrl: '../angular/perspectivas-page/perspectivas-table/perspectivas-table.html',
            bindings:{
              onSelect: '&',
              idEstrategia: "<"
            },
            controller: function PerspectivaObjetivosTableController($scope, NgTableParams){
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
          
              $scope.deleteCount = 0;
          
              $scope.add = add;
              $scope.cancelChanges = cancelChanges;
              $scope.del = del;
              $scope.hasChanges = hasChanges;
              $scope.saveChanges = saveChanges;

              $scope.onUpdate = onUpdate;
              $scope.changeDataset = changeDataset
              $scope.onSelectItem = onSelectItem;

              function onSelectItem(item){
                $scope.selectedPerspectiva = item;
              }

              //Esta funcion es la que va a cargar le nuevo dataset una vez seleccionado una perspectiva.
              function changeDataset(idEstrategia){
                console.log("perspectivas-table -- changeDataset")
                if ((idEstrategia % 2) === 0)
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
                console.log("perspectivas-table -- onChanges");
                if (changes.idEstrategia)
                  $scope.changeDataset(changes.idEstrategia.currentValue);
              }


              //Esta funcion carga el objetivo seleccionado para despues hacer el ADD.
              function onUpdate(newObjetivo){
              console.log("perspectiva-objetivos-table -- onUpdate");
              $scope.newObjetivo = newObjetivo;
            }

              var id = '100';
              function add() {
                console.log("perspectiva-objetivos-table -- add");
                $scope.isEditing = true;
                $scope.isRowAdded = true;
                $scope.tableParams.settings().dataset.unshift({
                  id: id++, 
                  name: $scope.newObjetivo.name
                });
                // we need to ensure the user sees the new row we've just added.
                // it seems a poor but reliable choice to remove sorting and move them to the first page
                // where we know that our new item was added to
                $scope.tableParams.sorting({});
                $scope.tableParams.page(1);
                $scope.tableParams.reload();
              }
          
              function del(row) {
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
                return $scope.deleteCount > 0 || $scope.isRowAdded;
              }
          
              function resetTableStatus() {
                $scope.isEditing = false;
                $scope.isRowAdded = false;
                $scope.deleteCount = 0;
              }
          
              function cancelChanges() {
                resetTableStatus();
                var currentPage = $scope.tableParams.page();
                $scope.tableParams.settings({
                  dataset: angular.copy(originalData)
                });
              }
          
              function saveChanges() {
                resetTableStatus();
                var currentPage = $scope.tableParams.page();
                originalData = angular.copy($scope.tableParams.settings().dataset);
              }
          
          }
        });
