import React, { useState, useEffect } from "react";
import { Jumbotron, Form, Row, Col, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux';
import DateAndTime from "../CreateSession/DateAndTime";

const CreateWorkoutExercise = (props) => {
    const [workoutid, setWorkoutID] = useState(Number);
    const [exerciseid, setExerciseID] = useState(Number);
    const [sets, setSets] = useState(Number);
    const [time, setTime] = useState();
    const [desc, setDesc] = useState("");
    const [typeid, setTypeID] = useState(Number);
    const [types, setTypes] = useState([]);
    const [setsError, setSetsError] = useState();
    const [submitError, setSubmitError] = useState();


    useEffect(() => {
        async function fetch_wtypes() {

            const response = await fetch("/workoutExercises")
                .catch((error) => console.log(error))

            const data = await response.json();
            setTypes(data)
        }

        fetch_wtypes()

    }, [])

    function Submit(e) {
        e.preventDefault();

        let id = props.ID

        fetch('/workoutExercises/add', {
            method: 'POST',
            body: JSON.stringify({ workoutid, exerciseid, time, sets, desc }),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },

        }).then(
            (response) => (response.json())
        ).then((response) => {
            if (response.status === 'failed') {
                setSubmitError(
                    <Alert variant="danger">
                        Something went wrong on our end
                        </Alert>
                )
            }
            else setSubmitError(
                <Alert variant="success">
                    Workout Exercise added successfully
                    </Alert>

            )

        })


        }


    

    return (
        <Jumbotron>
            <h2>Add Workout Exercise</h2><br />
            <hr></hr>
            <Form title="Add Workout Exercise" onSubmit={(e) => Submit(e)}>
              
                <Form.Group as={Row} >
                    <Form.Label column sm={{ span: 3, offset: 2 }}>Exercise</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                            <Form.Control as="select" onChange={(e) => setTypeID(e.target.value)}>
                            <option disabled hidden selected value={0}>Select Exercise</option>
                            {types.map((type) => {
                                return (
                                    <option key={type.intExerciseID} value={type.intExerciseID}>{type.strExerciseName}</option>
                                )
                            })}
                        </Form.Control>

                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={{ span: 3, offset: 2 }} >Target Time</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" value={time} onChange={(e) => setTime(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>


                <Form.Group as={Row}>
                    <Form.Label column sm={{ span: 3, offset: 2 }} >Number of Sets</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" value={sets} onChange={(e) => setSets(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>


                <Form.Group as={Row}>
                    <Form.Label column sm={{ span: 3, offset: 2 }} >Description</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" value={desc} onChange={(e) => setDesc(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3 }}>
                        <Button type="submit" onClick={(e) => Submit(e)}>Add Workout</Button>
                        {submitError}
                    </Col>
                </Form.Group>
              
            </Form>

        </Jumbotron>
    );

 };

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}

export default connect(mapStateToProps)(CreateWorkoutExercise);