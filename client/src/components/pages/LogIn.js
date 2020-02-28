import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button} from 'react-bootstrap'

const LogIn = () => {
    const [lookup, setLookup] = useState('');
    const [pass, setPass] = useState('');


    
    return (
        <Jumbotron>
            <h2>Log In</h2><br />
            <hr></hr>
            <Form title="Log In"> 
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}} >Email or Username</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setLookup(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Password</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="password" onChange={e=> setPass(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button primary onClick={()=> alert("Signing In")} type="submit">Log In</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button href="/signup" variant="outline-primary">Or Sign Up</Button>
                     </Col>
                </Form.Group>
            </Form>
            
        </Jumbotron>
    );
};

export default LogIn;