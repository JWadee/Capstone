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

    let accountSql = "INSERT INTO accounts (strFirstName, strLastName, strUsername, strEmail, intGenderID, intAccountStatusID) "+
              "VALUES (?,?,?,?,?,1)";

    let accountPassSql = "INSERT INTO accountpasswords (intAccountID, strPassword) "+
                         "VALUES (last_insert_id(), ?)";

    let accountValues = [
      req.body.firstname,
      req.body.lastname,
      req.body.username,
      req.body.email, 
      req.body.gender
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
          }
        })
      }
    });    
    
    connection.on('error', function(err){
      res.json({"code": 100, "status": "Error in database connection"});
    })
  })
}

function login(req, res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

    let sql = "SELECT strPassword FROM accountpasswords WHERE intAccountID = ? ";
    let ID = req.body.ID;
    
    connection.query(sql, ID, function(err, row) {
      connection.release();
      if(!err) {
        if(row[0].strPassword == req.body.pass){
          res.json = (1)
        }else(
          res.json = (0)
        )
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

    let sql = "SELECT COUNT(*) AS 'exists', intAccountID FROM accounts WHERE strEmail = ?"
    let email = req.query.email;
    connection.query(sql, email, function(err, row) {
      connection.release();
      if(!err) {
        if(row[0].exists == 0 ){
          res.json(row[0].exists)

        }else{
          res.json(row[0].intAccountID)
        }
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

    let sql = "SELECT COUNT(*) AS 'exists' FROM accounts WHERE strUsername = ?"
    let username = req.query.username;

    connection.query(sql, username, function(err, row) {
      connection.release();
      if(err){
        console.log(err)
      }else {
        res.json(row[0].exists)
      }
    });    
    
    connection.on('error', function(err){
      res.json({"code": 100, "status": "Error in database connection"});
    })
  })
}

router.post(('/create'), function(req){
  createAccount(req);
});

router.post(('/login')), function(req, res){
  login(req, res);
}

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
