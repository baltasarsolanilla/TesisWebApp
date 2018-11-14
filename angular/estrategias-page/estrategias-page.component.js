'use strict',

angular.
    module('estrategiasPage').
        component('estrategiasPage', {
            templateUrl: '../angular/estrategias-page/estrategias-page.html',
            controller: function PerspectivasPageController($scope, $window, $uibModal, Estrategia){
        
                //HTTP REST REQUEST-RESPONSE
             /*   console.log("Estrategia: GET ");
                $scope.estrategias = Estrategia.query(function(estrategias){
                    estrategias.forEach(element => {
                        $window.console.log(element.nombre);
                        $window.console.log("Mision: " + element.mision);    
                        $window.console.log("Vision: " + element.vision);
                    });
                    $window.console.log($scope.estrategias);                  
                });*/
                
                
                // FuncIones de controler
                $scope.createEstrategia = createEstrategia;
                $scope.updateEstrategia = updateEstrategia;
                $scope.deleteEstrategia = deleteEstrategia;

                $scope.onSelectEstrategia = onSelectEstrategia;

                $scope.addPerspectivasAfectantes = addPerspectivasAfectantes;
                $scope.deletePerspectivasAfectantes = deletePerspectivasAfectantes;

                // Variables de controller
                var controllerName = "ESTRATEGIAS-PAGE-CONTROLLER ->";
             /*   $scope.mision = "Elit reprehenderit aliquip magna culpa. Duis irure sit ex officia sunt adipisicing magna. Ex incididunt sunt sint ut duis exercitation enim anim. Pariatur magna id deserunt commodo laborum ad laborum. Irure incididunt qui officia ut ea amet et eu pariatur est adipisicing occaecat. Voluptate deserunt sint eu mollit laboris dolor id fugiat pariatur ut non commodo. Eiusmod consectetur dolore sunt sunt enim nulla sunt ad aute nostrud laborum tempor ad officia."
                $scope.vision = "Commodo tempor nulla incididunt proident velit ea est proident aliqua fugiat magna irure nostrud pariatur. Duis do ad esse nisi culpa. Qui est incididunt aliquip magna ullamco ipsum Lorem. Magna minim aliquip cillum ea in ut labore ipsum laborum amet aute proident nulla eu. Nisi ex nostrud aliquip deserunt."
                $scope.selectedEstrategia = null;
               */ 

               cargarEstrategias();

                this.$onInit = function() {
                    cargarEstrategias();
                    /*$scope.estrategiaSeleccionada = $scope.estrategias[0];*/
                };

                function cargarEstrategias(){
                    Estrategia.query(function(estrategias){
                        delete estrategias.$promise;
                        delete estrategias.$resolved;
                        $scope.estrategias = estrategias;
                        // console.log($scope.estrategias);
                    });
                }

                function onSelectEstrategia(value){
                    // $window.console.log(controllerName + "onSelectEstrategia(value");
                    $scope.selectedEstrategia = value;
                }

                function createEstrategia(){
                    $window.console.log(controllerName + "createEstrategia()");
                    var modalInstance = $uibModal.open({
                      animation: true,
                      component: 'modalCrearEstrategia'
                    });

                    modalInstance.result.then(function (est) {
                      Estrategia.save(est, function(estrategia_creada){
                          $scope.estrategias.push(estrategia_creada);
                          //onSelectEstrategia(estrategia_creada);  quiero agregar que se vea esta al crearla
                          alert("Estrategia creada exitosamente");
                      });
                    }, function () {
                      $window.console.log('modal-component dismissed at: ' + new Date());
                    });
                }

                //UPDATE OBJETIVO
                function updateEstrategia(){
                    var modalInstance = $uibModal.open({
                        animation: true,
                        component: 'modalModificarEstrategia',
                        resolve: {
                          est: function () {
                            return $scope.selectedEstrategia;
                          }
                        }
                    });
  
                    modalInstance.result.then(function (est) {
                        Estrategia.update(est, function(estrategia_modificada){
                            alert("Estrategia modificada exitosamente");
                            var indexOfEst = $scope.estrategias.findIndex(i => i.id === estrategia_modificada.id);
                            $scope.estrategias.splice(indexOfEst, 1, estrategia_modificada);
                        });
                    }, function () {
                        $window.console.log('modal-component dismissed at: ' + new Date());
                    });
                }

                function deleteEstrategia(){
                  Estrategia.delete({idEstrategia: $scope.selectedEstrategia.id}, function(response) {
                        var indexOfEst = $scope.estrategias.findIndex(i => i.id === $scope.selectedEstrategia.id);
                        $scope.estrategias.splice(indexOfEst, 1);
                        alert("Estrategia eliminada exitosamente");
                        $window.location.reload();
                        /*onSelectEstrategia($scope.estrategias[0]);*/
                    });
                }


                //ADD PERSPECTIVA AFECTANTE
                function addPerspectivasAfectantes(perspectivas){
                    angular.forEach(perspectivas, function(i) {
                      console.log(i);
                        addSinglePerspectivaAfectante(i);
                      });
                }

                function addSinglePerspectivaAfectante(perspectiva){
                    var pers = {
                        nombre: perspectiva.nombre,
                        descripcion: perspectiva.descripcion
                    };
                    Estrategia.addPerspectivaAfectante({idEstrategia: $scope.selectedEstrategia.id}, pers, function(response){
                        alert("Perspectiva afectante relacionado exitosamente");
                        console.log(response);
                    });
                }

                function deletePerspectivasAfectantes(perspectivas){
                    angular.forEach(perspectivas, function(p) {
                        deleteSinglePerspectivaAfectante(p);
                      });
                }

                function deleteSinglePerspectivaAfectante(perspectiva){
                    var p = {
                        id: perspectiva.id,
                        nombre: perspectiva.nombre
                    };
                    Estrategia.deletePerspectivaAfectante({idEstrategia: $scope.selectedEstrategia.id}, p, function(response){
                        alert("Perspectiva afectante eliminado exitosamente");
                        console.log(response);
                    });
                }




            }
        });

angular.
    module('estrategiasPage').
        component('modalCrearEstrategia', {
            templateUrl: '../angular/estrategias-page/estrategias-page-modals/crear-estrategia.modal.html',
            bindings: {
              // resolve: '<',
              close: '&',
              dismiss: '&'
            },
            controller: function ModalController($scope, $window) {
              var $ctrl = this;
              var controllerName = "ESTRATEGIAS-PAGE-MODAL -> ";
              $ctrl.$onInit = function () {
                // $window.console.log(controllerName + "onInit()");
                // $ctrl.items = $ctrl.resolve.items;
                // $ctrl.selected = {
                //   item: $ctrl.items[0]
                // };
              };

              $ctrl.estrategiaForm = {
                  nombre: "",
                  descripcion: "",
                  mision: "",
                  vision: ""
              };

              $ctrl.ok = function () {
                // $window.console.log(controllerName + "ok()");
                $ctrl.close({$value: $ctrl.estrategiaForm});
              };

              $ctrl.cancel = function () {
                $ctrl.dismiss({$value: 'cancel'});
              };
            }
});

angular.
    module('estrategiasPage').
        component('modalModificarEstrategia', {
            templateUrl: '../angular/estrategias-page/estrategias-page-modals/modificar-estrategia.modal.html',
            bindings: {
              resolve: '<',
              close: '&',
              dismiss: '&'
            },
            controller: function ($window) {
              var $ctrl = this;

              $ctrl.$onInit = function () {
                $ctrl.estrategiaForm = $ctrl.resolve.est;
              };

              $ctrl.estrategiaForm = {
                  nombre: "",
                  descripcion: "",
                  mision: "",
                  vision: ""
              };

              $ctrl.ok = function () {
                $ctrl.close({$value: $ctrl.estrategiaForm});
              };

              $ctrl.cancel = function () {
                $ctrl.dismiss({$value: 'cancel'});
              };
            }
    });