angular.
  module('balancedScorecard').
  factory('GlobalStorageFactory', function() {
    var GlobalStorageFactory = {};
    var actualizarEstrategias = false;
    var accion = "";
    var estrategia = null;

    // this method will take in an object and set our storage variable to whatever that object is
    GlobalStorageFactory.setEstrategia = function(e) {
      estrategia = e;
    };
  
    // this is the getter for whatever is in our store
    GlobalStorageFactory.getEstrategia = function() {
      return estrategia;
    };

    GlobalStorageFactory.getActualizarEstrategias = function(){
      return actualizarEstrategias;
    };

    GlobalStorageFactory.setActualizarEstrategias = function(val){
      actualizarEstrategias = val;
    };

    GlobalStorageFactory.setAccion = function(a){
      accion = a;
    };

    GlobalStorageFactory.getAccion = function(){
      return accion;
    }

    return GlobalStorageFactory;
});