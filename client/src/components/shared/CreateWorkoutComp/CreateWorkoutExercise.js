import React, { useState, useEffect } from "react";
import { div, Form, Row, Col, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

const CreateWorkoutExercise = (props) => {
    const [exerciseid, setExerciseID] = useState(Number);
    const [sets, setSets] = useState(Number);
    const [time, setTime] = useState();
    const [desc, setDesc] = useState("");
    const [types, setTypes] = useState([]);
    const [submitError, setSubmitError] = useState();
    const match = useRouteMatch();



    useEffect(() => {
        async function fetch_wtypes() {

            const response = await fetch("/exercises")
                .catch((error) => console.log(error))

            const data = await response.json();
            setTypes(data)
        }

        fetch_wtypes()

    }, [])



    function Submit(e) {
        e.preventDefault();


        const body = {
            workoutid: match.params.ID,
            exerciseid: exerciseid,
            time: time,
            sets: sets,
            desc: desc
        }

        fetch('/workoutExercises/add', {
            method: 'POST',
            body: JSON.stringify(body),
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
        <div className="component">
            <h2>Add Workout Exercise</h2>
            <Form title="Add Workout Exercise" onSubmit={(e) => Submit(e)}>
              
                <Form.Group as={Row} >
                    <Form.Label column sm={{ span: 3, offset: 2 }}>Exercise</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                            <Form.Control as="select" onChange={(e) => setExerciseID(e.target.value)}>
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
                    <Form.Label column sm={{ span: 3, offset: 2 }} >Target Time (minutes)</Form.Label>
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
                        <Form.Control as="textarea" rows="3" value={desc} onChange={(e) => setDesc(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3 }}>
                        <Button type="submit" onClick={(e) => Submit(e)}>Add Exercise</Button>
                        {submitError}
                    </Col>
                </Form.Group>
              
            </Form>

        </div>
    );

 };

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}

export default connect(mapStateToProps)(CreateWorkoutExercise);