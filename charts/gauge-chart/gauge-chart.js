var initGrafico = function(minValue, maxValue, value, opts){
    var gauge = new Gauge(document.getElementById("gauge-canvas"));
    gauge.setOptions(opts);
    gauge.setTextField(document.getElementById("gauge-textfield"));
    gauge.minValue = minValue;
    gauge.maxValue = maxValue;
    gauge.animationSpeed = 10;
    gauge.set(value);
}

var setColorTextField = function(minValue, maxValue, staticZones, value, opts){
    var aux;
    if (value >= maxValue)
      aux = opts.staticZones[opts.staticZones.length-1].strokeStyle;
    else
      if (value <= minValue)
        aux = opts.staticZones[0].strokeStyle;
      else
        for (var o in opts.staticZones) {
          if ((opts.staticZones[o].min < value) &&(value < opts.staticZones[o].max))
            aux = opts.staticZones[o].strokeStyle;
        }
  $('#gauge-textfield').css({"color": aux});
}

  var minValue = 0;
  var maxValue = 2100;
  var thresholdRedYellow = 700;  //umbral de rojo a amarillo
  var thresholdYellowGreen = 1400;  //umbral de amarillo a verde
  var value = 1630;
  if (value > maxValue)
    maxValue = value;
  if (value < minValue)
    minValue = value;
   
  var opts = {
    angle: 0,
    lineWidth: 0.2,
    radiusScale:0.8,
    pointer: {  //aguja
      length: 0.6,
      strokeWidth: 0.05,
      color: '#000000'
    },
    staticLabels: {
      font: "14px sans-serif",
      labels: [thresholdRedYellow, thresholdYellowGreen],
      fractionDigits: 0
    },
    staticZones: [
       {strokeStyle: "#F03E3E", min: minValue, max: thresholdRedYellow},
       {strokeStyle: "#FFDD00", min: thresholdRedYellow, max: thresholdYellowGreen},
       {strokeStyle: "#30B32D", min: thresholdYellowGreen, max: maxValue}
    ],
    limitMax: false,
    limitMin: false,
    highDpiSupport: true
  };

  setColorTextField(minValue, maxValue, opts.staticZones, value, opts);
  initGrafico(minValue, maxValue, value, opts);
