import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button} from 'react-bootstrap'
const validator = require('validator');

const SignUp = () => {
    //State Variables for form
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [gender, setGender] = useState();
    const [submit, setSubmit] = useState(false);
    const [userExists, setUserExists] = useState();
    
    async function checkForUsername(){
        //fetch user by username and store in response
        const response = await fetch('account/byUsername')
            .catch((error) => console.log(error))
        //wait for response and store json   
        const data = await response.json();    
        console.log(data);
         
    }
    
    
    return (
        <Jumbotron>
            <h2>Create An Account</h2><br />
            <hr></hr>
            <Form title="Create An Account" onSubmit={()=>checkForUsername()}> 
                <Form.Group as={Row}>
                    <Form.Label required column sm={{span:3, offset:2}} >First Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control required type="text" minlength="2" onChange={e=> setFirstName(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Last Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control required type="text" minlength="2" onChange={e=> setLastName(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Username</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control required type="text" minlength="2" onChange={e=> setUsername(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                {userExists}
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Email Address</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control required type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={e=> setEmail(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Password</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control title="Minimum: 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special" required type="password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" minlength="8" onChange={e=> setPass(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Form.Check 
                            inline
                            type="radio"
                            required
                            label="Male"
                            name="gender"
                            value="1"
                            onChange={(e)=>setGender(e.target.value)}
                        />
                        <Form.Check 
                            inline
                            type="radio"
                            label="Female"
                            name="gender"
                            value="2"
                            onChange={(e)=>setGender(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button variant="primary" type="submit">Create Account</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                    <Button href="/login" variant="outline-primary">Or Log In</Button>
                     </Col>
                </Form.Group>
            </Form>
            
        </Jumbotron>
    );
};

export default SignUp;