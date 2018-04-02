'use strict';

angular.
    module('searchBox').
    component('searchBox', {
        templateUrl: '../angular/objetivos-page/search-box/search-box.html',
        bindings: {
          onSelect: '&',
          url: '<',
          message: '<'
        },
        controller: function searchBoxController($scope){
          var vm = this;
          var simpleList = [{"id":1,"name":"Nissim","age":41,"money":454},{"id":2,"name":"Mariko","age":10,"money":-100},{"id":3,"name":"Mark","age":39,"money":291},{"id":4,"name":"Allen","age":85,"money":871},{"id":5,"name":"Dustin","age":10,"money":378},{"id":6,"name":"Macon","age":9,"money":128}];
          vm.people = simpleList;

          this.$onInit = function() {
            if (vm.message === 'Peso')
              vm.people = [{"id":1,"name":"1"},
                           {"id":2,"name":"2"},
                           {"id":3,"name":"3"},
                           {"id":4,"name":"4"},
                           {"id":5,"name":"5"},];
          };

          vm.onSelectValue = function(value){
            console.log("search-box -- onSelectValue");
            vm.onSelect({value: value});
          }
        }
    });
