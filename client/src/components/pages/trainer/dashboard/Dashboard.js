import React from 'react'
import {Row, Col, Card, Button, Navbar} from 'react-bootstrap'
import {IoIosContact} from 'react-icons/io';
import {AiOutlineSchedule} from 'react-icons/ai';
import {RiTeamLine} from 'react-icons/ri';
import {GiMuscleUp} from 'react-icons/gi';

const Dashboard = () => {

    return (
        <div>
            <Row> 
                <Col md={{span: 3}}>
                    <Card className="dashCard">
                        <Card.Header as="h5">Scheduling <AiOutlineSchedule /></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Button href={"/trainer/sessions"} variant="outline-primary">My Schedule</Button>
                            </Card.Text>
                            <Card.Text>
                                <Button href={"/trainer/sessions/in-progress/"} variant="outline-primary">Sessions in Progress</Button>
                            </Card.Text>
                            <Card.Text>
                                <Button href={"/trainer/add-session"} variant="outline-primary">Create a Session</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={{span: 3}}>
                    <Card className="dashCard">
                        <Card.Header as="h5">Clients <IoIosContact /></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Button  href={"/trainer/new-client"}  variant="outline-primary">Add a Client</Button>
                            </Card.Text>
                            <Card.Text>
                                <Button href={"/trainer/my-clients"}  variant="outline-primary">My Clients</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={{span: 3}}>
                    <Card className="dashCard">
                        <Card.Header as="h5">Teams <RiTeamLine /></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Button href={"/trainer/my-teams"} variant="outline-primary">My Teams</Button>
                            </Card.Text>
                            <Card.Text>
                                <Button href={"/trainer/new-team"} variant="outline-primary">Create a Team</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={{span: 3}}>
                    <Card className="dashCard">
                        <Card.Header as="h5">Training <GiMuscleUp /></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Button href={"/trainer/add-routine"} variant="outline-primary">Create a Routine</Button>
                            </Card.Text>
                            <Card.Text>
                                <Button href={"/trainer/add-workout"} variant="outline-primary">Create a Workout</Button>
                            </Card.Text>
                            <Card.Text>
                                <Button href={"/trainer/add-exercise"} variant="outline-primary">Create an Exercise</Button>
                            </Card.Text>
                            <Card.Text>
                                <Button href={"/trainer/my-workouts"} variant="outline-primary">My Workouts</Button>
                            </Card.Text>
                            <Card.Text>
                                <Button href={"/trainer/my-routines"} variant="outline-primary">My Routines</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )

}

export default Dashboard


