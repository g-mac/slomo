var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', {title: 'Express'});
    res.render('main', {title: 'EJS'});
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

router.post('/updateresult', function (req, res) {
    var db = req.db;
    var collection = db.get('xpresults');
    var insertedDocId = req.body.db_doc_id;
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
    // window.alert("/addresult");

    var db = req.db;
    var date = generateDate();
    var collection = db.get('xpresults');
    var insertedDocId = req.body.db_doc_id;

    if (insertedDocId === "") {
        // Insert to the DB
        collection.insert({
            "email": req.body.email,
            "date": date,
            "tries1": req.body.tries2,
            "tries2": req.body.tries,
            "cv1": req.body.cv2,
            "cv2": req.body.cv,
            "bpm1": req.body.bpm2,
            "bpm2": req.body.bpm,
            "intervals1": req.body.intervals2,
            "intervals2": req.body.intervals,
            "userAgent": req.body.userAgent,
            "pq0": req.body.pq0,
            "pq1": req.body.pq1,
            "pq2": req.body.pq2,
            "pq3": req.body.pq3,
            "pq4": req.body.pq4,
            "pq5": req.body.pq5,
            "pq6": req.body.pq6,
            "pq7": req.body.pq7,
            "pq8": req.body.pq8
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
                        "email": req.body.email,
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
