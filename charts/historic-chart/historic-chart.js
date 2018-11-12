
var presets = window.chartColors;
var utils = Samples.utils;

var data = {
    labels: [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		// 'July',
		// 'August',
		// 'September',
		// 'October',
		// 'November',
		// 'December'
	],
    datasets: [{
        // backgroundColor: utils.transparentize(presets.red),
        backgroundColor: 'rgba(235, 75, 37, 0.3)',
        borderColor: 'rgba(235, 75, 37, 0.35)',
        borderWidth: 0.01,
        data: [6, 6.5, 7.5, 5, 3, 3],
        hidden: false,
        fill: 'origin',
        label: 'Malo',
        radius: 0
    }, {
        backgroundColor: 'rgba(246, 217, 0, 0.3)', //utils.transparentize(presets.yellow),
        borderColor: 'rgba(246, 217, 0, 0.35)', //presets.yellow,
        borderWidth: 0.01,
        data: [8, 9, 9, 7, 5, 4],
        label: 'Aceptable',
        fill: '-1',
        radius: 0
    }, {
        backgroundColor: 'rgba(145, 210, 2, 0.3)',
        borderColor: 'rgba(145, 210, 2, 0.35)',
        borderWidth: 0.01,
        data: [10, 10, 10, 10, 10, 10],
        hidden: false,
        label: 'Muy Bueno',
        fill: 1,
        radius: 0
    }, {
        backgroundColor: utils.transparentize(presets.blue),
        borderColor: presets.blue,
        data: [5, 6.3, 8.2, 9.5, 7.7, 8.2],
        label: 'Valor alcanzado',
        hidden: false,
        fill: false,
        radius: 6
    }]
};

var options = {
    maintainAspectRatio: false,
    spanGaps: false,
    elements: {
        line: {
            tension: 0.000001
        }
    },
    scales: {
        yAxes: [{
            stacked: false,
            ticks: {
                beginAtZero: false
            }
        }]
    },

    tooltips: {
            intersect: false,
            mode: 'index',
            filter: function (tooltipItem) {
                return tooltipItem.datasetIndex === 3;
            },
            // callbacks: {
            //     // Use the footer callback to display the sum of the items showing in the tooltip
            //     label : function(tooltipItem, data) {
            //         return 'Valor: ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            //     },
            // }
    },
    hover: {
        mode: 'nearest',
        intersect: false
    },
    legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 40,
        }
      },
    layout: {
        padding: {
            left: 15,
            right: 15,
            top: 15,
            bottom: 15
        }
    }
};

var chart = new Chart('historico-chart', {
    type: 'line',
    data: data,
    options: options
});

