var canvas = document.getElementById("myChart");
var chart = new Chart(canvas, {
    type: 'line',
    datasets: [{
      label: 'apples',
      data: [12, 19, 3, 17, 6, 3, 7],
      backgroundColor: "rgba(153,255,51,0.4)"[12, 19, 3, 5, 2, 3, 12, 14, 24, 23, 23, 22]
    }]
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