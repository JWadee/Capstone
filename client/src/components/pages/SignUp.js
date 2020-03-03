import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button, Alert} from 'react-bootstrap'
const validator = require('validator');

const SignUp = () => {
    //State Variables for form
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [gender, setGender] = useState();
    const [usernameError, setUsernameError] = useState();
    const [emailError, setEmailError] = useState();

    //function to check if username exists in database
    async function checkUsername(){
        //fetch user by username and store in response
        const response = await fetch('/account/byUsername?username='+username)
            .catch((error) => console.log(error))
        //wait for response and store json (if username exists response will = 1 if not then 0)
        const data = await response.json();   
        return data;        
    }

    //function to check if email exists in database
    async function checkEmail(){
        //fetch user by email and store in response
        const response = await fetch('/account/byEmail?email='+email)
            .catch((error) => console.log(error))
        //wait for response and store json (if email exists response will = 1 if not then 0)
        const data = await response.json();   
        return data;      
    }
    
    //function to verify account data and submit
    async function verifyAndSubmit(event){
        //prevents page from reloading if username or email is taken
        event.preventDefault();

        //call functions to check for existing username and email
        let userAvail = await checkUsername();
        let emailAvail = await checkEmail();
        
        //If username is taken set error message (will display below input)
        if(userAvail == 1){
            setUsernameError(<Alert variant="danger">Username is already taken.</Alert>)
        }else{
            setUsernameError();
        }

        //If email is taken set error message (will display below input)
        if(emailAvail == 1){
            setEmailError(<Alert variant="danger">There is already an account associated with this email.</Alert>)
        }else{
            setEmailError();
        }

        //If both username and email are available call function to add user to database
        if(emailAvail < 1 && userAvail < 1){
            sendToDatabase();
        }
    }

    //function to add user to database
    function sendToDatabase(){
        //data for request body (uses the state variables from above AKA the form values)
        const data = {
            firstname: firstName,
            lastname: lastName,
            username: username,
            email: email, 
            gender: gender, 
            pass: pass
        }

        //api parameters to create account
        const url ='/account/create'
        const options = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=UTF-8'
            }, 
            body: JSON.stringify(data)
        }

        //call api
        fetch(url, options)
            .then(response=> {
                return response.json();
        }).catch(error=>console.log(error))
    }


    return (
        <Jumbotron>
            <h2>Create An Account</h2><br />
            <hr></hr>
            <Form title="Create An Account" onSubmit={(e)=>verifyAndSubmit(e)}> 
                <Form.Group as={Row}>
                    <Form.Label required column sm={{span:3, offset:2}} >First Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control required type="text" minLength="2" onChange={e=> setFirstName(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Last Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control required type="text" minLength="2" onChange={e=> setLastName(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Username</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control required type="text" minLength="2" onChange={e=> setUsername(e.target.value)} />
                        {/*usernameError will display error message if username exists*/}
                        {usernameError}
                    </Col>
                </Form.Group>
            
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Email Address</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control required type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={e=> setEmail(e.target.value)} />
                        {/*emailError will display error message if email exists*/}
                        {emailError}
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Password</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control title="Minimum: 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special" required type="password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" minLength="8" onChange={e=> setPass(e.target.value)} />
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