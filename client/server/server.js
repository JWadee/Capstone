const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { join } = require("path");


//routes 
const accountsRouter = require('./routes/accounts');
const bodyTypesRouter = require('./routes/bodyTypes');
const exercisesRouter = require('./routes/exercises');
const exerciseTypesRouter = require('./routes/exerciseTypes');
const gendersRouter = require('./routes/genders');
const musclesRouter = require('./routes/muscles');
const muscleGroupsRouter = require('./routes/muscleGroups');
const racesRouter = require('./routes/races');
const sessionsRouter = require('./routes/sessions');

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
app.use('/bodyTypes', bodyTypesRouter);
app.use('/exercises', exercisesRouter);
app.use('/exerciseTypes', exerciseTypesRouter);
app.use('/genders', gendersRouter);
app.use('/muscles', musclesRouter);
app.use('/muscleGroups', muscleGroupsRouter);
app.use('/races', racesRouter);
app.use('/sessions', sessionsRouter);

module.exports = app;