var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    // var db = req.db;
    // var collection = db.get('studyphrases');
    // collection.find({}, function (err, doc) {
    //     /* doc is the result available here */
    //     res.setHeader('Content-Type', 'application/json');
    //     res.render('main', {onboarding: 'false', doc: doc.toString()});
    // });
    res.render('main', {onboarding: 'false'});
});

router.get('/onboarding', function (req, res, next) {
    res.render('main', {onboarding: 'true'});
});

router.get('/xpresults', function (req, res, next) {
    var db = req.db;
    var collection = db.get('xpresults');
    collection.find({}, function (err, doc) {
        /* doc is the result available here */
        res.setHeader('Content-Type', 'application/json');
        res.send(doc);
        // res.send(JSON.stringify({ a: 1 }, null, 3));
    });
});

router.get('/emails', function (req, res, next) {
    var db = req.db;
    var collection = db.get('emails');
    collection.find({}, function (err, doc) {
        /* doc is the result available here */
        res.setHeader('Content-Type', 'application/json');
        res.send(doc);
        // res.send(JSON.stringify({ a: 1 }, null, 3));
    });
});

router.post('/postemail', function (req, res) {
    var db = req.db;
    var collection = db.get('emails');
    collection.insert({
        "email": req.body.email
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

router.get('/phrases', function (req, res, next) {
    var db = req.db;
    var collection = db.get('studyphrases');
    collection.find({}, function (err, doc) {
        /* doc is the result available here */
        res.setHeader('Content-Type', 'application/json');
        res.send(doc);
        // res.send(JSON.stringify({ a: 1 }, null, 3));
    });
});

router.post('/postphrase', function (req, res) {
    var db = req.db;
    var collection = db.get('studyphrases');
    collection.insert({
        "phrase": req.body.phrase
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
    var insertedDocId = req.body.db_doc_id;
    collection.update({_id: insertedDocId},
        {
            $set:
                {
                    'qA_q0_answer': req.body.qA_q0_answer,
                    'qA_q1_answer': req.body.qA_q1_answer,
                    'qA_q2_answer': req.body.qA_q2_answer,
                    'qB_q0_answer': req.body.qB_q0_answer,
                    'qB_q1_answer': req.body.qB_q1_answer,
                    'qB_q2_answer': req.body.qB_q2_answer,
                    'qB_q3_answer': req.body.qB_q3_answer,
                    'qB_q4_answer': req.body.qB_q4_answer,
                    'qB_q5_answer': req.body.qB_q5_answer,
                    'qB_q6_answer': req.body.qB_q6_answer,
                    'qB_q7_answer': req.body.qB_q7_answer,
                    'experimentDuration': req.body.experimentDuration
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
    // window.alert("/addresult");

    var db = req.db;
    var date = generateDate();
    var collection = db.get('xpresults');
    var insertedDocId = req.body.db_doc_id;

    if (insertedDocId === "") {
        // Insert to the DB
        collection.insert({
            "userID": req.body.userID,
            "date": date,
            "tries": req.body.tries,
            "bpm": req.body.bpm,
            "cv": req.body.cv,
            "intervals": req.body.intervals,
            "userAgent": req.body.userAgent,
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
                res.send(insertedDocId);
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
                    res.send(insertedDocId);
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
