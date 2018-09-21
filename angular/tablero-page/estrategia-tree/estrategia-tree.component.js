'use strict',

angular.
    module('estrategiaTree').
        component('estrategiaTree', {
            bindings: {
              onSelect: '&'
            },
            templateUrl: '../angular/tablero-page/estrategia-tree/estrategia-tree.html',
            controller: function TableroTreeController($scope){
                var controllerName = "TABLERO-TREE-CONTROLLER -> ";         
                $scope.my_data = [
                    {
                      label: 'Finanzas',
                      children: [
                        {"id":1,"label":"Nombre 1","valor": 3.55,"tendencia":"ALTA"},
                        {"id":2,"label":"Nombre 2","valor": 6.55,"tendencia":"BAJA"}
                      ]
                    }, 
                    {
                      label: 'Clientes',
                      children: ['Objetivo - C', 'Objetivo - D']
                    },
                    {
                      label: 'Procesos Internos',
                      children: ['Objetivo - E', 'Objetivo - F']
                    },
                    {
                      label: 'Aprendizaje y Crecimiento',
                      children: ['Objetivo - G', 'Objetivo - H']
                    }
                ];

                this.$onInit = function(){
                }

                this.$onChanges = function(){

                }

                //Posible funcion para no tocar la directiva
                //Le agrego un label a cada elemento con valor = label.
                function addLabels(data){
                  angular.forEach(data, function(i){
                    i.label = i.nombre;
                  })
                }

                $scope.onSelectItem = onSelectItem;
                function onSelectItem(branch){
                  console.log(controllerName);
                  console.log(branch);
                  $scope.$ctrl.onSelect({item: branch});
                }
            }
        });
        