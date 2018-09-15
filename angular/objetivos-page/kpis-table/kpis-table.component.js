'use strict',

angular.
    module('kpisTable').
        component('kpisTable', {
            templateUrl: '../angular/objetivos-page/kpis-table/kpis-table.html',
            bindings: {
              addIndicadores: '&',
              data: '<'              
            },
            controller: function KPIsTableController($scope, $window, NgTableParams, Indicador){
              var controllerName = "KPI-TABLE-CONTROLLER -> ";

              $scope.indicadores = [{"id":1,"nombre":"Nombre 1","peso":0.0},
                                    {"id":2,"nombre":"Nombre 2","peso":0.0},
                                    {"id":3,"nombre":"Nombre 3","peso":0.0}];
              $scope.pesos = [{"id":1,"nombre":"1"},
                                 {"id":2,"nombre":"2"},
                                 {"id":3,"nombre":"3"}];

                
                // Funciones del controller
                $scope.add = add;
                $scope.del = del;
                $scope.hasChanges = hasChanges;
                $scope.cancelChanges = cancelChanges;
                $scope.saveChanges = saveChanges;
                
                $scope.onSelectKpi = onSelectKpi;
                $scope.onSelectPeso = onSelectPeso;
                $scope.changeDataset = 0;

                //AJAX
                $scope.cargarIndicadores = cargarIndicadores;

                // Variables del controller

                $scope.indicadorSeleccionado = null;
                $scope.pesoSeleccionado = null;
                $scope.deleteCount = 0;

                $scope.tableParams = new NgTableParams({
                  page: 1, // show first page
                  count: 10 // count per page
                  }, {
                  counts: [],
                  dataset: angular.copy($scope.indicadores)
                });
                
                //Carga el KPI seleccionado en el search-box.
                function onSelectKpi(value){
                $window.console.log(controllerName + "onSelect(vale)");
                  $scope.indicadorSeleccionado = value;
                }

                //Carga el PESO seleccionado en el search-box.
                function onSelectPeso(value){
                  $window.console.log(controllerName + "onSelectPeso(value)");
                  $scope.pesoSeleccionado = value;
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

                this.$onInit = function() {
                  cargarIndicadores();
                };

                function cargarIndicadores(){
                  Indicador.query(function(indicadores){
                    delete indicadores.$promise;
                    delete indicadores.$resolved;
                    $scope.indicadores = indicadores;
                    console.log($scope.indicadores);
                  });
                }

                this.$onChanges = function(changes){
                  $window.console.log(controllerName + "onChanges(changes)");
                  if (changes.data.currentValue){
                    $scope.changeDataset = changes.data.currentValue[0].indicador.id;
                    changeDataTable(changes.data.currentValue);
                    console.log(this);
                    
                  }
                }

                var id = '100';
                var listaIndicadoresAgregados = [];
                function add() {
                  console.log("addddddddddddddddddddddddddddddddddddddddddddd");
                  // $scope.$ctrl.addIndicadores({indicadores: i});
                  $scope.isEditing = true;
                  $scope.isRowAdded = true;
                  listaIndicadoresAgregados.push({
                    indicador: $scope.indicadorSeleccionado,
                    peso: $scope.pesoSeleccionado.nombre
                  });
                  $scope.tableParams.settings().dataset.unshift({
                    id: id++, 
                    nombre: $scope.indicadorSeleccionado.nombre,
                    peso: $scope.pesoSeleccionado.nombre
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
                  $scope.$ctrl.addIndicadores({indicadores: listaIndicadoresAgregados});
                  listaIndicadoresAgregados = [];
                  var currentPage = $scope.tableParams.page();
                  originalData = angular.copy($scope.tableParams.settings().dataset);
                }
            }
        });
