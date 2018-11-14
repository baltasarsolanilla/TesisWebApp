'use strict',

angular.
    module('perspectivasTable').
        component('perspectivasTable', {
            templateUrl: '../angular/estrategias-page/perspectivas-table/perspectivas-table.html',
            bindings:{
              onSelect: '&',
              addPerspectivas: '&',
              deletePerspectivas: '&',
              data: '<'
            },
            controller: function PerspectivasTableController($scope, $window, $uibModal, NgTableParams, Perspectiva){

              var perspectivasFAKE = [
                {
                  id:"1",
                  nombre:"p1",
                  descripcion:"d1"
                },
                {
                  id:"2",
                  nombre:"p2",
                  descripcion:"d2"
                }
              ];


              // Funciones de controller
              $scope.createPerspectiva = createPerspectiva;
              $scope.del = del;
              $scope.hasChanges = hasChanges;
              $scope.cancelChanges = cancelChanges;
              $scope.saveChanges = saveChanges;

              $scope.onSelectPerspectiva = onSelectPerspectiva;

              $scope.addObjetivosAfectantes = addObjetivosAfectantes;
              $scope.deleteObjetivosAfectantes = deleteObjetivosAfectantes;

              // Variblaes de controller
              var controllerName = "PERSPECTIVAS-TABLE-CONTROLLER -> ";
              $scope.deleteCount = 0;
              $scope.selectedPerspectiva = null;

              $scope.perspectivas = [];
              var listaPerspectivasEliminadas = [];
              var listaPerspectivasAgregadas = [];

              this.$onInit = function() {
                if ($scope.$ctrl.data == undefined)
                  originalData = perspectivasFAKE;
                
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
                  // console.log(this);
                  
                }
              };

              //Esta funcion recarga el dataset con los indicadoresAfecantes del objetivo seleccionado
              function changeDataTable(data){
                if ($scope.tableParams == undefined){
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
                onSelectPerspectiva(data[0]);
              }

              //Carga la PERSPECTIVA seleccionado en el search-box.
              function onSelectPerspectiva(value){
                // $window.console.log(controllerName + "onSelectPerspectiva(value)");
                $scope.selectedPerspectiva = value;
              }

              var id = '9999';
              function createPerspectiva() {
                $scope.isEditing = true;
                $scope.isRowAdded = true;
                
                var modalInstance = $uibModal.open({
                      animation: true,
                      component: 'modalComponentPerspectiva'
                    });

                    modalInstance.result.then(function (pers) {
                      
                      pers.id = id;
                      id++;
                      listaPerspectivasAgregadas.push(pers);
                      $scope.tableParams.settings().dataset.unshift(pers);
                      $scope.tableParams.sorting({});
                      $scope.tableParams.page(1);
                      $scope.tableParams.reload();
                    }, function () {
                      $window.console.log('modal-component dismissed at: ' + new Date());
                    });
              }

              function del(row) {
                $scope.isRowDeleted = true;
                _.remove($scope.tableParams.settings().dataset, function(item) {
                  return row === item;
                });

                listaPerspectivasEliminadas.push(row);

                $scope.tableParams.reload().then(function(data) {
                  if (data.length === 0 && $scope.tableParams.total() > 0) {
                    $scope.tableParams.page($scope.tableParams.page() - 1);
                    $scope.tableParams.reload();
                  }
                });
              }
          
              function hasChanges() {
                // $window.console.log(controllerName + "hasChanges()");
                return $scope.isRowDeleted || $scope.isRowAdded;
              }
          
              function resetTableStatus() {
                $scope.isEditing = false;
                $scope.isRowAdded = false;
                $scope.isRowDeleted = false;
                listaPerspectivasAgregadas = [];
                listaPerspectivasEliminadas = [];
              }
          
              function cancelChanges() {
                resetTableStatus();
                $scope.tableParams.settings({
                  dataset: angular.copy(originalData)
                });

              }
          
              function saveChanges() {
                if ($scope.isRowAdded){
                  $scope.$ctrl.addPerspectivas({perspectivas: listaPerspectivasAgregadas});
                }

                if ($scope.isRowDeleted)
                $scope.$ctrl.deletePerspectivas({perspectivas: listaPerspectivasEliminadas});


                resetTableStatus();
                originalData = angular.copy($scope.tableParams.settings().dataset);
                onSelectPerspectiva(originalData[0]);
                $scope.tableParams.reload();
              }

              // PERSPECTIVAS SERVICE AJAX
              //ADD PERSPECTIVA AFECTANTE
              function addObjetivosAfectantes(objetivos){
                  angular.forEach(objetivos, function(o) {
                      console.log(o);
                      addSingleObjetivoAfectante(o);
                    });
              }

              function addSingleObjetivoAfectante(objetivo){
                  var obj = {
                      nombre: objetivo.nombre,
                      descripcion: objetivo.descripcion
                  };
                  Perspectiva.addObjetivoAfectante({idPerspectiva: $scope.selectedPerspectiva.id}, obj, function(response){
                      alert("Objetivo afectante relacionado exitosamente");
                      console.log(response);
                  });
              }

              function deleteObjetivosAfectantes(objetivos){
                  angular.forEach(objetivos, function(o) {
                      deleteSingleObjetivoAfectante(o);
                      console.log(o);
                    });
              }

              function deleteSingleObjetivoAfectante(objetivo){
                  var obj = {
                      id: objetivo.id,
                      nombre: objetivo.nombre
                  };
                  
                  Perspectiva.deleteObjetivoAfectante({idPerspectiva: $scope.selectedPerspectiva.id}, obj, function(response){
                      alert("Objetivo afectante eliminado exitosamente");
                      console.log(response);
                  });
              }
          
          }
        });

angular.
    module('perspectivasTable').
        component('modalComponentPerspectiva', {
          templateUrl: '../angular/shared-components/modal-form/modal-form-perspectiva.modal.html',
          bindings: {
            // resolve: '<',
            close: '&',
            dismiss: '&'
          },
          controller: function ($window) {
            var $ctrl = this;
            var controllerName = "PERSPECTIVAS-TABLE-MODAL -> ";
            $ctrl.$onInit = function () {
              // $window.console.log(controllerName + "onInit()");
              // $ctrl.items = $ctrl.resolve.items;
              // $ctrl.selected = {
              //   item: $ctrl.items[0]
              // };
            };

            $ctrl.perspectivaForm = {
                nombre: "",
                descripcion: ""
            };

            $ctrl.ok = function () {
              // $window.console.log(controllerName + "ok()");
              $ctrl.close({$value: $ctrl.perspectivaForm});
            };

            $ctrl.cancel = function () {
              $ctrl.dismiss({$value: 'cancel'});
            };
        }
      });