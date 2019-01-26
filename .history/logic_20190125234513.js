var canvas = document.getElementById("myChart");
var chart = new Chart(canvas, {
    type: 'line',
    data: [12, 19, 3, 5, 2, 3, 12, 14, 24, 23, 23, 22],
});