import React, {useState, useEffect} from "react";
import { Jumbotron, Form, Row, Col, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux';

const NewTeam = (props) => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState();
    const [submitError, setSubmitError] = useState();


    function Submit(e) {
        e.preventDefault();
        if (name.length <= 4) {
            setNameError(
                <Alert variant="danger">
                    Routine name must be more than 4 characters!
                    </Alert>
            )
        }else{
            setNameError()
            let ownerid = props.ID

            fetch('/routines/add', {
                method: 'POST',
                 body: JSON.stringify({ name, ownerid }),
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
        } 

    
    }

    return (
        <Jumbotron>
            <h2>Create a Routine</h2><br />
            <hr></hr>
            <Form title="Create a Team" onSubmit={(e) => Submit(e)}> 
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}} >Routine Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        {nameError}
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button type="submit" onClick={(e) => Submit(e)}>Add Routine</Button>
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

export default connect(mapStateToProps)(NewTeam);