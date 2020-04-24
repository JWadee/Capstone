import React, { useState, useEffect } from "react";
import { div, Form, Row, Col, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux';

const CreateWorkout = (props) => {
    const [name, setName] = useState("");
    const [typeid, setTypeID] = useState(Number);
    const [types, setTypes] = useState([]);
    const [nameError, setNameError] = useState();
    const [submitError, setSubmitError] = useState();


    useEffect(() => {
        async function fetch_wtypes() {

            const response = await fetch("/workoutTypes")
                .catch((error) => console.log(error))

            const data = await response.json();
            setTypes(data)
        }

        fetch_wtypes()

    }, [])

    function Submit(e) {
        e.preventDefault();

        let ownerid = props.ID
        fetch('/workouts/add', {
            method: 'POST',
            body: JSON.stringify({ name, typeid, ownerid }),
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
                    Workout created successfully
                    </Alert>

            )

        })

        if (name.length <= 4) {
            setNameError(
                <Alert variant="danger">
                    Workout name must be more than 4 characters!
                </Alert>
            )
        }
        else setNameError()


    }

    return (
        <div className="component">
            <h2>Create a Workout</h2>
            <Form title="Create a Workout" onSubmit={(e) => Submit(e)}>
                <Form.Group as={Row}>
                    <Form.Label column sm={{ span: 3, offset: 2 }} >Workout Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" placeholder="Enter workout name.." value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        {nameError}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{ span: 3, offset: 2 }}>Workout Type</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control as="select" onChange={(e) => setTypeID(e.target.value)}>
                            <option disabled hidden selected value={0}>Select Workout Type </option>
                            {types.map((type) => {
                                return (
                                    <option key={type.intWorkoutTypeID} value={type.intWorkoutTypeID}>{type.strWorkoutType}</option>
                                )
                            })}
                        </Form.Control>

                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3 }}>
                        <Button type="submit" onClick={(e) => Submit(e)}>Add Workout</Button>
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

export default connect(mapStateToProps)(CreateWorkout);