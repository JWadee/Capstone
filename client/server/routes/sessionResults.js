
var express = require('express');
var router = express.Router();
let pool = require('../db/db');


function addSessionResults(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "INSERT INTO session_exercise_results (intSessionExerciseID, decWeight, intReps, tmTimeElapsed, decDistance) " +
            "VALUES (?, ?, ?, ?, ?)";
        let values = [req.body.exerciseid, req.body.weight, req.body.reps, req.body.time, req.body.distance];

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

function getBySessionExercise(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "SELECT * FROM session_exercise_results WHERE intSessionExerciseID = ?";
        let id = req.query.exerciseid; 

        connection.query(sql, id, function (err, rows) {
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

function getByClientByExercise(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "SELECT s.dtmDate, s.intSessionID, ser.* FROM sessions AS s "+
                  "INNER JOIN session_exercises AS se ON s.intSessionID = se.intSessionID "+
                  "INNER JOIN session_exercise_results AS ser ON se.intSessionExerciseID = ser.intSessionExerciseID "+
                  "INNER JOIN workout_exercises AS we ON we.intWorkoutExerciseID = se.intWorkoutExerciseID "+
                  "INNER JOIN exercises AS e on e.intExerciseID = we.intExerciseID "+
                  "WHERE s.intClientID = ? AND e.intExerciseID = ? "+
                  "ORDER BY s.dtmDate ASC";

        let values  = [req.query.clientid, req.query.exerciseid]; 

        connection.query(sql, values, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows)
            }else console.log(err)
        });

        connection.on('error', function (err) {
            res.json({ "code": 100, "status": "Error in database connection" });
        })
    })
}

router.post(('/add'), function (req, res) {
    console.log('here')
    addSessionResults(req, res);
});

router.get(('/byExercise'), function (req, res) {
    getBySessionExercise(req, res);
});

router.get(('/byClient/byExercise'), function (req, res) {
    getByClientByExercise(req, res);
});

module.exports = router;



