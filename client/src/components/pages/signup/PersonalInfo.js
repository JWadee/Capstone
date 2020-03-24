import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button, Alert} from 'react-bootstrap'
const validator = require('validator');

const SignUp = (props) => {
    const [disabled, setDisabled] = useState(true);
    const [firstNameError, setFirstNameError] = useState();
    const [lastNameError, setLastNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [passError, setPassError] = useState();

    const values = props.values;

    const saveAndContinue = (e) => {
        e.preventDefault()

        let verified = verify();

        if(verified === true){
            props.nextStep()
        }   
    }

    const back = (e) => {
        e.preventDefault()
        props.prevStep()
    }

    //function to check if email exists in database
    async function checkEmail(){
        //fetch user by email and store in response
        const response = await fetch('/account/byEmail?email='+values.email)
            .catch((error) => console.log(error))
        //wait for response and store json (if email exists response will = 1 if not then 0)
        const data = await response.json();   
        return data;      
    }

    const verify = () => {
        let fnameCheck = false;
        let lnameCheck = false; 
        let emailCheck = false;
        let passCheck = false; 
        let emailAvail = checkEmail();

        if(validator.isEmail(values.email) === false){
            setEmailError(<Alert variant="danger">Please enter a valid email address.</Alert>)
        }else if(emailAvail === 1){
            setEmailError(<Alert variant="danger">There is already an account with this email.</Alert>)
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
        <form>
            <table> 
                <tbody> 
                    <tr> 
                        <td> 
                            <label>First Name:</label>
                        </td>
                        <td>
                            <input type="text" onChange={props.handleChange('firstName')} value={values.firstName} />
                            {firstNameError}
                        </td>
                    </tr>
                    <tr> 
                        <td> 
                            <label>Last Name:</label>
                        </td>
                        <td>
                            <input type="text" onChange={props.handleChange('lastName')} value={values.lastName} />
                            {lastNameError}
                        </td>
                    </tr>  
                    <tr> 
                        <td> 
                            <label>Email:</label>
                        </td>
                        <td>
                            <input type="email" onChange={props.handleChange('email')} value={values.email} />
                            {emailError}
                        </td>
                    </tr>  
                </tbody>
                <tr> 
                        <td> 
                            <label>Password:</label>
                        </td>
                        <td>
                            <input type="password" onChange={props.handleChange('pass')} value={values.pass} />
                            {passError}
                        </td>
                    </tr>  
                    <tr>       
                        <td> 
                            <button onClick={(e)=> back(e)}>Back</button>
                        </td>              
                        <td> 
                            <button disabled={disabled} onClick={(e)=> saveAndContinue(e)}>Save and Continue</button>
                        </td>
                    </tr>    
            </table>

        </form>
    );
};

export default SignUp;