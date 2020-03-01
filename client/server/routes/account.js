var express = require('express');
var router = express.Router();
let pool = require('../db/db');

function createAccount(req, res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

<<<<<<< Updated upstream
    let accountSql = "INSERT INTO accounts (strFirstName, strLastName, strUsername, strEmail, intAccountStatusID) "+
              "VALUES (?,?,?,?,1)";
=======
    let accountSql = "INSERT INTO accounts (strFirstName, strLastName, strUsername, strEmail, intGenderID, intAccountStatusID) "+
              "VALUES (?,?,?,?,?,1)";
>>>>>>> Stashed changes

    let accountPassSql = "INSERT INTO accountpasswords (intAccountID, strPassword) "+
                         "VALUES (last_insert_id(), ?)";

    let accountValues = [
      req.body.firstname,
      req.body.lastname,
      req.body.username,
<<<<<<< Updated upstream
      req.body.email
=======
      req.body.email, 
      req.body.gender
>>>>>>> Stashed changes
    ];
    
    let pass = req.body.pass;

    connection.query(accountSql, accountValues, function(err, accRes) {
      if(err) {
        connection.release();
        console.log(err);
      }else{
        connection.query(accountPassSql, pass, function(err, accPassRes){
          if(err) {
            connection.release();
            console.log(err);
          }else{
            connection.release();
            res.json({
<<<<<<< Updated upstream
              accRes,
              accPassRes
=======
              accRes: accRes,
              accPassRes: accPassRes
>>>>>>> Stashed changes
            })
          }
        })
      }
    });    
    
    connection.on('error', function(err){
      res.json({"code": 100, "status": "Error in database connection"});
    })
  })
}

function getTypes(req,res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

    let sql = "SELECT * FROM accounttypes"

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

function getByEmail(req,res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

<<<<<<< Updated upstream
    let sql = "SELECT COUNT(*) FROM accounts WHERE strEmail = ?"
=======
    let sql = "SELECT COUNT(*) AS 'exists' FROM accounts WHERE strEmail = ?"
>>>>>>> Stashed changes
    let email = req.query.email;
    connection.query(sql, email, function(err, row) {
      connection.release();
      if(!err) {
<<<<<<< Updated upstream
        res.json(row)
=======
        res.json(row[0].exists)
>>>>>>> Stashed changes
      }
    });    
    
    connection.on('error', function(err){
      res.json({"code": 100, "status": "Error in database connection"});
    })
  })
}

function getByUsername(req,res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

<<<<<<< Updated upstream
    let sql = "SELECT COUNT(*) FROM accounts WHERE strUsername = ?"
    let email = req.query.username;

    connection.query(sql, function(err, row) {
      connection.release();
      if(!err) {
        res.json(row)
=======
    let sql = "SELECT COUNT(*) AS 'exists' FROM accounts WHERE strUsername = ?"
    let username = req.query.username;

    connection.query(sql, username, function(err, row) {
      connection.release();
      if(err){
        console.log(err)
      }else {
        res.json(row[0].exists)
>>>>>>> Stashed changes
      }
    });    
    
    connection.on('error', function(err){
      res.json({"code": 100, "status": "Error in database connection"});
    })
  })
}

router.post(('/create'), function(req, res){
    createAccount(req);
});

router.get('/types', function(req, res) { 
    getTypes(req, res);
});

router.get('/byEmail', function(req, res) { 
  getByEmail(req, res);
});

router.get('/byUsername', function(req, res) { 
  getByUsername(req, res);
});

module.exports = router;
