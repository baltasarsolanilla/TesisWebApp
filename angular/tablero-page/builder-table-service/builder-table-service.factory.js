angular.module('builderTableService').

    factory('BuilderTable', function(){
        return {
            getRandomValor: function(){
                return (Math.random()*10).toFixed(2);
            },
            getRandomTendencia: function(){
                var aux = Math.random();
                if (aux < 0.33) return 'BAJA';
                else if (aux < 0.66) return 'MEDIA';
                else return 'ALTA';
            },
            setColorValor: function(valor){
                if (valor > 6.66)
                    return {color:'green'}
                else if (valor > 3.33)
                    return {color:'#FFDD00'}
                else
                    return {color:'rgba(243, 4, 4, 0.918)'}
            },
            setColorTendencia: function(tendencia){
                if (tendencia === 'ALTA')
                    return {color:'green'}
                else if (tendencia === 'MEDIA')
                    return {color:'#FFDD00'}
                else
                    return {color:'rgba(243, 4, 4, 0.918)'}
            },
            setArrowTendencia: function(tendencia){
                if (tendencia === 'ALTA')
                  return 'fas fa-arrow-circle-up'
                else if (tendencia === 'MEDIA')
                  return 'fas fa-arrow-circle-left'
                else
                  return 'fas fa-arrow-circle-down'
            },
            getTendencia: function(newValue, oldValue){
                var desviacion = 1;
                if (newValue - oldValue >= desviacion)
                    return 'ALTA';
                else if (newValue - oldValue <= -desviacion)
                    return 'BAJA';
                else
                    return 'MEDIA';
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