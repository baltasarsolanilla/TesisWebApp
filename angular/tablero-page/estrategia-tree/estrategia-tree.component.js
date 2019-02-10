'use strict',

angular.
    module('estrategiaTree').
        component('estrategiaTree', {
            bindings: {
              onSelect: '&',
              data: '<'
            },
            templateUrl: '../angular/tablero-page/estrategia-tree/estrategia-tree.html',
            controller: function TableroTreeController($scope){
                var controllerName = "TABLERO-TREE-CONTROLLER -> ";

                $scope.perspectivas = [
                    {
                      id: "1",
                      label: 'Perspectiva 1',
                      children: [
                        {"id":1,"label":"Nombre 1","valor": 3.55,"tendencia":"ALTA"},
                        {"id":2,"label":"Nombre 2","valor": 6.55,"tendencia":"BAJA"}
                      ]
                    }, 
                    {
                      id: "2",
                      label: 'Perspectiva 2',
                      children: [
                        {"id":1,"label":"Nombre 3","valor": 3.55,"tendencia":"ALTA"},
                        {"id":2,"label":"Nombre 4","valor": 6.55,"tendencia":"BAJA"}
                      ]
                    }, 
                    {
                      id: "3",
                      label: 'Perspectiva 3',
                      children: [
                        {"id":1,"label":"Nombre 5","valor": 3.55,"tendencia":"ALTA"},
                        {"id":2,"label":"Nombre 6","valor": 6.55,"tendencia":"BAJA"}
                      ]
                    }, 
                    {
                      id: "4",
                      label: 'Perspectiva 4',
                      children: [
                        {"id":1,"label":"Nombre 7","valor": 3.55,"tendencia":"ALTA"},
                        {"id":2,"label":"Nombre 8","valor": 6.55,"tendencia":"BAJA"}
                      ]
                    }, 
                ];
                

                this.$onInit = function(){
                };

                this.$onChanges = function(changes){
                  if (changes.data.currentValue){
                    $scope.perspectivas = addLabels(changes.data.currentValue);
                    
                  }
                };

                //Capaz que aca debería poner que si el branch seleccionado es una perspectiva, se pase el objetivoAfectante en pos = 0.
                $scope.onSelectItem = onSelectItem;
                function onSelectItem(branch){
                  //console.log("arbol seleccionado: " + branch);
                  $scope.$ctrl.onSelect({item: branch});
                }

                //Le agrego un label a cada elemento con valor = label.
                //Seteo un arreglo 'children' en cada perspectiva con los objetivosAfectantes,
                //porque la directiva abn-tree espera un arreglo 'children'
                function addLabels(perspectivas){
                  angular.forEach(perspectivas, function(p){
                    p.label = p.nombre;
                    p.id = -2;
                    angular.forEach(p.objetivosAfectantes, function(o){
                      o.label = o.nombre;
                    });
                    p.children = p.objetivosAfectantes;
                  });
                  return perspectivas;
                }
            }
        });
        