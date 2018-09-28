angular.
  module('balancedScorecard').
  factory('GlobalStorageFactory', function() {
    var GlobalStorageFactory = {};
    var estrategia = null;

    // this method will take in an object and set our storage variable to whatever that object is
    GlobalStorageFactory.setEstrategia = function(e) {
      estrategia = e;
    };
  
    // this is the getter for whatever is in our store
    GlobalStorageFactory.getEstrategia = function() {
      return estrategia;
    };

    return GlobalStorageFactory;
});