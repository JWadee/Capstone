import React, {useState, useEffect} from "react";
import {Navbar, NavDropdown, Nav} from "react-bootstrap";
import TrainerClients from './trainerClients'
import NewClient from "./newClient";
import Schedule from "../schedule";
import { Calendar } from "@fullcalendar/core";


import CalendarComponent from '../calendar'
const TrainerPage = () => {
    const [display, setDisplay] = useState(null);
    

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Training</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Clients" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() =>setDisplay(<TrainerClients />)}>My Clients</NavDropdown.Item>
                            <NavDropdown.Item onClick={() =>setDisplay(<NewClient />)}>Add a Client</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Training" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() =>setDisplay()}>My Programs</NavDropdown.Item>
                            <NavDropdown.Item onClick={() =>setDisplay()}>Create a Program</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Schedule" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() =>setDisplay(<Schedule/>)}>My Schedule</NavDropdown.Item>
                            <NavDropdown.Item onClick={() =>setDisplay(<CalendarComponent/>)}>Calendar</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
            {display}
        </div>
    );
};

export default TrainerPage;