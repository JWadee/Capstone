import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button, Alert} from 'react-bootstrap'

const NewTeam = () => {
    const [mainDisp, setMainDisp] = useState()
    const [name, setName] = useState("");
    const [typeid, setTypeID] = useState(Number);
    const [types, setTypes] = useState([]);
    const [nameError, setNameError] = useState();


    useEffect(() => {
        async function fetch_ttypes() {

            const response = await fetch("/teamTypes")
                .catch((error) => console.log(error))

            const data = await response.json();
            setTypes(data)
        }

        fetch_ttypes()

    }, [])

    function Submit(e) {
        e.preventDefault();

        fetch('/teams/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }, 
            body: JSON.stringify({ name, typeid }),

        })


        if (name.length <= 4) {
            setNameError(
                <Alert variant="danger">
                    Team name must be more than 4 characters!
                    </Alert>

            )
        }
        else setNameError()

    
    }

    return (
        <Jumbotron>
            <h2>Create a Team</h2><br />
            <hr></hr>
            <Form title="Create a Team" onSubmit={(e) => Submit(e)}> 
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}} >Team Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        {nameError}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Team Type</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <select onChange={(e) => setTypeID(e.target.value)}>
                            <option disabled hidden selected value={0}>Select Team Type </option>
                            {types.map((type) => {
                                return(
                                    <option key={type.intTeamTypeID} value={type.intTeamTypeID}>{type.strTeamType}</option>
                                    )
                            })}
                        </select>

                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button type="submit" onClick={(e) => Submit(e)}>Add Team</Button>

                    </Col>
                </Form.Group>
            </Form>
            
        </Jumbotron>
    );
};

export default NewTeam;