var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', {title: 'Express'});
    res.render('tap_for_bpm', {title: 'EJS'});
});

/* POST to Add User Service */
router.post('/addresult', function (req, res) {
    var db = req.db;
    var bpm = req.body.bpm;
    var lat = req.body.lat;
    var long = req.body.long;
    var accuracy = req.body.accuracy;
    var userAgent = req.body.userAgent;
    var date = generateDate();
    var collection = db.get('xpresults');

    // Submit to the DB
    collection.insert({
        "bpm": bpm,
        "date": date,
        "lat": lat,
        "long": long,
        "accuracy": accuracy,
        "userAgent": userAgent
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        } else {
            // And forward to success page
            // res.send([{"message":"success!"}]);
            res.send("");
            // res.redirect("/");
        }
    });

});

function generateDate() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

// -------- NOT IN USE --------

// /* GET Userlist page. */
// router.get('/userlist', function(req, res) {
//     var db = req.db;
//     var collection = db.get('usercollection');
//     collection.find({},{},function(e,docs){
//         res.render('userlist', {
//             "userlist" : docs
//         });
//     });
// });
//
// /* GET New User page. */
// router.get('/newuser', function(req, res) {
//     res.render('newuser', { title: 'Add New User' });
// });
//
// /* POST to Add User Service */
// router.post('/adduser', function(req, res) {
//
//     // Set our internal DB variable
//     var db = req.db;
//
//     // Get our form values. These rely on the "name" attributes
//     var userName = req.body.username;
//     var userEmail = req.body.useremail;
//
//     // Set our collection
//     var collection = db.get('usercollection');
//
//     // Submit to the DB
//     collection.insert({
//         "username" : userName,
//         "email" : userEmail
//     }, function (err, doc) {
//         if (err) {
//             // If it failed, return error
//             res.send("There was a problem adding the information to the database.");
//         }
//         else {
//             // And forward to success page
//             res.redirect("userlist");
//         }
//     });
// });

module.exports = router;
