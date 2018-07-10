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
        url: '/postemail',
        success: function (data) {
            submitEmailSuccess();
        },
        error: function () {
            window.alert("Connection failed, please click ok to try again...");
        }
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
        url: '/updateresult',
        success: function (data) {
            load_finish();
        },
        error: function () {
            window.alert("Connection failed, please click ok to try again...");
            postQuestionResults();
            //handle
        }
    });

}

function getLocation() {
    navigator.geolocation.getCurrentPosition(function (location) {
        lat = location.coords.latitude;
        long = location.coords.longitude;
        accuracy = location.coords.accuracy;
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
        url: 'addresult',
        success: function (data) {
            load_feedback();
        },
        error: function () {
            window.alert("Connection failed, please click ok to try again...");
            postResult();
            //handle
        }
        // ,dataType: 'JSON'
    });
}

// $(document).ready(function () {
// })

function load_welcome() {
    $("#content").load("welcome.html");
}

function load_experiment() {
    $("#content").hide();
    $("#content").load("experiment.html");
}

function load_feedback() {
    $("#content").hide();
    $("#content").load("feedback.html");
}

function load_prequestions() {
    $("#content").hide();
    $("#content").load("prequestions.html");
}

function load_postquestions() {
    $("#content").hide();
    $("#content").load("postquestions.html");
}

function load_finish() {
    $("#content").hide();
    $("#content").load("finish.html");
}

function start_over() {
    location.reload();
}
