// CONFIG

var duration = 15;
var min_taps = 8;
var min_tap_time = (1000 * 0.8 * duration);
var max_cv = 0.09875;
var cv_others = [0.0061, 0.0149, 0.0159, 0.0176, 0.0193, 0.0202, 0.0222, 0.0224, 0.0225, 0.0226, 0.0232, 0.0247, 0.0251, 0.0259, 0.0260, 0.0261, 0.0261, 0.0263, 0.0263, 0.0266, 0.0268, 0.0269, 0.0272, 0.0273, 0.0274, 0.0274, 0.0275, 0.0276, 0.0277, 0.0278, 0.0284, 0.0286, 0.0287, 0.0290, 0.0298, 0.0298, 0.0298, 0.0299, 0.0299, 0.0299, 0.0300, 0.0303, 0.0303, 0.0304, 0.0305, 0.0305, 0.0306, 0.0306, 0.0306, 0.0306, 0.0306, 0.0307, 0.0309, 0.0310, 0.0310, 0.0311, 0.0311, 0.0314, 0.0315, 0.0316, 0.0317, 0.0317, 0.0318, 0.0318, 0.0318, 0.0318, 0.0319, 0.0321, 0.0322, 0.0322, 0.0323, 0.0324, 0.0325, 0.0325, 0.0325, 0.0328, 0.0328, 0.0329, 0.0331, 0.0333, 0.0333, 0.0334, 0.0335, 0.0335, 0.0336, 0.0339, 0.0339, 0.0339, 0.0340, 0.0340, 0.0340, 0.0342, 0.0342, 0.0343, 0.0343, 0.0346, 0.0347, 0.0348, 0.0348, 0.0348, 0.0350, 0.0350, 0.0351, 0.0352, 0.0353, 0.0354, 0.0355, 0.0356, 0.0357, 0.0357, 0.0359, 0.0359, 0.0359, 0.0360, 0.0362, 0.0364, 0.0364, 0.0364, 0.0366, 0.0367, 0.0368, 0.0368, 0.0369, 0.0370, 0.0371, 0.0371, 0.0371, 0.0372, 0.0373, 0.0374, 0.0375, 0.0375, 0.0375, 0.0377, 0.0377, 0.0378, 0.0378, 0.0378, 0.0378, 0.0378, 0.0379, 0.0379, 0.0379, 0.0382, 0.0383, 0.0384, 0.0384, 0.0385, 0.0387, 0.0387, 0.0387, 0.0387, 0.0389, 0.0389, 0.0391, 0.0393, 0.0394, 0.0394, 0.0395, 0.0395, 0.0397, 0.0397, 0.0397, 0.0398, 0.0398, 0.0399, 0.0399, 0.0400, 0.0400, 0.0402, 0.0402, 0.0402, 0.0403, 0.0403, 0.0405, 0.0408, 0.0410, 0.0410, 0.0411, 0.0411, 0.0413, 0.0413, 0.0413, 0.0414, 0.0416, 0.0417, 0.0418, 0.0418, 0.0419, 0.0419, 0.0419, 0.0419, 0.0420, 0.0421, 0.0421, 0.0423, 0.0423, 0.0426, 0.0426, 0.0426, 0.0426, 0.0427, 0.0427, 0.0428, 0.0428, 0.0429, 0.0429, 0.0430, 0.0431, 0.0433, 0.0435, 0.0435, 0.0435, 0.0436, 0.0438, 0.0439, 0.0440, 0.0441, 0.0441, 0.0442, 0.0443, 0.0444, 0.0445, 0.0445, 0.0446, 0.0446, 0.0448, 0.0448, 0.0449, 0.0451, 0.0453, 0.0453, 0.0453, 0.0454, 0.0454, 0.0455, 0.0455, 0.0457, 0.0457, 0.0457, 0.0458, 0.0460, 0.0462, 0.0463, 0.0463, 0.0464, 0.0464, 0.0466, 0.0466, 0.0468, 0.0471, 0.0472, 0.0473, 0.0475, 0.0475, 0.0477, 0.0478, 0.0478, 0.0479, 0.0481, 0.0481, 0.0481, 0.0482, 0.0482, 0.0484, 0.0485, 0.0486, 0.0487, 0.0487, 0.0487, 0.0489, 0.0489, 0.0490, 0.0490, 0.0491, 0.0492, 0.0492, 0.0492, 0.0493, 0.0493, 0.0494, 0.0495, 0.0495, 0.0496, 0.0496, 0.0497, 0.0498, 0.0499, 0.0500, 0.0500, 0.0501, 0.0501, 0.0502, 0.0506, 0.0508, 0.0509, 0.0509, 0.0510, 0.0510, 0.0510, 0.0511, 0.0513, 0.0514, 0.0516, 0.0517, 0.0517, 0.0520, 0.0522, 0.0523, 0.0525, 0.0525, 0.0526, 0.0528, 0.0528, 0.0529, 0.0530, 0.0531, 0.0533, 0.0536, 0.0537, 0.0538, 0.0539, 0.0539, 0.0539, 0.0541, 0.0541, 0.0542, 0.0543, 0.0545, 0.0545, 0.0547, 0.0547, 0.0552, 0.0553, 0.0553, 0.0554, 0.0554, 0.0555, 0.0556, 0.0556, 0.0557, 0.0560, 0.0562, 0.0564, 0.0565, 0.0565, 0.0569, 0.0569, 0.0571, 0.0572, 0.0573, 0.0573, 0.0574, 0.0576, 0.0577, 0.0579, 0.0580, 0.0581, 0.0583, 0.0585, 0.0585, 0.0589, 0.0589, 0.0590, 0.0591, 0.0592, 0.0593, 0.0594, 0.0597, 0.0598, 0.0599, 0.0599, 0.0600, 0.0601, 0.0602, 0.0603, 0.0603, 0.0603, 0.0608, 0.0608, 0.0608, 0.0608, 0.0609, 0.0612, 0.0613, 0.0614, 0.0615, 0.0615, 0.0616, 0.0617, 0.0618, 0.0619, 0.0619, 0.0622, 0.0623, 0.0624, 0.0624, 0.0624, 0.0625, 0.0626, 0.0626, 0.0626, 0.0627, 0.0627, 0.0636, 0.0637, 0.0638, 0.0640, 0.0640, 0.0642, 0.0643, 0.0644, 0.0646, 0.0647, 0.0647, 0.0648, 0.0649, 0.0651, 0.0652, 0.0655, 0.0657, 0.0657, 0.0660, 0.0660, 0.0662, 0.0664, 0.0666, 0.0667, 0.0668, 0.0668, 0.0669, 0.0671, 0.0673, 0.0676, 0.0679, 0.0680, 0.0681, 0.0681, 0.0683, 0.0686, 0.0688, 0.0689, 0.0689, 0.0690, 0.0692, 0.0693, 0.0697, 0.0702, 0.0705, 0.0708, 0.0710, 0.0717, 0.0720, 0.0722, 0.0723, 0.0724, 0.0726, 0.0728, 0.0728, 0.0729, 0.0730, 0.0730, 0.0731, 0.0735, 0.0736, 0.0741, 0.0742, 0.0744, 0.0744, 0.0754, 0.0755, 0.0755, 0.0758, 0.0759, 0.0762, 0.0762, 0.0766, 0.0768, 0.0771, 0.0775, 0.0777, 0.0779, 0.0783, 0.0792, 0.0796, 0.0798, 0.0812, 0.0812, 0.0815, 0.0815, 0.0818, 0.0821, 0.0823, 0.0827, 0.0830, 0.0831, 0.0839, 0.0842, 0.0843, 0.0844, 0.0849, 0.0849, 0.0861, 0.0864, 0.0867, 0.0877, 0.0877, 0.0878, 0.0879, 0.0895, 0.0904, 0.0905, 0.0905, 0.0927, 0.0931, 0.0945, 0.0955, 0.0959, 0.0960, 0.0968, 0.0969, 0.0974, 0.0977, 0.0982, 0.0987];

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
var phrase = "";

var db_doc_id = "";

function checkPhrase(phrase_input) {

    $.ajax({
        type: 'GET',
        url: "https://" + window.location.host + window.location.pathname + 'phrases',
        success: function (data) {
            console.log(data);
            ismatch = false
            for (entry in data) {
                console.log(data[entry].phrase);
                if (data[entry].phrase === phrase_input) {
                    ismatch = true;
                    break
                }
            }
            if (ismatch) {
                window.alert("phrase matched succesfully");
                load_experiment();
            } else {
                window.alert("coudlnt match phrase");
            }
        },
        error: function () {
            window.alert("Connection failed, please click ok to try again...");
        }
    });
}


function postPhrase() {

    if (phrase === "") return;

    var phraseResult = {
        'phrase': phrase
    };

    $.ajax({
        type: 'POST',
        data: phraseResult,
        url: "https://" + window.location.host + window.location.pathname.replace('onboarding', '') + 'postphrase',
        success: function (data) {
            submitPhraseSuccess();
        },
        error: function () {
            window.alert("Connection failed, please click ok to try again...");
        }
    });
}

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

function load_onboarding() {
    $("#content").load("onboarding.html");
}

function load_welcome() {
    $("#content").hide();
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
