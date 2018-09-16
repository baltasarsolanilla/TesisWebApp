'use strict',

angular.
    module('searchBox').
    component('searchBox', {
        templateUrl: '../angular/shared-components/search-box/search-box.html',
        bindings: {
          onSelect: '&',
          message: '<',
          data: '<',
          firstDefault: '<'
        },
        controller: function SearchBoxController($window){
          var vm = this;
          var componentName = "SEARCH-BOX -> ";

          this.$onInit = function() {
          };
          
          vm.item = {};
          this.$onChanges = function(changes){
            if (changes.data.currentValue && vm.firstDefault){
              vm.item.selected = changes.data.currentValue[0];
              vm.onSelectValue(vm.item.selected);
            }
          };

          vm.onSelectValue = function(value){
            $window.console.log(componentName + "onSelectValue()" + value.id);
            vm.onSelect({value: value});
          };
        }
    });
