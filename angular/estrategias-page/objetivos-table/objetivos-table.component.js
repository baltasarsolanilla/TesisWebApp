'use strict',
'use strict',

angular.
    module('objetivosTable').
        component('objetivosTable', {
            templateUrl: '../angular/estrategias-page/objetivos-table/objetivos-table.html',
            bindings: {
              data: '<',
              addObjetivos: '&',
              deleteObjetivos: '&'
            },
            controller: function ObjetivosTableController($scope, $window, $uibModal, NgTableParams){
              
              /*var objetivosFAKE = [
                {
                  id:"1",
                  nombre:"o1",
                },
                {
                  id:"2",
                  nombre:"o2",
                }
              ];*/

               
              // Funciones de controller
              $scope.createObjetivo = createObjetivo;
              $scope.del = del;
              $scope.hasChanges = hasChanges;
              $scope.cancelChanges = cancelChanges;
              $scope.saveChanges = saveChanges;
              $scope.selectedObjetivo = null;

              // Variables de controller
              var controllerName = "OBJETIVOS-TABLE-CONTROLLER -> ";
              var originalData = [];
              var listaObjetivosAgregados = [];
              var listaObjetivosEliminados = [];
              

              this.$onInit = function() {
                if ($scope.$ctrl.data == undefined)
                  originalData = []; //mostraba los objetivosFAKE en los casos en que la perspectiva era vacía (porque los objetivos de la perspectiva son undefined)
                $scope.tableParams = new NgTableParams({
                  page: 1, // show first page
                  count: 10 // count per page
                  }, {
                  counts: [],
                  dataset: angular.copy(originalData)
                });
              };

              this.$onChanges = function(changes){
                if (changes.data){
                  if (changes.data.currentValue){
                    changeDataTable(changes.data.currentValue);
                  }
                  else{
                    changeDataTable([]);
                  }
                }
              };

              //Esta funcion recarga el dataset con los indicadoresAfecantes del objetivo seleccionado
              function changeDataTable(data){
                if ($scope.tableParams == undefined) {
                  $scope.tableParams = new NgTableParams({
                    page: 1, // show first page
                    count: 10 // count per page
                    }, {
                    counts: [],
                    dataset: angular.copy(originalData)
                  });
                }
                
                originalData = data;
                $scope.tableParams.settings({
                  dataset: angular.copy(originalData)
                });
                $scope.tableParams.reload();
                onSelectObjetivo(data[0]);
            }

              var id = '9999';
              function createObjetivo() {
                $scope.isEditing = true;
                $scope.isRowAdded = true;
                var modalInstance = $uibModal.open({
                      animation: true,
                      component: 'modalComponentObjetivo'
                    });

                    modalInstance.result.then(function (obj) {
                      
                      obj.id = id;
                      id++;
                      listaObjetivosAgregados.push(obj);
                      $scope.tableParams.settings().dataset.push(obj);
                      $scope.tableParams.sorting({});
                      $scope.tableParams.page(1);
                      $scope.tableParams.reload();
                    }, function () {
                      // $window.console.log('modal-component dismissed at: ' + new Date());
                    });
              }
          
              function del(row) {
                // $window.console.log(controllerName + "del(row)");
                // console.log(row);
                $scope.isRowDeleted = true;
                _.remove($scope.tableParams.settings().dataset, function(item) {
                  return row.id === item.id;
                });

                listaObjetivosEliminados.push(row);
                onSelectObjetivo($scope.tableParams.settings().dataset[0]); //Selecciono again la primera opcion.
                $scope.tableParams.reload().then(function(data) {
                  if (data.length === 0 && $scope.tableParams.total() > 0) {
                    $scope.tableParams.page($scope.tableParams.page() - 1);
                    $scope.tableParams.reload();
                  }
                });
              }
          
              function hasChanges() {
                return $scope.isRowDeleted || $scope.isRowAdded;
              }
          
              function resetTableStatus() {
                $scope.isEditing = false;
                $scope.isRowAdded = false;
                $scope.isRowDeleted = false;
                listaObjetivosAgregados = [];
                listaObjetivosEliminados = [];
              }
          
              function cancelChanges() {
                resetTableStatus();
                $scope.tableParams.settings({
                  dataset: angular.copy(originalData)
                });
              }
          
              function saveChanges() {
                if ($scope.isRowAdded){
                  $scope.$ctrl.addObjetivos({objetivos: listaObjetivosAgregados});
                }

                if ($scope.isRowDeleted){
                  // console.log("---------------------------------------------")
                  $scope.$ctrl.deleteObjetivos({objetivos: listaObjetivosEliminados});
                }

                resetTableStatus();
                originalData = angular.copy($scope.tableParams.settings().dataset);
                $scope.tableParams.reload();
              }


              //Carga el objetivo clickeado en la tabla.
              $scope.onSelectObjetivo = onSelectObjetivo;
              function onSelectObjetivo(value){
                $scope.selectedObjetivo = value;
              };
          }
      });


angular.
    module('objetivosTable').
        component('modalComponentObjetivo', {
          templateUrl: '../angular/shared-components/modal-form/modal-form-objetivo.modal.html',
          bindings: {
            // resolve: '<',
            close: '&',
            dismiss: '&'
          },
          controller: function ($window) {
            var $ctrl = this;
            var controllerName = "OBJETIVOS-TABLE-MODAL -> ";
            $ctrl.$onInit = function () {
              // $window.console.log(controllerName + "onInit()");
              // $ctrl.items = $ctrl.resolve.items;
              // $ctrl.selected = {
              //   item: $ctrl.items[0]
              // };
            };

            $ctrl.objetivoForm = {
                nombre: "",
                descripcion: ""
            };

            $ctrl.ok = function () {
              // $window.console.log(controllerName + "ok()");
              $ctrl.close({$value: $ctrl.objetivoForm});
            };

            $ctrl.cancel = function () {
              $ctrl.dismiss({$value: 'cancel'});
            };
        }
      });