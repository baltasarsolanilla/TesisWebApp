'use strict',

angular.
    module('kpisTable').
        component('kpisTable', {
            templateUrl: '../angular/objetivos-page/kpis-table/kpis-table.html',
            bindings: {
              addIndicadores: '&',
              deleteIndicadores: '&',
              data: '<'              
            },
            controller: function KPIsTableController($scope, NgTableParams, Indicador){
              var controllerName = "KPI-TABLE-CONTROLLER -> ";

              //Lista de indicadoresAfectantes en caso de que no se seleccione un objetivo por default.
              $scope.indicadores = [
                {
                  indicador: {"id":1,"nombre":"Nombre 1","peso":0.0},
                  peso: 0.0
                },
                {
                  indicador: {"id":2,"nombre":"Nombre 2","peso":0.0},
                  peso: 0.0
                },
                {
                  indicador: {"id":3,"nombre":"Nombre 3","peso":0.0},
                  peso: 0.0
                }
              ];

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

                //AJAX
                $scope.cargarIndicadores = cargarIndicadores;

                // Variables del controller
                $scope.indicadorSeleccionado = null;
                $scope.pesoSeleccionado = null;
                $scope.deleteCount = 0;
                var originalData = [];
                var listaIndicadoresEliminados = [];
                var listaIndicadoresAgregados = [];

                this.$onInit = function() {
                  cargarIndicadores();

                  originalData = $scope.indicadores;
                  $scope.tableParams = new NgTableParams({
                    page: 1, // show first page
                    count: 10 // count per page
                    }, {
                    counts: [],
                    dataset: angular.copy(originalData)
                  });
                };

                this.$onChanges = function(changes){
                  if (changes.data.currentValue){
                    changeDataTable(changes.data.currentValue);
                    console.log(this);
                    
                  }
                };

                //Esta funcion recarga el dataset con los indicadoresAfecantes del objetivo seleccionado
                function changeDataTable(data){
                  originalData = data;
                  $scope.tableParams.settings({
                    dataset: angular.copy(originalData)
                  });
                  $scope.tableParams.reload();
                }
               
                //Carga el KPI seleccionado en el search-box.
                function onSelectKpi(value){
                  $scope.indicadorSeleccionado = value;
                }

                //Carga el PESO seleccionado en el search-box.
                function onSelectPeso(value){
                  $scope.pesoSeleccionado = value;
                }

                function add() {
                  if ($scope.tableParams.settings().dataset.findIndex(i => i.indicador.id === $scope.indicadorSeleccionado.id) > -1){
                    alert("Indicador afectante duplicado");
                    return;
                  }

                  $scope.isEditing = true;
                  $scope.isRowAdded = true;
                  var indicadorAgregado = {
                    indicador: $scope.indicadorSeleccionado,
                    peso: $scope.pesoSeleccionado.nombre
                  };
                  listaIndicadoresAgregados.push(indicadorAgregado);

                  $scope.tableParams.settings().dataset.unshift(indicadorAgregado);
                  // we need to ensure the user sees the new row we've just added.
                  // it seems a poor but reliable choice to remove sorting and move them to the first page
                  // where we know that our new item was added to
                  $scope.tableParams.sorting({});
                  $scope.tableParams.page(1);
                  $scope.tableParams.reload();
                }                
                
                function del(row) {
                  listaIndicadoresEliminados.push(row);
                  _.remove($scope.tableParams.settings().dataset, function(item) {
                    return row === item;
                  });
                  $scope.deleteCount++;
                
                  //Refresco la tabla de indicadores afectantes
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
                  listaIndicadoresAgregados = [];
                  listaIndicadoresEliminados = [];
                }
            
                function cancelChanges() {
                  resetTableStatus();
                  var currentPage = $scope.tableParams.page();
                  $scope.tableParams.settings({
                    dataset: angular.copy(originalData)
                  });
                }
            
                function saveChanges() {
                  if ($scope.deleteCount > 0)
                    $scope.$ctrl.deleteIndicadores({indicadores: listaIndicadoresEliminados});
                  if ($scope.isRowAdded)
                    $scope.$ctrl.addIndicadores({indicadores: listaIndicadoresAgregados});
                  
                  resetTableStatus();
                  var currentPage = $scope.tableParams.page();
                  originalData = angular.copy($scope.tableParams.settings().dataset);
                }

                //AJAX
                function cargarIndicadores(){
                  Indicador.query(function(indicadores){
                    delete indicadores.$promise;
                    delete indicadores.$resolved;
                    $scope.indicadores = indicadores;
                    console.log($scope.indicadores);
                  });
                }
                
            }
        });
