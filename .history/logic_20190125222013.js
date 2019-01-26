var canvas = document.getElementById("myChart");
var chart = new Chart(canvas, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Temperature',
            data: [12, 19, 3, 5, 2, 3, 12, 14, 24, 23, 23, 22],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});