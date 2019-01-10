'use strict',

angular.
    module('searchBox').
    component('searchBox', {
        templateUrl: '../angular/shared-components/search-box/search-box.html',
        bindings: {
          onSelect: '&',
          message: '<',
          data: '<',
          firstDefault: '<',
          lastDefault: '<'
        },
        controller: function SearchBoxController($window){
          var vm = this;
          var componentName = "SEARCH-BOX -> ";

          this.$onInit = function() {
          };
          
          vm.item = {};
          this.$onChanges = function(changes){
            var listaItems = changes.data.currentValue;
            if (listaItems && (vm.firstDefault || vm.lastDefault)){
              if (vm.firstDefault){
                vm.item.selected = listaItems[0];
              }
              // if (vm.lastDefault){
              //   vm.item.selected = listaItems[listaItems.length-1];  
              // }
              vm.onSelectValue(vm.item.selected);
            }
            
            // if (changes.lastDefault.currentValue){
            //   console.log("last");
            //   vm.item.selected = $ctrl.data[$ctrl.data.length-1];
            //   vm.onSelectValue(vm.item.selected);
            // }
          };

          vm.onSelectValue = function(value){
            vm.onSelect({value: value});
          };
        }
    });
