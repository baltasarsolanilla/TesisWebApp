'use strict';

angular.
    module('objetivosSearchBox').
    component('objetivosSearchBox', {
        templateUrl: '../angular/perspective-page/objetivos-search-box/objetivos-search-box.html',
        bindings: {
          onUpdate: '&'
        },
        controller: function strategyListController($scope){
          var vm = this;
          vm.people = [
            { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
            { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
            { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
            { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
            { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
            { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
            { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
            { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
            { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
            { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
          ];

         vm.updateObjetivo = function(objetivo){
            console.log("strategy-list -- updateObjetivo");
            console.log(objetivo);
            vm.onUpdate({objetivo: objetivo });
          }
        }
    });
