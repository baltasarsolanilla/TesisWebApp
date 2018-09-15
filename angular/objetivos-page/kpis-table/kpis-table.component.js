'use strict',

angular.
    module('kpisTable').
        component('kpisTable', {
            templateUrl: '../angular/objetivos-page/kpis-table/kpis-table.html',
            bindings: {
              data: '<'
            },
            controller: function KPIsTableController($scope, $window, NgTableParams){
              var controllerName = "KPI-TABLE-CONTROLLER -> ";

              var simpleList = [{"id":1,"nombre":"Nombre 1","peso":0.0},
                                {"id":2,"nombre":"Nombre 2","peso":0.0},
                                {"id":3,"nombre":"Nombre 3","peso":0.0}];
              var simpleList2 = [{"id":1,"nombre":"Nombre 4","peso":0.0},
                                {"id":2,"nombre":"Nombre 5","peso":0.0},
                                {"id":3,"nombre":"Nombre 6","peso":0.0}];

                
                // Funciones del controller
                $scope.add = add;
                $scope.del = del;
                $scope.hasChanges = hasChanges;
                $scope.cancelChanges = cancelChanges;
                $scope.saveChanges = saveChanges;
                
                $scope.onSelectKpi = onSelectKpi;
                $scope.onSelectPeso = onSelectPeso;
                $scope.changeDataTable = 0;

                // Variables del controller

                $scope.selectedKPI = null;
                $scope.selectedPeso = null;
                $scope.deleteCount = 0;

                $scope.tableParams = new NgTableParams({
                  page: 1, // show first page
                  count: 10 // count per page
                  }, {
                  counts: [],
                  dataset: angular.copy(simpleList)
                });
                
                //Carga el KPI seleccionado en el search-box.
                function onSelectKpi(value){
                $window.console.log(controllerName + "onSelect(vale)");
                  $scope.selectedKPI = value;
                }

                //Carga el PESO seleccionado en el search-box.
                function onSelectPeso(value){
                  $window.console.log(controllerName + "onSelectPeso(value)");
                  $scope.selectedPeso = value;
                }

                //Esta funcion es la que va a cargar le nuevo dataset una vez seleccionado una perspectiva.
                function changeDataTable(data){
                  var data_formateada = [];
                  angular.forEach(data, function(e) {
                    this.push({
                      "id" : e.indicador.id,
                      "nombre" : e.indicador.nombre,
                      "peso" : e.peso
                    })
                  }, data_formateada);

                  $scope.tableParams.settings({
                    dataset: angular.copy(data_formateada)
                  });
                  /**/$scope.change = !$scope.change;
                  $scope.tableParams.reload();
                }

                this.$onChanges = function(changes){
                  $window.console.log(controllerName + "onChanges(changes)");
                  if (changes.data.currentValue){
                    $scope.changeDataTable = changes.data.currentValue[0].indicador.id;
                    changeDataTable(changes.data.currentValue);
                  }
                }

                var id = '100';
                function add() {
                  $window.console.log(controllerName + "add()");
                  $scope.isEditing = true;
                  $scope.isRowAdded = true;
                  $scope.tableParams.settings().dataset.unshift({
                    id: id++, 
                    name: $scope.selectedKPI.name,
                    peso: $scope.selectedPeso.name
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
