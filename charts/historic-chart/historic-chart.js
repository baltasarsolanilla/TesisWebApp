
var presets = window.chartColors;
var utils = Samples.utils;

var data = {
    labels: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		// 'July',
		// 'August',
		// 'September',
		// 'October',
		// 'November',
		// 'December'
	],
    datasets: [{
        // backgroundColor: utils.transparentize(presets.red),
        backgroundColor: 'rgba(243, 16, 16, 0.23)',
        borderColor: 'rgba(243, 16, 16, 0.23)',
        borderWidth: 0.01,
        data: [12, 14, 18, 10, 21, 19],
        hidden: false,
        fill: 'origin',
        label: 'Red',
        radius: 0
    }, {
        backgroundColor: utils.transparentize(presets.yellow),
        borderColor: presets.yellow,
        borderWidth: 0.01,
        data: [18, 20, 20, 16, 27, 25],
        label: 'D1',
        fill: '-1',
        radius: 0
    }, {
        backgroundColor: 'rgba(16, 207, 6, 0.23)',
        borderColor: 'rgba(16, 207, 6, 0.23)',
        borderWidth: 0.01,
        data: [45, 45, 45, 45, 45, 45],
        hidden: false,
        label: 'GOAL',
        fill: 1,
        radius: 0
    }, {
        backgroundColor: utils.transparentize(presets.blue),
        borderColor: presets.blue,
        data: [15, 25, 15, 20, 35, 22],
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

