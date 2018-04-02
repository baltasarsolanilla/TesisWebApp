'use strict';

angular.
    module('kpisTable').
        component('kpisTable', {
            templateUrl: '../angular/objetivos-page/kpis-table/kpis-table.html',
            bindings: {
              id: '<'
            },
            controller: function ObjetivosTableController($scope, NgTableParams){
                var simpleList = [{"id":1,"name":"Nissim","age":41,"money":454},{"id":2,"name":"Mariko","age":10,"money":-100},{"id":3,"name":"Mark","age":39,"money":291},{"id":4,"name":"Allen","age":85,"money":871},{"id":5,"name":"Dustin","age":10,"money":378},{"id":6,"name":"Macon","age":9,"money":128}];
                var simpleList2 = [{"id":3,"name":"Mark","age":39,"money":291},{"id":4,"name":"Allen","age":85,"money":871},{"id":5,"name":"Dustin","age":10,"money":378},{"id":6,"name":"Macon","age":9,"money":128}];
                var originalData = angular.copy(simpleList);
                $scope.messageComboBox1 = "Seleccionar objetivo...";
                $scope.messageComboBox2 = "Peso";

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

                $scope.onSelect = onSelect;
                $scope.changeDataset = changeDataset
                
                //Esta funcion carga el objetivo seleccionado para despues hacer el ADD.
                function onSelect(value){
                  console.log("kpis-table -- onSelect");
                  $scope.valueSelected = value;
                  $scope.changeDataset($scope.valueSelected.id);
                }

                //Esta funcion es la que va a cargar le nuevo dataset una vez seleccionado una perspectiva.
                function changeDataset(id){
                  console.log("kpis-table -- changeDataset")
                  if ((id % 2) === 0)
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
                  console.log("kpis-table -- onChanges");
                  if (changes.id)
                    $scope.changeDataset(changes.id.currentValue);
                }

                var id = '100';
                function add() {
                  console.log("kpis-table -- add");
                  $scope.isEditing = true;
                  $scope.isRowAdded = true;
                  $scope.tableParams.settings().dataset.unshift({
                    id: id++, 
                    name: $scope.valueSelected.name
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
