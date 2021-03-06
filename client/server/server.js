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
const workoutsRouter = require('./routes/workouts');
const workoutExercisesRouter = require('./routes/workoutExercises');
const workoutTypesRouter = require('./routes/workoutTypes');
const routinesRouter = require('./routes/routines');
const routineWorkoutsRouter = require('./routes/routineWorkouts');
const teamsRouter = require('./routes/teams');
const teamMembersRouter = require('./routes/teamMembers');
const teamTrainersRouter = require('./routes/teamTrainers');
const teamTypesRouter = require('./routes/teamTypes');
const trainerClientsRouter = require('./routes/trainerClients');
const sessionExercisesRouter = require('./routes/sessionExercises');
const sessionResultsRouter = require('./routes/sessionResults');
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
app.use('/routines', routinesRouter);
app.use('/routineWorkouts', routineWorkoutsRouter);
app.use('/sessionExercises', sessionExercisesRouter);
app.use('/sessionResults', sessionResultsRouter);
app.use('/sessions', sessionsRouter);
app.use('/teams', teamsRouter);
app.use('/teamMembers', teamMembersRouter);
app.use('/teamTrainers', teamTrainersRouter);
app.use('/teamTypes', teamTypesRouter);
app.use('/trainerClients', trainerClientsRouter);
app.use('/workouts', workoutsRouter);
app.use('/workoutExercises', workoutExercisesRouter);
app.use('/workoutTypes', workoutTypesRouter);

module.exports = app;