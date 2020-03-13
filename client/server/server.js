const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { join } = require("path");


//routes 
const accountsRouter = require('./routes/accounts');
const exercisesRouter = require('./routes/exercises');
const exerciseTypesRouter = require('./routes/exerciseTypes');
const muscleGroupsRouter = require('./routes/muscleGroups');
const musclesRouter = require('./routes/muscles');

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
app.use('/accounts', accountsRouter);
app.use('/exercises', exercisesRouter);
app.use('/exerciseTypes', exerciseTypesRouter);
app.use('/muscleGroups', muscleGroupsRouter);
app.use('/muscles', musclesRouter);

module.exports = app;