'use strict',

angular.
    module('searchBox').
    component('searchBox', {
        templateUrl: '../angular/shared-components/search-box/search-box.html',
        bindings: {
          onSelect: '&',
          message: '<',
          listaElementos: '<'
        },
        controller: function SearchBoxController($scope, $window){
          var vm = this;
          var componentName = "SEARCH-BOX -> ";
          var simpleList = [{"id":1,"name":"1 Nissim","age":41,"money":454},{"id":2,"name":"2 Mariko","age":10,"money":-100},{"id":3,"name":"3 Mark","age":39,"money":291},{"id":4,"name":"4 Allen","age":85,"money":871},{"id":5,"name":"5 Dustin","age":10,"money":378},{"id":6,"name":"6 Macon","age":9,"money":128}];
          vm.people = simpleList;

          this.$onInit = function() {
          };

          vm.onSelectValue = function(value){
            $window.console.log(componentName + "onSelectValue()");
            vm.onSelect({value: value});
          };
        }
    });
