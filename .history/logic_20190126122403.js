var canvas = document.getElementById("myChart");
var chart = new Chart(canvas, {
    type: 'line',
    data : {
        labels : [],
        datasets : [{
            label : 'Temperature',
            data : [],
            backgroundColor: "rgba(153,255,51,0.4)"
        },
        {
            label : 'Humidity',
            data : [],
            backgroundColor: "rgba(230, 100, 65, 0.3)"
        }]
    },
    options : {
        layout : {
            padding : {
                left : 20,
                right : 20,
                bottom : 20,
                top : 20
            }
        }
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
database.ref("temps/").on('child_added', function(snapshot) {
    console.log(snapshot.val());
  });