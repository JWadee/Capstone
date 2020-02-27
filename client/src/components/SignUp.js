import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button} from 'react-bootstrap'

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [username, setUsername] = useState();
    const [display, setDisplay] = useState();

    
    return (
        <Jumbotron>
            <h2>Create An Account</h2><br />
            <hr></hr>
            <Form title="Create An Account"> 
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}} >First Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setFirstName(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Last Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setLastName(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Username</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setUsername(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}} >Email Address</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="email" onChange={e=> setEmail(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Phone Number</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setPhoneNumber(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <span className="Gender">
                            <label>
                                <input type="radio" value="1" checked={true} />Male
                            </label>
                        </span>
                        <span className="Gender">
                            <label>
                                <input type="radio" value="2" />Female
                            </label>
                        </span>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button onClick={()=> alert("Creating Account")} type="submit">Create Account</Button>
                    </Col>
                </Form.Group>
            </Form>
            
        </Jumbotron>
    );
};

export default SignUp;