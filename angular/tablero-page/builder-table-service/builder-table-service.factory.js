angular.module('builderTableService').
    factory('BuilderTable', function(){
        var ALTA = 'ALTA';
        var BAJA = 'BAJA';
        var MEDIA = 'MEDIA';

        var VERDE = '#91d202';
        var AMARILLO = '#f6d900';
        var NARANJA = '#FC8C28';
        var ROJO = '#eb4b25';
        return {
            getRandomValor: function(){
                return (Math.random()*10).toFixed(2);
            },
            getRandomTendencia: function(){
                var aux = Math.random();
                if (aux < 0.33) return BAJA;
                else if (aux < 0.66) return MEDIA;
                else return ALTA;
            },
            setColorValor: function(valor){
                if (valor >= 7.50)
                    return {color: VERDE}
                else if (valor >= 5.00)
                    return {color: AMARILLO}
                else if (valor >= 2.50)
                    return {color: NARANJA}
                else
                    return {color: ROJO}
            },
            setColorTendencia: function(tendencia){
                if (tendencia === ALTA)
                    return {color: VERDE}
                else if (tendencia === MEDIA)
                    return {color: AMARILLO}
                else
                    return {color: ROJO}
            },
            setArrowTendencia: function(tendencia){
                if (tendencia === ALTA)
                  return 'fas fa-arrow-circle-up'
                else if (tendencia === MEDIA)
                  return 'fas fa-arrow-circle-left'
                else
                  return 'fas fa-arrow-circle-down'
            },
            getPesoTotal: function(data){
                var peso = 0.0;
                angular.forEach(data, function(i) {
                   peso += i.peso;
                });
                return peso;
            }
        };
    });