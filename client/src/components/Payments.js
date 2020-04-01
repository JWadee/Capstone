var express = require('express');
var router = express.Router();
let pool = require('../db/db');


function addPayment(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "INSERT INTO Payments (monAmount, intPaymentTypeID, intPaymentStatusID, strPaymentStatus) "+
                "VALUES (?,?,?,?)";

      let values =[

       req.body.Amount,
       req.body.PaymentTypeID,
       req.body.PaymentStatusID,
       req.body.DescPaymentStatus
      ];
      connection.query(sql, value, function(err, result) {
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


function getByUser(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
        let sql = "SELECT * FROM payments WHERE intAccountID = ?";
        let accountID = req.query.accountID;
  
      connection.query(sql, accountID,function(err, rows) {
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


function getPaymentTypes(req,res){
         pool.getConnection(function(err, connection){
        if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
        let sql = "SELECT * FROM payment_types";

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

function getPaymentStatuses(req,res){
          pool.getConnection(function(err, connection){
        if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
        let sql = "SELECT strPaymentStatus FROM payment_statuses";

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


function getByStatus(req,res){
          pool.getConnection(function(err, connection){
        if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);

        let sql = "SELECT * FROM payment_statuses WHERE intPaymentStatusID = ?";
        let paymentStatusID = req.query.paymentStatusID;

        connection.query(sql, paymentStatusID,  function(err, rows) {
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

function getByType(req,res){
          pool.getConnection(function(err, connection){
        if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);

        let sql = "SELECT * FROM payment_types WHERE intPaymentTypeID = ?";
        let paymentTypeID = req.query.paymentTypeID; 
        connection.query(sql, paymentTypeID, function(err, rows) {
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
    addPayment(req, res);
});

router.get(('/ByUser'), function(req, res) { 
    getByUser(req, res);
});

router.get(('/'), function(req, res) { 
  getPaymentTypes(req, res);
});

router.get(('/'), function(req, res) { 
  getPaymentStatuses(req, res);
});

router.get(('/ByStatus'), function(req, res) { 
  getByStatus(req, res);
});

router.get(('/ByType'), function(req, res) { 
  getByType(req, res);
});

module.exports = router;




