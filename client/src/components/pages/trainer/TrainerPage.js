import React, {useEffect, useState} from "react";
import {Navbar, NavDropdown, Nav} from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import {IoIosLogOut} from 'react-icons/io';
import history from '../../../utils/history';
//CSS
import '../../../css/trainerpage.css';

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
import About from '../About';
import Dashboard from './dashboard/Dashboard';


const TrainerPage = (props) => {

    //Run to check if user is logged in
    useEffect(() => {
        if(props.ID === null){
            history.push("/")
        }
    },[props])

    const Logout = ()=> {
        props.setAccountID(null);
        props.setAccountType(null);
    }

    return (
        <div>
            <Navbar className="trainerNav" expand="lg">
                <Navbar.Brand href="#home">Trace Fitness</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/trainer/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/trainer/about">About</Nav.Link>
                        <Nav.Link onClick={()=> Logout()}>Logout <IoIosLogOut /></Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
            <Switch>
                <Route path={"/trainer/about"} exact component={About} />
                <Route path={"/trainer/dashboard"} exact component={Dashboard}/>
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

  
const mapDispatchToProps = ( dispatch ) => {
    return{
      setAccountID: (ID) => { dispatch({type: 'SET_ACCOUNT_ID', ID: ID})},
      setAccountType: (accountType) => { dispatch({type: 'SET_TYPE', accountType: accountType})}
    }
}



export default  connect(mapStateToProps, mapDispatchToProps)(TrainerPage);