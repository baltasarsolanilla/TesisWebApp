'use strict';

angular.
    module('perspectivasTable').
        component('perspectivasTable', {
            templateUrl: '../angular/perspectivas-page/perspectivas-table/perspectivas-table.html',
            bindings:{
              onSelect: '&',
            },
            controller: function PerspectivaObjetivosTableController($scope, NgTableParams){
                var simpleList = [{"id":1,"name":"Nissim","age":41,"money":454},{"id":2,"name":"Mariko","age":10,"money":-100},{"id":3,"name":"Mark","age":39,"money":291},{"id":4,"name":"Allen","age":85,"money":871},{"id":5,"name":"Dustin","age":10,"money":378},{"id":6,"name":"Macon","age":9,"money":128}];
                var originalData = angular.copy(simpleList);

                $scope.tableParams = new NgTableParams({
                  page: 1, // show first page
                  count: 10 // count per page
                  }, {
                  counts: [],
                  dataset: angular.copy(simpleList)
                });
                
                            
                $scope.addPerspectiva = addPerspectiva;
                $scope.removePerspectiva = removePerspectiva;
                $scope.updatePerspectiva = updatePerspectiva;
                
                var vm = this;
                $scope.onSelectItem = onSelectItem;
                function onSelectItem(item){
                  console.log("onSelect -- perspectivas-table-component")
                  $scope.selectedPerspectiva = item.id;
                  vm.onSelect({value: item});
                }

                var id=7;
                function addPerspectiva() {
                  console.log("perspectivas-table -- add");
                  $scope.isEditing = true;
                  $scope.isRowAdded = true;
                  id++;
                  $scope.tableParams.settings().dataset.unshift({
                    id: id, 
                    name: 'New perspectiva'
                  });
                  // we need to ensure the user sees the new row we've just added.
                  // it seems a poor but reliable choice to remove sorting and move them to the first page
                  // where we know that our new item was added to
                  $scope.tableParams.sorting({});
                  $scope.tableParams.page(1);
                  $scope.tableParams.reload();
                }

                function updatePerspectiva(){
                  alert("Update perspeciva: " + $scope.selectedPerspectiva);
                }
            
                function removePerspectiva() {
                  _.remove($scope.tableParams.settings().dataset, function(item) {
                    return $scope.selectedPerspectiva === item.id;
                  });
                  // $scope.deleteCount++;
                  $scope.tableParams.reload().then(function(data) {
                    if (data.length === 0 && $scope.tableParams.total() > 0) {
                      $scope.tableParams.page($scope.tableParams.page() - 1);
                      $scope.tableParams.reload();
                    }
                  });
                }    
                
                // $scope.createPerspectiva = createPerspectiva;
                // $scope.deletePerspectiva = deletePerspectiva;
                // $scope.updatePerspectiva = updatePerspectiva;
            }
        });
