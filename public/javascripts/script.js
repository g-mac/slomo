// CONFIG

var duration = 15;
var min_taps = 8;
var min_tap_time = (1000 * 0.8 * duration);
var max_cv = 0.09875;
var cv_others = [0.0184, 0.0241, 0.0289, 0.0295, 0.0339, 0.0344, 0.0357, 0.0379, 0.0384, 0.0386, 0.0387, 0.0398, 0.0405, 0.0406, 0.0420, 0.0424, 0.0435, 0.0436, 0.0443, 0.0444, 0.0462, 0.0468, 0.0473, 0.0478, 0.0485, 0.0487, 0.0494, 0.0496, 0.0497, 0.0542, 0.0556, 0.0558, 0.0578, 0.0580, 0.0583, 0.0588, 0.0602, 0.0626, 0.0688, 0.0702, 0.0714, 0.0743, 0.0749, 0.0755, 0.0771, 0.0827, 0.0975];

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

var no_of_entries = "";
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

var db_doc_id = "";

function postEmailAddress() {

    if (emailAddress === "") return;

    var emailResult = {
        'email': emailAddress
    };

    $.ajax({
        type: 'POST',
        data: emailResult,
        url: "https://" + window.location.host + window.location.pathname + 'postemail',
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
        'db_doc_id': db_doc_id,
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
        url: "https://" + window.location.host + window.location.pathname + 'updateresult',
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
            result = result.concat(";");
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

    // console.log("intervals: " + intervals);
    // console.log("intervalsAsString: "+intervalsAsString);

    var newResult = {
        'db_doc_id': db_doc_id,
        'tries': experimentTries,
        'no_of_entries': no_of_entries,
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
        // url: window.location.pathname + '/addresult',
        url: "https://" + window.location.host + window.location.pathname + 'addresult',
        success: function (data) {
            db_doc_id = data.toString();
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
