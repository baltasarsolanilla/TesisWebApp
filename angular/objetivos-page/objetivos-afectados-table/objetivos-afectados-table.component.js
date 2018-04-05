'use strict';

angular.
    module('objetivosAfectadosTable').
        component('objetivosAfectadosTable', {
            templateUrl: '../angular/objetivos-page/objetivos-afectados-table/objetivos-afectados-table.html',
            bindings: {
              id: '<'
            },
            controller: function ObjetivosTableController($scope, NgTableParams){
              var simpleList = [{"id":1,"name":"Nissim","peso":12.5},
                                {"id":2,"name":"Marico","peso":12.5},
                                {"id":3,"name":"Mark","peso":25},
                                {"id":4,"name":"Allen","peso":25}];

                var simpleList2 =[{"id":1,"name":"Macon","peso":5},
                                  {"id":2,"name":"Griselda","peso":15},
                                  {"id":3,"name":"Marcelo","peso":30},
                                  {"id":4,"name":"John","peso":50},
                                  {"id":5,"name":"Kel","peso":12.5}];
                                  
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
                }

                //Esta funcion es la que va a cargar le nuevo dataset una vez seleccionado una perspectiva.
                $scope.change = true;
                function changeDataset(id){
                  console.log("kpis-table -- changeDataset")
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
