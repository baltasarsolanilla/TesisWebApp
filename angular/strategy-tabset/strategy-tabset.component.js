'use strict';

angular.
    module('strategyTabset').
    component('strategyTabset', {
        templateUrl: '../angular/strategy-tabset/strategy-tabset.template.html',
        controller: function StrategyTabsetController($scope, $window){
          $scope.tabs = [
            { title:'Resumen', content:'Qui veniam ullamco exercitation excepteur. Consequat quis officia id ea incididunt occaecat eiusmod Lorem. Excepteur adipisicing minim minim nulla qui qui non aliquip sit consectetur est commodo. Nostrud irure commodo velit labore cupidatat excepteur esse fugiat dolore commodo. Officia proident excepteur consequat laboris ex ea.' },
            { title:'Detalle', content:'Excepteur elit laborum aliquip enim sit aliquip. Cupidatat occaecat do duis nostrud fugiat elit non. Duis incididunt ad consectetur anim mollit anim minim laborum ullamco. Incididunt commodo dolore et nisi deserunt dolore cupidatat consequat. Duis elit esse commodo aute. Minim cupidatat duis non quis sit quis laboris fugiat magna ullamco. Sunt in incididunt excepteur magna sit laborum aliquip et dolore aute ipsum ex qui fugiat. Veniam culpa reprehenderit dolor sint pariatur do sunt ut anim sit dolore non dolor et. Consequat cillum proident officia exercitation magna consectetur pariatur veniam sunt et anim id. Cillum enim nostrud deserunt magna ea laborum commodo. Ad eu reprehenderit labore tempor sint non. Consequat ipsum eiusmod sint officia. Sit minim mollit non id Lorem ipsum exercitation qui id. Aliqua laboris qui ipsum adipisicing sunt minim ullamco in exercitation eiusmod eu velit elit do.'}
          ];
        }
    });