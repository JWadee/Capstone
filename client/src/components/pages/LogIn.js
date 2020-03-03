import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button, Alert} from 'react-bootstrap'
const validator = require('validator');

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState();

    //function to check if email exists in database
    async function checkEmail(){
        //fetch user by email and store in response
        const response = await fetch('/account/byEmail?email='+email)
            .catch((error) => console.log(error))
        //wait for response and store json (if email exists response will = 1 if not then 0)
        const data = await response.json();   
        return data;      
    }

    async function loginAttempt(ID){
        //Request body
        const body = {
            ID: ID, 
            pass: pass
        }
        //URL
        let url = '/account/login';
        //Options
        const options = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=UTF-8'
            }, 
            body: JSON.stringify(body)
        }
        //call api
        const response = await fetch(url, options)
            .catch(error=>console.log(error))            
        const data = await response.json();
        return data;
 
    }

    //verify login data 
    async function verifyLogin(event){
        //prevent form from clearing 
        event.preventDefault();
        //if email input is not a valid email set error
        if(!validator.isEmail(email)|| pass.length < 8){
            setError(<Alert variant="danger">Invalid Email or Password.</Alert>)
        //if valid input, check for account
        }else{
            //function will get accountID or return 0 if none exists
            let ID = checkEmail();          
            //if no account exists, display error
            if(ID == 1){
                setError(<Alert variant="danger">Invalid Email or Password.</Alert>)
            //if account exists, attempt to login
            }else{
                //check login attempt 
                let login = loginAttempt(ID);
                //if login attempt failed, display error 
                if(login == 0){
                    setError(<Alert variant="danger">Invalid Email or Password.</Alert>)
                //else display success
                }else{
                    setError(<Alert variant="success">Successful Login</Alert>)
                }
            }

        }
    }
    
    return (
        <Jumbotron>
            <h2>Log In</h2><br />
            <hr></hr>
            <Form title="Log In" onSubmit={(e)=>verifyLogin(e)}> 
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}} >Email</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setEmail(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Password</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="password" onChange={e=> setPass(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Row>
                    <Col sm={{ span: 6, offset: 3  }}>
                        {error}
                    </Col>
                </Row>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button primary type="submit">Log In</Button>
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