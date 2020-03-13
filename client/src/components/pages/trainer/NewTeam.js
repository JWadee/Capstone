import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button, Alert} from 'react-bootstrap'

const NewTeam = () => {
    
    return (
        <Jumbotron>
            <h2>Create a Team</h2><br />
            <hr></hr>
            <Form title="Create a Team"> 
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}} >Team Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text"></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Team Type</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <select>
                            <option>Basketball</option>
                            <option>Football</option>
                            <option>Soccer</option>
                        </select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button type="submit">Add Team</Button>
                    </Col>
                </Form.Group>
            </Form>
            
        </Jumbotron>
    );
};

export default NewTeam;