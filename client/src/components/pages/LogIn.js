import React, {useState, useEffect} from "react";
import {div, Form, Row, Col, Button, Alert} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

const validator = require('validator');

const LogIn = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [res, setRes] = useState();
    const [ID, setID] = useState();
    const [attempt, setAttempt] = useState();
    const history = useHistory();

    /* LOGIN 

        checkEmail 
        1. GET byEmail request
        2. setID(response.json)

        loginAttempt
        1. POST login request
        2. setAttempt(response.json)

        On submit
        1. if email is not valid || pass.length < 8 setRes(wrong email or pass)
        1. if ID < 1 CALL checkEmail();
        2. else if ID > 0 CALL loginAttempt

        useEffect [ID]
        1. CALL loginAttempt()

        useEffect [attempt]
        1. if attempt == 1 THEN setRes(success)
        2. else if attemp == 0 THEN setRes(wrong email or pass)
    */

    //function to check if email exists in database
    const checkEmail = async (callback)=> {
        try{  
            //fetch user by email and store in response
            const response = await fetch('/accounts/byEmail?email='+email);
            //wait for response and store json (if email exists response will = 1 if not then 0)
            const data = await response.json();
            setID(data.ID);
            
            callback();
        }catch(error){
            console.log(error);
        }
    }

    const loginAttempt = async (callback)=> {
        if(ID > 0){
            //Request body
            const body = {
                ID: ID, 
                pass: pass
            }
            //URL
            let url = '/accounts/login';
            //Options
         const options = {
                method:'POST',
                headers:{
                   'Content-Type': 'application/json;charset=UTF-8'
                }, 
                body: JSON.stringify(body)
            }

            try{
                //call api
                const response = await fetch(url, options)
                const data = await response.json();
                setAttempt(data);
            }catch(error){
                console.log(error)
            }
        }else if(ID == 0){
            setRes(<Alert variant="danger">No account exists with this Email</Alert>);
        }
    }

    
    const getType = async () =>{
        const response = await fetch('/accounts/byID?ID='+ID);
        const data = await response.json();
        props.setAccountType(data[0].intAccountTypeID);
    }

    useEffect(()=>{
        if(ID > 0){
            loginAttempt();
        }else if(ID == 0){
            setRes(<Alert variant="danger">No account exists with this Email</Alert>);
        }
    },[ID])

    useEffect(()=>{
        const setReduxVars = async () => {
            props.setAccountID(ID)
            await getType();
        }

        if(attempt > 0){
            setReduxVars();
        }else if(attempt == 0){
            setRes(<Alert variant="danger">Wrong Email or Password</Alert>);
        }
    },[attempt])


    //verify login data 
    async function verifyData(event){
        //prevent form from clearing 
        event.preventDefault();
        //if email input is not a valid email set res
        if(!validator.isEmail(email)){
            setRes(<Alert variant="danger">Enter a valid Email</Alert>)
        //if valid input, check for account
        }else{ 
            //function will get accountID or return 0 if none exists
            await checkEmail(loginAttempt);  
        }
    }

    useEffect(()=>{
        if(props.accountType === 1){
            history.push("/trainer/dashboard")
        }
    },[props.accountType])
    
    return (
        <div>
            <h2>Log In</h2><br />
            <hr></hr>
            <Form title="Log In" onSubmit={(e)=>verifyData(e)}> 
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
                        {res}
                    </Col>
                </Row>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button variant="primary" type="submit">Log In</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button href="/signup" variant="outline-primary">Or Sign Up</Button>
                     </Col>
                </Form.Group>
            </Form>
            
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID,
        accountType: state.account.accountType
    }
}
  
  const mapDispatchToProps = ( dispatch ) => {
    return{
      setAccountID: (ID) => { dispatch({type: 'SET_ACCOUNT_ID', ID: ID})},
      setAccountType: (accountType) => { dispatch({type: 'SET_TYPE', accountType: accountType})}
    }
  }

export default  connect(mapStateToProps, mapDispatchToProps)(LogIn);