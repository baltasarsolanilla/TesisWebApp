'use strict',

angular.
    module('searchBox').
    component('searchBox', {
        templateUrl: '../angular/shared-components/search-box/search-box.html',
        bindings: {
          onSelect: '&',
          message: '<',
          data: '<',
          selectDefault: '<'
        },
        controller: function SearchBoxController($window){
          var vm = this;
          var componentName = "SEARCH-BOX -> ";

          this.$onInit = function() {
          };
          
          vm.item = {};

          this.$onChanges = function(changes){
            //Configuracion de seleccion por default.
            if (changes.data && changes.data.currentValue && vm.selectDefault != null){
              var listaItems = changes.data.currentValue;
              if (vm.selectDefault == "FIRST"){
                vm.item.selected = listaItems[0];
              }
              if (vm.selectDefault == "LAST"){
                vm.item.selected = listaItems[listaItems.length-1];  
              }
              if (vm.selectDefault == "NO_CHANGE"){
                var indexOfEst = vm.data.findIndex(i => i.id === vm.item.selected.id);
                vm.item.selected = vm.data[indexOfEst];  
              }
              //Si no tengo posicion de seleccion por default elijo FIRST.
              if (vm.item.selected == undefined){
                vm.item.selected = listaItems[0];
              }
              vm.onSelectValue(vm.item.selected);
            }
          };

          vm.onSelectValue = function(value){
            vm.onSelect({value: value});
          };
        }
    });
