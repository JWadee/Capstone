import React, { useState, useEffect } from "react";
import { div, Form, Row, Col, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux';

const NewRoutine = (props) => {
    const [name, setName] = useState("");
    const [typeid, setTypeID] = useState(Number);
    const [types, setTypes] = useState([]);
    const [nameError, setNameError] = useState();
    const [submitError, setSubmitError] = useState();

    useEffect(() => {
        async function fetch_rtypes() {

            const response = await fetch("/routineTypes")
                .catch((error) => console.log(error))

            const data = await response.json();
            setTypes(data)
        }

        fetch_rtypes()

    }, [])

    function Submit(e) {
        e.preventDefault();

        let id = props.ID

        fetch('/routines/add', {
            method: 'POST',
            body: JSON.stringify({ name, typeid, id }),
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
                    Routine created successfully
                    </Alert>

            )

        })

        if (name.length <= 4) {
            setNameError(
                <Alert variant="danger">
                    Routine name must be more than 4 characters!
                    </Alert>

            )
        }
        else setNameError()


    }

    return (
        <div>
            <h2>Create a Routine</h2><br />
            <hr></hr>
            <Form title="Create a Routine" onSubmit={(e) => Submit(e)}>
                <Form.Group as={Row}>
                    <Form.Label column sm={{ span: 3, offset: 2 }} >Routine Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" placeholder="Enter routine name.." value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        {nameError}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{ span: 3, offset: 2 }}>Routine Type</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control as="select" onChange={(e) => setTypeID(e.target.value)}>
                            <option disabled hidden selected value={0}>Select Routine  </option>
                            {types.map((type) => {
                                return (
                                    <option key={type.intWorkoutTypeID} value={type.intRoutineTypeID}>{type.strRoutineType}</option>
                                    //<option key={type.intWorkoutTypeID} value={type.intWorkoutTypeID}>{type.strWorkoutType}</option>
                                )
                            })}
                        </Form.Control>

                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3 }}>
                        <Button type="submit" onClick={(e) => Submit(e)}>Add Routine</Button>
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

export default connect(mapStateToProps)(NewRoutine);