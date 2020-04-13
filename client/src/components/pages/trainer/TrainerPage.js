import React, {useState} from "react";
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
                            <NavDropdown.Item >My Routines</NavDropdown.Item>
                            <NavDropdown.Item >Create a Routine</NavDropdown.Item>
                            <NavDropdown.Item href={match.url+"/add-exercise"}>Add an Exercise</NavDropdown.Item>

                        </NavDropdown>
                        <NavDropdown title="Schedule" id="basic-nav-dropdown">
                            <NavDropdown.Item href={match.url+"/sessions"}>My Schedule</NavDropdown.Item>
                            <NavDropdown.Item href={match.url+"/sessions/in-progress"}>Sessions In Progress</NavDropdown.Item>
                            <NavDropdown.Item href={match.url+"/add-session"}>Add a Session</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Teams" id="basic-nav-dropdown">
                            <NavDropdown.Item href={match.url+"/new-team"}>Add a Team</NavDropdown.Item>
                            <NavDropdown.Item>My Teams</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
            <Switch>
                <Route path={"/trainer/new-client"} exact component={NewClient} />
                <Route path={"/trainer/my-clients"} exact component={TrainerClients} />
                <Route path={"/trainer/my-clients/client/:ID"} exact component={ClientPage}/>
                <Route path={"/trainer/new-team"} exact component={NewTeam}/>
                <Route path={"/trainer/add-exercise"} exact component={CreateExercise}/>
                <Route path={"/trainer/add-session"} exact component={CreateSession}/>
                <Route path={"/trainer/sessions"} exact component={TrainerSessions}/>
                <Route path={"/trainer/sessions/in-progress/"} exact component={InProgressSession}/>
                <Route path={"/trainer/sessions/session/:ID"} exact component={ActiveSession}/>
                <Route path={"/trainer/sessions/session/:sessionid/record/workout/:workoutid"} exact component={RecordSessionWorkout}/>
            </Switch>

            {/* {display} */}
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