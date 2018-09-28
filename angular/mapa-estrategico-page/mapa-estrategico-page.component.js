'use strict',

angular.
  module('mapaEstrategicoPage').
    component('mapaEstrategicoPage', {
      templateUrl: '../angular/mapa-estrategico-page/mapa-estrategico-page.html',
      controller: function mapaEstrategicoPageController($scope) {
        /*
        https://www.youtube.com/watch?v=7cfHF7yAoJE&ab_channel=GoJSJavaScriptDiagrammingLibrary
        */
        let cantidadPerspectivas = 0;
        let objetivosPerspectivas = [];
        let objetivo = {
          "perspectiva":  0,
          "id": "",
          "valor": 0,
          "imagen": "",
          "colorOBjetivo": ""
        }
        let links = [];
            let Link = {
              "origen": "",
              "destino": "",
              "valor": ""
            }

        graficar();
        function graficar(){
          let $ = go.GraphObject.make;
          let diagram = $(go.Diagram,"myDiagramDiv");
          diagram.initialContentAligment = go.Spot.TopLeft;

          let nodeDataArray = [
          ];
            
          let linkDataArray = [
          ];
          diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

          let inputPers = [
            {key: "Financial"}, 
            {key: "Customer"}, 
            {key: "Internal Process"}, 
            {key: "Organizational Capacity"}];
          let inputObjs = [
            {key: "objetivo 1", valor: 0, group: "Financial", tendencia: 0},
            {key: "objetivo 2", valor: 1, group: "Financial", tendencia: 0.1},
            {key: "objetivo 3", valor: 2, group: "Financial", tendencia: 0.2},
            {key: "objetivo 4", valor: 3, group: "Customer", tendencia: 0.3}, 
            {key: "objetivo 5", valor: 4, group: "Customer", tendencia: 0.4}, 
            {key: "objetivo 6", valor: 5, group: "Customer", tendencia: 0.5}, 
            {key: "objetivo 7", valor: 6, group: "Internal Process", tendencia: 0.6}, 
            {key: "objetivo 8", valor: 7, group: "Internal Process", tendencia: 0.7}, 
            {key: "objetivo 9", valor: 8, group: "Internal Process", tendencia: 0.8}, 
            {key: "objetivo 10", valor: 9, group: "Organizational Capacity", tendencia: 0.9},
            {key: "objetivo 11", valor: 2, group: "Organizational Capacity", tendencia: 0.2}, 
            {key: "objetivo 12", valor: 5, group: "Organizational Capacity", tendencia: 0.5}];
          let num = 5;
          let inputLinks = [
            {from: "objetivo 1", to: "objetivo 2", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 3", to: "objetivo 2", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 4", to: "objetivo 1", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 5", to: "objetivo 2", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 5", to: "objetivo 3", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 6", to: "objetivo 3", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 7", to: "objetivo 4", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 8", to: "objetivo 4", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 8", to: "objetivo 5", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 9", to: "objetivo 5", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 9", to: "objetivo 6", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 10", to: "objetivo 7", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 11", to: "objetivo 7", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 11", to: "objetivo 8", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 11", to: "objetivo 9", valor: num.toString(), color1: "#555555", color2: "#777777"},
            {from: "objetivo 12", to: "objetivo 9", valor: num.toString(), color1: "#555555", color2: "#777777"},
            ];

          cantidadPerspectivas = inputPers.length;
          let widthTotal = (document.querySelector("#myDiagramDiv").clientWidth - 20);
          let heightTotal = (document.querySelector("#myDiagramDiv").clientHeight - 20);
          let myheight = heightTotal/cantidadPerspectivas;
          let mySize = widthTotal +" " + myheight;
          let yOrigen = 0;
          let posOrigen = 0 + " " + yOrigen;
          let colorObjetivo ="";
          let sizeTotal = widthTotal + " " + heightTotal;

          let cantidad = 0;
          let cantObjs = 0;
          for (let i = 0; i < cantidadPerspectivas; i++) {
            cantObjs = 0;
            for (let j = 0; j < inputObjs.length; j++)
              if (inputObjs[j].group === inputPers[i].key)
                cantObjs++;
            objetivosPerspectivas[i] = cantObjs;
            if (objetivosPerspectivas[i]*150 + 30+70+35 > widthTotal)
                widthTotal = objetivosPerspectivas[i]*150 + 30+70+35;
          }
          if (90 > myheight)
            myheight = 90;
          mySize = widthTotal +" " + myheight;


          diagram.nodeTemplate = 
              $(go.Node, "Spot", //go.Panel.Auto
                  {selectionObjectName: "PH",
                  locationObjectName: "PH",
                  desiredSize: new go.Size(122, 90),
                  resizeObjectName: "PH",
                  deletable: false},
                  new go.Binding("location", "loc", go.Point.parse),
                  $(go.Shape,
                      { figure: "Ellipse",
                      strokeWidth: 2,
                      desiredSize: new go.Size(120, 60)},
                      new go.Binding("fill", "color"),
                      new go.Binding("stroke", "highlight")
                      ),
                  $(go.TextBlock,
                      {margin: 3, font: "12pt Arial, Serif"},
                      new go.Binding("text", "key")),

                  $(go.Picture,
                      {desiredSize: new go.Size(25,25), alignment: new go.Spot(0.9,0) },
                      new go.Binding("source", "imagen")));

          diagram.linkTemplate =
              $(go.Link,
                      {
                       curve: go.Link.Bezier,
                       deletable: false },
                  $(go.Shape,
                      {strokeWidth: 2},
                      new go.Binding("stroke", "color1")
                      ),
                  $(go.Shape, { toArrow: "Triangle", strokeWidth: 2}, 
                      new go.Binding("fill", "color2"),
                      new go.Binding("stroke", "color2")),
                  $(go.TextBlock, 
                      new go.Binding("text", "valor"), {segmentOffset: new go.Point(0,10)})
              );

          diagram.groupTemplate =
              $(go.Group, "Vertical",
                  { background: "transparent",
                  selectionObjectName: "PH",
                  locationObjectName: "PH",
                  resizeObjectName: "PH",
                  deletable: false,
                  selectable: false,
                  },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Panel, "Auto",
                  
                  $(go.Shape, 
                      { name: "PH",
                      strokeWidth: 5,
                      figure: "RoundedRectangle"},
                      new go.Binding("fill", "color"),
                      new go.Binding("stroke", "highlight"),
                      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)
                  ),
                  $(go.TextBlock, 
                      { alignment: go.Spot.TopLeft,
                      desiredSize: new go.Size(122, 90),
                      alignment: new go.Spot(0.01,0.12),
                      font: "Bold 14pt Arial, Serif" },
                      new go.Binding("text", "key"))
              ));


          let perspectivas = [];
          let objetivos = [];
          for (let i = 0; i < cantidadPerspectivas; i++) {
            perspectivas.push({key: inputPers[i].key, color: "#f8f8f8", isGroup: true, size: mySize, loc: posOrigen, highlight: "#e7e7e7"})
            diagram.model.addNodeData(perspectivas[i]);
            let objYOrigen = yOrigen + myheight/2 -45;
            let objXOrigen = 30+70+35;
            let posObjetivo;
            for (let j = 0; j < objetivosPerspectivas[i]; j++) {
              objetivos.push({key: inputObjs[cantidad].key, group: inputObjs[cantidad].group, valor: inputObjs[cantidad].valor, color: 0, tendencia: inputObjs[cantidad].tendencia, imagen: 0, highlight: 0});
              if (inputObjs[cantidad].valor < 3.34){
                objetivos[cantidad].highlight = "#c24128";
                objetivos[cantidad].color = "#eb4b25";
              }
              else{
                if (inputObjs[cantidad].valor < 6.67){
                  objetivos[cantidad].highlight = "#c9a330";
                  objetivos[cantidad].color = "#f6d900";
                }
                else{
                  objetivos[cantidad].highlight = "#78a400";
                  objetivos[cantidad].color = "#91d202";
                }
              }
              
              if(inputObjs[cantidad].tendencia < 0.4)
                objetivos[cantidad].imagen = "../angular/mapa-estrategico-page/images/flecha-roja-t2.png";
              else
                if(inputObjs[cantidad].tendencia < 0.6)
                  objetivos[cantidad].imagen = "../angular/mapa-estrategico-page/images/flecha-amarilla-t2.png";
                else
                  objetivos[cantidad].imagen = "../angular/mapa-estrategico-page/images/flecha-verde-t2.png";
              
              posObjetivo = objXOrigen + " " + objYOrigen;
              objetivos[cantidad].loc = posObjetivo;
              diagram.model.addNodeData(objetivos[cantidad]);
              objXOrigen = objXOrigen + 150;
              cantidad++;
            }
            yOrigen = yOrigen + myheight;
            posOrigen = 0 + " " + yOrigen;
          }

          for (let i = 0; i < inputLinks.length; i++)
            diagram.model.addLinkData(inputLinks[i]);

        
          let timer = setInterval(function() {
            if (document.querySelector("#myDiagramDiv") !== null){
              if ((document.querySelector("#myDiagramDiv").clientWidth - 20) !== widthTotal || (document.querySelector("#myDiagramDiv").clientHeight - 20) !== heightTotal) {
                widthTotal = (document.querySelector("#myDiagramDiv").clientWidth - 20);
                heightTotal = (document.querySelector("#myDiagramDiv").clientHeight - 20);

                myheight = heightTotal/cantidadPerspectivas;
                mySize = widthTotal +" " + myheight;
                yOrigen = 0;
                posOrigen = 0 + " " + yOrigen;

                for (let i = 0; i < cantidadPerspectivas; i++) 
                  if (objetivosPerspectivas[i]*150 + 30+70+35 > widthTotal)
                    widthTotal = objetivosPerspectivas[i]*150 + 30+70+35;
                
                let nuevoSize = widthTotal +" " + myheight;
                diagram.startTransaction("shift node");
                cantidad = 0;
                for (let i = 0; i < cantidadPerspectivas; i++) {
                  let per = diagram.findNodeForKey(perspectivas[i].key);
                  diagram.model.setDataProperty(per.data, "size", nuevoSize);
                  diagram.model.setDataProperty(per.data, "loc", posOrigen);
                  let objYOrigen = yOrigen + myheight/2 -45;
                  let objXOrigen = 30+70+35;
                  let posObjetivo;
                  for (let j = 0; j < objetivosPerspectivas[i]; j++) {
                    let obj = diagram.findNodeForKey(objetivos[cantidad].key);
                    posObjetivo = objXOrigen + " " + objYOrigen;
                    objXOrigen = objXOrigen + 150;
                    diagram.model.setDataProperty(obj.data, "loc", posObjetivo);
                    cantidad++;
                  }
                  yOrigen = yOrigen + myheight;
                  posOrigen = 0 + " " + yOrigen;
                }
                diagram.commitTransaction("shift node");            
            }
            }
              else{
                setTimeout(function() {
                clearInterval(timer);
                }, 0);
              }
          }, 50); 
        }
			}
		}
	)
