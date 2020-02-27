const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { join } = require("path");


//routes 
const accountRouter = require('./routes/account');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(express.static(join(__dirname, "build")));

//use routes 
app.use('/account', accountRouter);


module.exports = app;