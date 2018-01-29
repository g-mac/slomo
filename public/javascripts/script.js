// CONFIG

var duration = 15;
var min_taps = 8;
var min_tap_time = (1000 * 0.8 * duration);
var max_cv = 0.09875;

// --------

var lat = 0;
var long = 0;
var accuracy = 0;

var bpmAvg = 0;
var tap_count_total = 0;
var coefficient_of_variation = 0;
var total_tap_time = 0;
var intervals = [];
var experimentTries = 0;

var date_of_birth = "";
var gender = "";
var heritage = "";
var city_size = "";

var q1 = "";
var q2 = "";
var q3 = "";
var q4 = "";
var q5 = "";
var q6 = "";
var q7 = "";

var emailAddress = "";

function postEmailAddress() {

    if (emailAddress === "") return;

    var emailResult = {
        'email': emailAddress
    };

    $.ajax({
        type: 'POST',
        data: emailResult,
        url: '/postemail'
    }).done(function (response) {

    });

}

function postQuestionResults() {

    var updateResult = {
        'q1': q1,
        'q2': q2,
        'q3': q3,
        'q4': q4,
        'q5': q5,
        'q6': q6,
        'q7': q7
    };

    $.ajax({
        type: 'POST',
        data: updateResult,
        url: '/updateresult'
    }).done(function (response) {

    });

}

function arrayAsString(values) {
    var result = "";
    for (var i = 0; i < values.length; i++) {
        if (i !== 0)
            result = result.concat(",");
        result = result.concat(values[i]);
    }
    return result;
}

function postResult() {
    if (bpmAvg < 1)
        return;

    // document.getElementById("submit_feedback").innerHTML = "sending...";
//            document.submit_feedback.value = "sending...";

    var intervalsAsString = arrayAsString(intervals);

    var newResult = {
        'tries': experimentTries,
        'bpm': bpmAvg,
        'cv': coefficient_of_variation,
        'intervals': intervalsAsString,
        'userAgent': navigator.userAgent,
        'lat': lat,
        'long': long,
        'accuracy': accuracy,
        'date_of_birth': date_of_birth,
        'gender': gender,
        'heritage': heritage,
        'city_size': city_size
    };


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

// $(document).ready(function () {
//            window.alert("document lodaded");
// })

function load_welcome() {
    $("#content").load("welcome.html");
}

function load_experiment() {
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
