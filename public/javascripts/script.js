var count = 0;
var msecsFirst = 0;
var msecsPrevious = 0;
var alternate = false;
var lat = 0;
var long = 0;
var accuracy = 0;

function ResetCount() {
    count = 0;
    document.TAP_DISPLAY.T_AVG.value = "";
    document.TAP_DISPLAY.T_TAP.value = "";
    document.TAP_DISPLAY.T_RESET.blur();
}

function TapForBPM(e) {
    e.value
    document.TAP_DISPLAY.T_WAIT.blur();
    timeSeconds = new Date;
    msecs = timeSeconds.getTime();

    document.getElementById("key_pressed").innerHTML = String.fromCharCode(e.which)

    if (alternate) {
//                document.getElementById("dot1").src = "pulse1.gif"
//                document.getElementById("dot2").src = "pulse.gif"
        document.getElementById("dot1").style.visibility = "visible"
        document.getElementById("dot2").style.visibility = "hidden"
        alternate = false
    } else {
        document.getElementById("dot1").style.visibility = "hidden"
        document.getElementById("dot2").style.visibility = "visible"
        alternate = true
    }

    if ((msecs - msecsPrevious) > 1000 * document.TAP_DISPLAY.T_WAIT.value) {
        count = 0;
    }

    if (count == 0) {
        document.TAP_DISPLAY.T_AVG.value = "First Beat";
        document.TAP_DISPLAY.T_TAP.value = "First Beat";
        msecsFirst = msecs;
        count = 1;
    }
    else {
        bpmAvg = 60000 * count / (msecs - msecsFirst);
        document.TAP_DISPLAY.T_AVG.value = Math.round(bpmAvg * 100) / 100;
        document.TAP_DISPLAY.T_WHOLE.value = Math.round(bpmAvg);
        count++;
        document.TAP_DISPLAY.T_TAP.value = count;
    }
    msecsPrevious = msecs;
    return true;
}

document.onkeypress = TapForBPM;

function postResult() {
    if (bpmAvg < 1)
        return

    document.getElementById("submit_feedback").innerHTML = "sending...";
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
            document.getElementById("submit_feedback").innerHTML = "SUCCESS";
            // Clear the form inputs
//                    $('#addUser fieldset input').val('');
        } else {
            // If something goes wrong, alert the error message that our service returned
            document.getElementById("submit_feedback").innerHTML = "FAILURE: " + response.msg;
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
