import React, {useState} from "react";
import {Navbar, NavDropdown, Nav} from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';


//Components
import TrainerClients from './TrainerClients'
import NewClient from "./NewClient";
import Schedule from "../../Schedule";
import CalendarComponent from '../../Calendar'
import NewTeam from "./NewTeam";
import ClientPage from "../client/ClientPage";
import CreateExercise from '../../shared/CreateExerciseComp/CreateExercise';
import CreateSession from '../../shared/CreateSession/CreateSession';

const TrainerPage = () => {
    const match = useRouteMatch();

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
                            <NavDropdown.Item >My Schedule</NavDropdown.Item>
                            <NavDropdown.Item >Calendar</NavDropdown.Item>
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
                <Route path={match.url + "/new-client"} exact component={NewClient} />
                <Route path={match.url + "/my-clients"} exact component={TrainerClients} />
                <Route path={match.url+ "/my-clients/client/ID=:ID"} exact component={ClientPage}/>
                <Route path={match.url+ "/new-team"} exact component={NewTeam}/>
                <Route path={match.url+ "/add-exercise"} exact component={CreateExercise}/>
                <Route path={match.url+ "/add-session"} exact component={CreateSession}/>
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