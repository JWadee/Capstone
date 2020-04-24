import React, {useState, useEffect} from "react";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap'
const validator = require('validator');

const SignUp = (props) => {
    const [disabled, setDisabled] = useState(true);
    const [firstNameError, setFirstNameError] = useState();
    const [lastNameError, setLastNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [passError, setPassError] = useState();

    const values = props.values;

    const saveAndContinue = async (e) => {
        e.preventDefault()

        let verified = await verify();

        if(verified === true){
            props.nextStep()
        }   
    }

    const back = (e) => {
        e.preventDefault()
        props.prevStep()
    }

    //function to check if email exists in database
    const checkEmail = async() => {
        //fetch user by email and store in response
        const response = await fetch('/accounts/byEmail?email='+values.email)
        //wait for response and store json (if email exists response will = 1 if not then 0)
        const data = await response.json();   
        return data.ID;      
    }

    const verify = async () => {
        let fnameCheck = false;
        let lnameCheck = false; 
        let emailCheck = false;
        let passCheck = false; 
        let existingID = await checkEmail();

        if(validator.isEmail(values.email) === false){
            setEmailError(<Alert variant="danger">Please enter a valid email address.</Alert>)
            emailCheck = false;
        }else if(existingID > 0){
            setEmailError(<Alert variant="danger">There is already an account with this email.</Alert>)
            emailCheck = false
        }else{
            setEmailError();
            emailCheck = true;
        } 

        if(values.firstName.length < 2){
            setFirstNameError(<Alert variant="danger">Enter a valid first name.</Alert>)
        }else{
            setFirstNameError();
            fnameCheck = true;
        }

        if(values.lastName.length < 2){
            setLastNameError(<Alert variant="danger">Enter a valid last name.</Alert>)
        }else{ 
            setLastNameError();
            lnameCheck = true; 
        }
        if(values.pass.length < 8){
            setPassError(<Alert variant="danger">Password must be at least 8 characters.</Alert>)
        }else{
            setPassError();
            passCheck = true;
        }

        if(emailCheck === true && lnameCheck === true && fnameCheck === true && passCheck === true){
            return true;
        }else return false;
    }

    /* Run anytime values prop changes
    Check that fields are not empty*/
    useEffect(()=> {
        if(values.firstName.length  < 1 || values.lastName.length < 1 || values.email.length < 1 || values.pass.length < 1
            ){
            setDisabled(true);
        }else setDisabled(false);
    },[values]) 


    return(
        <div>
            <h2>Personal Information</h2><br />
            <hr></hr>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>First Name:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={props.handleChange('firstName')} value={values.firstName} />
                        {firstNameError}
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Last Name:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={props.handleChange('lastName')} value={values.lastName} />
                        {lastNameError}
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Email:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="email" onChange={props.handleChange('email')} value={values.email} />
                        {emailError}
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Password:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="password" onChange={props.handleChange('pass')} value={values.pass} />
                        {passError}
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 3, offset: 3  }}>
                        <Button onClick={(e)=> back(e)}>Back</Button>
                    </Col>
                    <Col sm={{ span: 3  }}>
                        <Button disabled={disabled} onClick={(e)=> saveAndContinue(e)}>Save and Continue</Button>
                    </Col>
                </Form.Group>     
            </Form>
        </div>
    );
};

export default SignUp;