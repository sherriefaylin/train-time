
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDXix0c4SmNzT143jmkq3FNaSNSxg26FvE",
    authDomain: "train-time-58bd2.firebaseapp.com",
    databaseURL: "https://train-time-58bd2.firebaseio.com",
    projectId: "train-time-58bd2",
    storageBucket: "",
    messagingSenderId: "364369033871"
  };
  firebase.initializeApp(config);

  var firebase = firebase.database();

$("#submit").on("click", function(submit){
    submit.preventDefault();
    collectData();
});

function collectData() {
    var train = {
        name: $("#train").val().trim(),
        destination: $("#destination").val().trim(),
        first: $("#first").val().trim(),
        frequency: ($("#frequency").val().trim()),
    };

    firebase.ref().push(train);
    $("#train, #destination, #first, #frequency").val("");

};

firebase.ref().on("child_added", function(childSnap) {
    var train = childSnap.val();

    var trainFirst = moment(train.first, "HH:mm");

    var trainYesterday = trainFirst.subtract(1, "days");

    var calculatedTrainFirst = moment().diff(trainYesterday, "minutes");

    var minsAway = train.frequency - (calculatedTrainFirst % train.frequency);


    var newRow = $("<tr>").append(
        $("<td>").text(train.name),
        $("<td>").text(train.destination),
        $("<td>").text(train.frequency),
        $("<td>").text(moment().add(minsAway, "minutes").format("HH:mm")),
        $("<td>").text(minsAway)
    );

    $("#train-table").append(newRow);

});

