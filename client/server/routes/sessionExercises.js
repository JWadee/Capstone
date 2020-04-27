
var express = require('express');
var router = express.Router();
let pool = require('../db/db');


function addSessionExercises(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "INSERT INTO session_exercises (intSessionID, intAccountID, intWorkoutExerciseID) " +
            "VALUES (?, ?, ?)";
        let values = [req.body.sessionid, req.body.accountid, req.body.exerciseid];

        connection.query(sql, values, function (err, result) {
            connection.release();
            if (!err) {
                console.log(result)
                res.json("Success")
            }
            console.log(err)

        });
        connection.on('error', function (err) {
            res.json({ "code": 100, "status": "Error in database connection" });
        })
    })
}

function getSessionExercises(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "SELECT  se.intSessionExerciseID, e.strExerciseName, e.recordReps, e.recordWeight, e.recordTime, e.recordDistance, "+
                  "we.tmTargetTime, we.intTargetSets, strTargetDescription, e.intExerciseTypeID "+
                  "FROM session_exercises AS se "+
                  "INNER JOIN workout_exercises AS we ON we.intWorkoutExerciseID = se.intWorkoutExerciseID "+
                  "INNER JOIN exercises AS e ON e.intExerciseID = we.intExerciseID "+
                  "WHERE we.intWorkoutID= ? and se.intSessionID = ?"

        let values = [req.query.workoutid, req.query.sessionid];
        connection.query(sql, values, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows)
            }
        });

        connection.on('error', function (err) {
            res.json({ "code": 100, "status": "Error in database connection" });
        })
    })
}

router.post(('/add'), function (req, res) {
    addSessionExercises(req, res);
});

router.get(('/bySession'), function (req, res) {
    getSessionExercises(req, res);
});

module.exports = router;


