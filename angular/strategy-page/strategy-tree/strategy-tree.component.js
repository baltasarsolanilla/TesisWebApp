'use strict',

angular.
    module('strategyTree').
        component('strategyTree', {
            templateUrl: '../angular/strategy-page/strategy-tree/strategy-tree.html',
            controller: function TableroTreeController($scope, $window){
                $scope.my_data = [
                    {
                      label: 'Finanzas',
                      children: [
                        {
                          label: 'Objetivo - A',
                          children: ['KPI - T', 'KPI - V']
                        }, {
                          label: 'Objetivo - U',
                          children: ['KPI - NY', 'KPI - LA']
                        }, 
                      ]
                    }, 
                    {
                      label: 'Clientes',
                      children: [
                        {
                          label: 'Objetivo - V',
                          children: ['KPI - C', 'KPI - M']
                        }, {
                          label: 'Objetivo - B',
                          children: ['KPI - SP', 'KPI - RJ']
                        }
                      ]
                    },
                    {
                        label: 'Procesos Internos',
                        children: [
                          {
                            label: 'Objetivo - V',
                            children: ['KPI - C', 'KPI - M']
                          }
                        ]
                      },
                      {
                        label: 'Aprendizaje y Crecimiento',
                        children: [
                          {
                            label: 'Objetivo - V',
                            children: ['KPI - C', 'KPI - K']
                          }
                        ]
                      }
                  ];
            }
        });
        