var canvas = document.getElementById("myChart");
var chart = new Chart(canvas, {
    type: 'line',
    data : {
        labels : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        datasets: [{
            label: 'Temperature',
            data: [12, 14, 3, 5, 2, 3, 12, 14, 24, 23, 23, 22],
            backgroundColor: "rgba(153,255,51,0.4)"
        }]
    }
});

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyDu6CtWBHEuPnzoVT40iTdk6q-4xfFVuiI",
    authDomain: "ultrasonicdata.firebaseapp.com",
    databaseURL: "https://ultrasonicdata.firebaseio.com",
    projectId: "ultrasonicdata",
    storageBucket: "bucket.appspot.com",
    messagingSenderId: "PC",
};
firebase.initializeApp(config);
var database = firebase.database();
database.ref('/temps/').once('value').then(function(snapshot) {
    console.log(JSON.stringify(snapshot));
});