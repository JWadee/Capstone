import React from "react";
import {Navbar, NavDropdown, Nav} from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';


//Components
import TrainerClients from './TrainerClients';
import NewClient from "./NewClient";
import ActiveSession from "../../shared/Session/ActiveSession";
import NewTeam from "./NewTeam";
import ClientPage from "../client/ClientPage";
import CreateExercise from '../../shared/CreateExerciseComp/CreateExercise';
import CreateSession from '../../shared/CreateSession/CreateSession';
import TrainerSessions from './TrainerSessions';
import RecordSessionWorkout from '../../shared/Session/RecordSession/RecordSessionWorkout';
import InProgressSession from '../../shared/Session/InProgressSessions';
import CreateWorkout from '../../shared/CreateWorkoutComp/CreateWorkout';
import TrainerWorkouts from './TrainerWorkouts';
import Workout from '../../shared/Workout';
import CreateWorkoutExercise from '../../shared/CreateWorkoutComp/CreateWorkoutExercise';
import ClientExerciseHistory from '../../pages/client/ClientExerciseHistory';
import NewRoutine from './NewRoutine';
import TrainerRoutines from './TrainerRoutines';
import Routine from "../../shared/Routine";
import AddWorkouttoRoutine from './AddWorkouttoRoutine';
import TrainerTeams from './TrainerTeams';
import Team from '../../shared/team/Team';
import AddClientNote from '../client/AddClientNote';
import AddTeamMember from '../../shared/team/AddTeamMember';
import AddTeamTrainer from '../../shared/team/AddTeamTrainer';

const TrainerPage = ({match}) => {

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Training</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Clients" id="basic-nav-dropdown">
                            <NavDropdown.Item href={match.url+"/my-clients"}>My Clients</NavDropdown.Item>
                            <NavDropdown.Item href={match.url+"/new-client"}>Add a Client</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Training" id="basic-nav-dropdown">
                            <NavDropdown.Item href={match.url+"/add-routine"}>Create a Routine</NavDropdown.Item>
                            <NavDropdown.Item href={match.url+"/add-workout"} >Create a Workout</NavDropdown.Item>
                            <NavDropdown.Item href={match.url+"/add-exercise"}>Add an Exercise</NavDropdown.Item>
                            <NavDropdown.Item href={match.url+"/my-workouts"} >My Workouts</NavDropdown.Item>
                            <NavDropdown.Item href={match.url+"/my-routines"} >My Routines</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Schedule" id="basic-nav-dropdown">
                            <NavDropdown.Item href={match.url+"/sessions"}>My Schedule</NavDropdown.Item>
                            <NavDropdown.Item href={match.url+"/sessions/in-progress"}>Sessions In Progress</NavDropdown.Item>
                            <NavDropdown.Item href={match.url+"/add-session"}>Add a Session</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Teams" id="basic-nav-dropdown">
                            <NavDropdown.Item href={match.url+"/new-team"}>Add a Team</NavDropdown.Item>
                            <NavDropdown.Item href={match.url+"/my-teams"}>My Teams</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
            <Switch>
                <Route path={"/trainer/new-client"} exact component={NewClient} />
                <Route path={"/trainer/my-clients"} exact component={TrainerClients} />
                <Route path={"/trainer/my-clients/client/:ID"} exact component={ClientPage}/>
                <Route path={"/trainer/my-clients/client/:ID/:TCID/add-note"} exact component={AddClientNote}/>
                <Route path={"/trainer/my-clients/client/:ID/exercise-history"} exact component={ClientExerciseHistory}/>
                <Route path={"/trainer/new-team"} exact component={NewTeam}/>
                <Route path={"/trainer/my-teams"} exact component={TrainerTeams}/>
                <Route path={"/trainer/my-teams/team/:ID"} exact component={Team}/>
                <Route path={"/trainer/my-teams/team/:ID/add-member"} exact component={AddTeamMember}/>
                <Route path={"/trainer/my-teams/team/:ID/add-trainer"} exact component={AddTeamTrainer}/>
                <Route path={"/trainer/add-exercise"} exact component={CreateExercise}/>
                <Route path={"/trainer/my-workouts"} exact component={TrainerWorkouts}/>
                <Route path={"/trainer/my-workouts/workout/:ID"} exact component={Workout}/>
                <Route path={"/trainer/my-workouts/workout/:ID/add-exercise"} exact component={CreateWorkoutExercise}/>
                <Route path={"/trainer/add-workout"} exact component={CreateWorkout}/>
                <Route path={"/trainer/add-session"} exact component={CreateSession}/>
                <Route path={"/trainer/add-routine"} exact component={NewRoutine}/>
                <Route path={"/trainer/my-routines"} exact component={TrainerRoutines}/>
                <Route path={"/trainer/my-routines/routine/:ID"} exact component={Routine}/>
                <Route path={"/trainer/my-routines/routine/:ID/add-workout"} exact component={AddWorkouttoRoutine}/>
                <Route path={"/trainer/sessions"} exact component={TrainerSessions}/>
                <Route path={"/trainer/sessions/in-progress/"} exact component={InProgressSession}/>
                <Route path={"/trainer/sessions/session/:ID"} exact component={ActiveSession}/>
                <Route path={"/trainer/sessions/session/:sessionid/record/workout/:workoutid"} exact component={RecordSessionWorkout}/>
            </Switch>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID,
        accountType: state.account.accountType
    }
}


export default  connect(mapStateToProps)(TrainerPage);