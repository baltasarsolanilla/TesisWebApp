'use strict',

angular.
    module('perspectivasTable').
        component('perspectivasTable', {
            templateUrl: '../angular/estrategias-page/perspectivas-table/perspectivas-table.html',
            bindings:{
              onSelect: '&',
              data: "<"
            },
            controller: function PerspectivasTableController($scope, $window, $uibModal, NgTableParams){
              var simpleList = [{"id":1,"name":"Nissim","age":41,"money":454},{"id":2,"name":"Mariko","age":10,"money":-100},{"id":3,"name":"Mark","age":39,"money":291},{"id":4,"name":"Allen","age":85,"money":871},{"id":5,"name":"Dustin","age":10,"money":378},{"id":6,"name":"Macon","age":9,"money":128}];
              var simpleList2 = [{"id":3,"name":"Mark","age":39,"money":291},{"id":4,"name":"Allen","age":85,"money":871},{"id":5,"name":"Dustin","age":10,"money":378},{"id":6,"name":"Macon","age":9,"money":128}];
              var originalData = angular.copy(simpleList);

              $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10 // count per page
                }, {
                counts: [],
                dataset: angular.copy(simpleList)
              });
          
              // Funciones de controller
              $scope.createPerspectiva = createPerspectiva;
              $scope.del = del;
              $scope.hasChanges = hasChanges;
              $scope.cancelChanges = cancelChanges;
              $scope.saveChanges = saveChanges;

              $scope.onSelectPerspectiva = onSelectPerspectiva;
              $scope.onSelectItem = onSelectItem;
              $scope.changeDataset = changeDataset;

              // Variblaes de controller
              var controllerName = "PERSPECTIVAS-TABLE-CONTROLLER -> ";
              $scope.deleteCount = 0;
              $scope.selectedPerspectiva = null;
              $scope.selectedItem = null;


              //Esta funcion es la que va a cargar le nuevo dataset una vez seleccionado una perspectiva.
              function changeDataset(idEstrategia){
                $window.console.log(controllerName + "changeDataset(idEstrategia)")
                if ((idEstrategia % 2) === 0)
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
                $window.console.log(controllerName + "onChanges(changes)");
                if (changes.idEstrategia)
                  $scope.changeDataset(changes.idEstrategia.currentValue);
              }


              //Carga la PERSPECTIVA seleccionado en el search-box.
              function onSelectPerspectiva(value){
                $window.console.log(controllerName + "onSelectPerspectiva(value)");
                $scope.selectedPerspectiva = value;
              }

              //Carga el ITEM clikeado en la tabla de perspectivas.
              function onSelectItem(value){
                $window.console.log(controllerName + "onSelectItem(value)");
                $scope.selectedItem = value;
              }

              var id = '100';
              function createPerspectiva() {
                $window.console.log(controllerName + "createPerspectiva()");
                $scope.isEditing = true;
                $scope.isRowAdded = true;
                // $scope.tableParams.settings().dataset.unshift({
                //   id: id++, 
                //   name: 'pepito'
                // });
                // we need to ensure the user sees the new row we've just added.
                // it seems a poor but reliable choice to remove sorting and move them to the first page
                // where we know that our new item was added to
                $scope.tableParams.sorting({});
                $scope.tableParams.page(1);
                $scope.tableParams.reload();


                var modalInstance = $uibModal.open({
                      animation: true,
                      component: 'modalComponentPerspectiva'
                      // resolve: {
                      //   items: function () {
                      //     return $ctrl.items;
                      //   }
                      // }
                    });

                    modalInstance.result.then(function (userForm) {
                      $window.console.log('ok');
                      $window.console.log(userForm);
                    }, function () {
                      $window.console.log('modal-component dismissed at: ' + new Date());
                    });
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
              $window.console.log(controllerName + "onInit()");
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
              $window.console.log(controllerName + "ok()");
              $ctrl.close({$value: $ctrl.perspectivaForm});
            };

            $ctrl.cancel = function () {
              $ctrl.dismiss({$value: 'cancel'});
            };
        }
      });