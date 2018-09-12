'use strict',

angular.
    module('searchBox').
    component('searchBox', {
        templateUrl: '../angular/shared-components/search-box/search-box.html',
        bindings: {
          onSelect: '&',
          message: '<',
          data: '<'
        },
        controller: function SearchBoxController($scope, $window){
          var vm = this;
          var componentName = "SEARCH-BOX -> ";

          this.$onInit = function() {
          };
          //Cuando se carga "data" por primera vez, debo ejecutar onSelect con data[0]

          vm.onSelectValue = function(value){
            $window.console.log(componentName + "onSelectValue()");
            vm.onSelect({value: value});
          };
        }
    });
