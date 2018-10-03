'use strict',
'use strict',

angular.
    module('objetivosTable').
        component('objetivosTable', {
            templateUrl: '../angular/estrategias-page/objetivos-table/objetivos-table.html',
            bindings: {
              data: '<',
              first: '<'
            },
            controller: function ObjetivosTableController($scope, $window, NgTableParams){
             var originalData = [];

              $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10 // count per page
                }, {
                counts: [],
                dataset: angular.copy(originalData)
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
              

              this.$onInit = function() {
                cargarObjetivos();
                /*changeDataTable(first);*/
                originalData = $scope.objetivos;
                $scope.tableParams = new NgTableParams({
                  page: 1, // show first page
                  count: 10 // count per page
                  }, {
                  counts: [],
                  dataset: angular.copy(originalData)
                });
              };

              this.$onChanges = function(changes){
                $window.console.log(controllerName + "onChanges(changes)");
                if (changes.data.currentValue){
                  changeDataTable(changes.data.currentValue);
                  console.log(this);
                  
                }
              };

              //Esta funcion recarga el dataset con los indicadoresAfecantes del objetivo seleccionado
              function changeDataTable(data){
                $window.console.log(controllerName + "changeDataTable(data)")
                originalData = data;
                /*pesoTotal = BuilderTable.getPesoTotal(data);*/
                $scope.tableParams.settings({
                  dataset: angular.copy(originalData)
                });
                $scope.tableParams.reload();
              }

              //AJAX
              function cargarObjetivos(){
                $scope.objetivos = $scope.data;
                $scope.selectedItem = $scope.first;
              }

              //Esta funcion es la que va a cargar le nuevo dataset una vez seleccionado una perspectiva.
              function changeDataset(idPerspectiva){
                $window.console.log(controllerName + "changeDataset(idPerspectiva)")
                  $scope.tableParams.settings({
                    dataset: angular.copy(originalData)
                  });
                $scope.tableParams.reload();
              }


              //Carga el OBJETIVO seleccionado en el search-box.
              function onSelectObjetivo(value){
                $window.console.log(controllerName + "onSelectObjetivo(value)");
                $scope.selectedObjetivo = value;
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