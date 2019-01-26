var canvas = document.getElementById("myChart");
var chart = new Chart(canvas, {
    type: 'line',
    data: [12, 19, 3, 5, 2, 3, 12, 14, 24, 23, 23, 22],
});

// Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "<API_KEY>",
    authDomain: "ultrasonicdata.firebaseapp.com",
    databaseURL: "https://ultrasonicdata.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);