var express = require('express');
var router = express.Router();
let pool = require('../db/db');


function addExercise(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "INSERT INTO exercises (strExerciseName, intMuscleID, intExerciseTypeID, strDescription, recordTime, recordDistance, recordReps, recordWeight) "+
                "VALUES (?,?,?,?,?,?,?,?)";
      let values = [
        req.body.name,
        req.body.muscleID,
        req.body.exerciseTypeID,
        req.body.desc,
        req.body.recTime, 
        req.body.recDistance,
        req.body.recReps,
        req.body.recWeight
      ];
      
      connection.query(sql, values, function(err, result) {
        connection.release();
        if(!err) {
            console.log(result)
            res.json("Success")
        }
        console.log(err)

      });    
      connection.on('error', function(err){
        res.json({"code": 100, "status": "Error in database connection"});
      })
    })
}


function getExercises(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "SELECT * FROM exercises";
  
      connection.query(sql, function(err, rows) {
        connection.release();
        if(!err) {
          res.json(rows)
        }
      });    
      
      connection.on('error', function(err){
        res.json({"code": 100, "status": "Error in database connection"});
      })
    })
}

function getByMuscle(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "SELECT * FROM exercises WHERE intMuscleID = ?";
      let muscleID = req.query.muscleID;

      connection.query(sql, muscleID, function(err, rows) {
        connection.release();
        if(!err) {
          res.json(rows)
        }
      });    
      
      connection.on('error', function(err){
        res.json({"code": 100, "status": "Error in database connection"});
      })
    })
}


function getByMuscleGroup(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "SELECT e.* FROM exercises AS e "+
                "INNER JOIN muscles AS m ON e.intMuscleID = m.intMuscleID "+
                "INNER JOIN muscle_groups AS mg ON m.intMuscleGroupID = mg.intMuscleGroupID "+
                "WHERE mg.intMuscleGroupID = ?";
      let groupID = req.query.groupID;

      connection.query(sql, groupID, function(err, rows) {
        connection.release();
        if(!err) {
          res.json(rows)
        }
      });    
      
      connection.on('error', function(err){
        res.json({"code": 100, "status": "Error in database connection"});
      })
    })
}

function getByExerciseType(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "SELECT * FROM exercises WHERE intExerciseTypeID = ?";
      let exerciseTypeID = req.query.exerciseTypeID;

      connection.query(sql, exerciseTypeID, function(err, rows) {
        connection.release();
        if(!err) {
          res.json(rows)
        }
      });    
      
      connection.on('error', function(err){
        res.json({"code": 100, "status": "Error in database connection"});
      })
    })
}

function getByID(req,res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

    let sql = "SELECT * FROM exercises WHERE intExerciseID = ?";
    let exerciseID = req.query.ID;

    connection.query(sql, exerciseID, function(err, rows) {
      connection.release();
      if(!err) {
        res.json(rows)
      }
    });    
    
    connection.on('error', function(err){
      res.json({"code": 100, "status": "Error in database connection"});
    })
  })
}


router.post(('/add'), function(req, res){
    addExercise(req, res);
});

router.get(('/'), function(req, res) { 
    getExercises(req, res);
});

router.get(('/byMuscle'), function(req, res) { 
    getByMuscle(req, res);
});

router.get(('/byMuscleGroup'), function(req, res) { 
    getByMuscleGroup(req, res);
});

router.get(('/byExerciseType'), function(req, res) { 
    getByExerciseType(req, res);
});

router.get(('/byID'), function(req, res) { 
  getByID(req, res);
});

module.exports = router;
