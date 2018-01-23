var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', {title: 'Express'});
    res.render('main', {title: 'EJS'});
    //reset
    insertedDocId = "";
});

var insertedDocId = "";

router.post('/postemail', function (req, res) {
    var db = req.db;
    var collection = db.get('xpresults');
    collection.update({_id: insertedDocId},
        {
            $set:
                {
                    "email": req.body.email
                }
        }, function (err, docUpdated) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            } else {
                // And forward to success page
                // res.send([{"message":"success!"}]);
                res.send("")
            }
        });
});

router.post('/updateresult', function (req, res) {
    var db = req.db;
    var collection = db.get('xpresults');
    collection.update({_id: insertedDocId},
        {
            $set:
                {
                    "q1": req.body.q1,
                    "q2": req.body.q2,
                    "q3": req.body.q3,
                    "q4": req.body.q4,
                    "q5": req.body.q5,
                    "q6": req.body.q6,
                    "q7": req.body.q7
                }
        }, function (err, docUpdated) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            } else {
                // And forward to success page
                // res.send([{"message":"success!"}]);
                res.send("")
            }
        });
});

router.post('/addresult', function (req, res) {
    var db = req.db;
    var date = generateDate();
    var collection = db.get('xpresults');

    if (insertedDocId === "") {
        // Insert to the DB
        collection.insert({
            "tries": req.body.tries,
            "bpm": req.body.bpm,
            "cv": req.body.cv,
            "intervals": req.body.intervals,
            "date": date,
            "lat": req.body.lat,
            "long": req.body.long,
            "accuracy": req.body.accuracy,
            "userAgent": req.body.userAgent,
            "date_of_birth": req.body.date_of_birth,
            "gender": req.body.gender,
            "heritage": req.body.heritage,
            "city_size": req.body.city_size
        }, function (err, docInserted) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            } else {
                // And forward to success page
                // res.send([{"message":"success!"}]);
                console.log(docInserted);
                console.log(docInserted._id);
                insertedDocId = docInserted._id;
                res.send("")
            }
        });
    } else {
        //Update to the DB
        collection.update({_id: insertedDocId},
            {
                $set:
                    {
                        "tries": req.body.tries,
                        "bpm": req.body.bpm,
                        "cv": req.body.cv,
                        "intervals": req.body.intervals
                    }
            }, function (err, docUpdated) {
                if (err) {
                    // If it failed, return error
                    res.send("There was a problem adding the information to the database.");
                } else {
                    // And forward to success page
                    // res.send([{"message":"success!"}]);
                    res.send("")
                }
            });
    }
});

function generateDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
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
//         "emailAddress" : userEmail
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
