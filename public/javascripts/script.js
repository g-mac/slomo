
var lat = 0;
var long = 0;
var accuracy = 0;
var bpmAvg = 0;

function postResult() {
    if (bpmAvg < 1)
        return

    // document.getElementById("submit_feedback").innerHTML = "sending...";
//            document.submit_feedback.value = "sending...";

    var newResult = {
        'bpm': bpmAvg,
        'userAgent': navigator.userAgent,
        'lat': lat,
        'long': long,
        'accuracy': accuracy,
    }


    // Use AJAX to post the object addresult service
    $.ajax({
        type: 'POST',
        data: newResult,
        url: '/addresult'
//                dataType: 'JSON'
    }).done(function (response) {
        //todo: not working, returning "undefined"
//                document.getElementById("submit_feedback").innerHTML = "RESPONSE:";
        // Check for successful (blank) response
        if (response.msg === '') {
            // document.getElementById("submit_feedback").innerHTML = "SUCCESS";
            // Clear the form inputs
//                    $('#addUser fieldset input').val('');
        } else {
            // If something goes wrong, alert the error message that our service returned
            // document.getElementById("submit_feedback").innerHTML = "FAILURE: " + response.msg;
//                    document.getElementById("submit_feedback").innerHTML = "FAILURE: " + response.message;
//                    alert('Error: ' + response.msg);
        }
    });
}

$(document).ready(function () {
//            window.alert("document lodaded");
    navigator.geolocation.getCurrentPosition(function (location) {
        lat = location.coords.latitude;
        long = location.coords.longitude;
        accuracy = location.coords.accuracy;
    })
})

function load_welcome() {
    $("#content").load("welcome.html");
}

function load_experiment() {
    bpmAvg = 0;
    $("#content").load("experiment.html");
}

function load_feedback() {
    $("#content").load("feedback.html");
}

function load_prequestions() {
    $("#content").load("prequestions.html");
}

function load_postquestions() {
    $("#content").load("postquestions.html");
}

function load_finish() {
    $("#content").load("finish.html");
}

function start_over() {
    location.reload();
}
