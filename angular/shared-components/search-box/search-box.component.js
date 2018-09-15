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
        controller: function SearchBoxController($window){
          var vm = this;
          var componentName = "SEARCH-BOX -> ";

          this.$onInit = function() {
          };

          this.$onChanges = function(changes){
            console.log("MENSAJEEEE: " + vm.message);
            console.log(changes);
          }

          vm.onSelectValue = function(value){
            $window.console.log(componentName + "onSelectValue()" + value.id);
            vm.onSelect({value: value});
          };
        }
    });
