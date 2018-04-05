'use strict';

angular.
    module('kpisTable').
        component('kpisTable', {
            templateUrl: '../angular/objetivos-page/kpis-table/kpis-table.html',
            bindings: {
              id: '<'
            },
            controller: function ObjetivosTableController($scope, NgTableParams){
                var simpleList = [{"id":1,"name":"KPI -- A","peso":12.5},
                                  {"id":2,"name":"KPI -- B","peso":12.5},
                                  {"id":3,"name":"KPI -- C","peso":25}];
                
                var simpleList2 =[{"id":1,"name":"KPI -- Z","peso":5},
                                  {"id":2,"name":"KPI -- Q","peso":15},
                                  {"id":3,"name":"KPI -- R","peso":30},
                                  {"id":4,"name":"KPI -- S","peso":50},
                                  {"id":5,"name":"KPI -- T","peso":12.5}];

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
                $scope.onSelectPeso = onSelectPeso;
                $scope.changeDataset = changeDataset
                
                //Esta funcion carga el objetivo seleccionado para despues hacer el ADD.
                function onSelect(value){
                  console.log("kpis-table -- onSelect");
                  $scope.valueSelected = value;
                }
                function onSelectPeso(value){
                  console.log("kpis-table -- onSelect");
                  $scope.pesoSelected = value;
                }

                //Esta funcion es la que va a cargar le nuevo dataset una vez seleccionado una perspectiva.
                $scope.change = true;
                function changeDataset(id){
                  console.log("kpis-table -- changeDataset")
                  if ($scope.change)
                    $scope.tableParams.settings({
                      dataset: angular.copy(simpleList)
                    });
                  else
                    $scope.tableParams.settings({
                      dataset: angular.copy(simpleList2)
                    });
                  $scope.change = !$scope.change;
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
                    name: $scope.valueSelected.name,
                    peso: $scope.pesoSelected.name
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
