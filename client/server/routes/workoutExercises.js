var express = require('express');
var router = express.Router();
let pool = require('../db/db');


function addWorkoutExercise(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "INSERT INTO workout_exercises (intWorkoutID, intExerciseID, tmTargetTime, intTargetSets, strTargetDescription) " +
            "VALUES (?, ?, ?, ?, ?)";
        let values = [req.body.workoutid, req.body.exerciseid, req.body.time, req.body.sets, req.body.desc];

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

function getByWorkout(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "SELECT * FROM workout_exercises AS we " +
                  "INNER JOIN exercises AS e ON we.intExerciseID = e.intExerciseID WHERE intWorkoutID = ?";
        let id = req.query.ID;

        connection.query(sql, id, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows)
            }else(console.log(err))
        });

        connection.on('error', function (err) {
            res.json({ "code": 100, "status": "Error in database connection" });
        })
    })
}

router.post(('/add'), function (req, res) {
    addWorkoutExercise(req, res);
});

router.get(('/byWorkout'), function (req, res) {
    getByWorkout(req, res);
});

module.exports = router;