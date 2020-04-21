import React, {useState, useEffect} from "react";
import {div, Form, Row, Col, Button, Alert} from 'react-bootstrap'
import { connect } from 'react-redux';

const AddClienttoTeam = (props) => {
    const [email, setEmail] = useState('');
    const [accountid, setAccountID] = useState(-1);
    const [clientTypeID, setClientTypeID] = useState(Number);
    const [errorMessage, setErrorMessage] = useState();
    const [mainDisp, setMainDisp] = useState();


    useEffect(()=>{
        setMainDisp(
            <div>
            <h2>Add Client to Team</h2><br />
            <hr></hr>
            <Form title="Add Client to Team "> 
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Email</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setEmail(e.target.value)}></Form.Control>
                        {errorMessage}
                    </Col>
                </Form.Group>

                
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button type="submit" onClick={(e) => submit(e)} >Find Client</Button>
                    </Col>
                </Form.Group>
            </Form>
            </div>
        )
    },[errorMessage])

    //function to get account ID by email
    const getID = async () => {
        const response = await fetch('/accounts/byEmail?email='+email);
        const data = await response.json();
        setAccountID(data.ID)
    }

    //function to get account by ID 
    const getAccount = async () => {
        if(clientID > 0){
            const response = await fetch('/accounts/byID?ID='+clientID);
            const data = await response.json();
            console.log(data)
            setClientTypeID(data[0].intAccountTypeID);
        }else if (clientID == 0){
            setErrorMessage(<Alert variant="danger">Not account with this email.</Alert>)
        }
    }



    //Run whenever client ID is set
    useEffect(()=>{
        if(clientID > -1){
            getAccount();
        }
    },[clientID])

    const submit = async (e) => {
        // let exp = await getID();
        e.preventDefault();
        await getID();
    }
   

   
    
    const addClient = async() => {
        const body = {accountid: accountid,
            teamid:match.params.teamid
          }
        

        //api parameters to create game
        const url ='/teamMembers/add'
        const options = {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json;charset=UTF-8'
                    }, 
                    body: JSON.stringify(body)
        }

        //call api
        fetch(url, options)
            .catch(error=>{
                console.log(error)
                setMainDisp(
                    <div>
                        <h4>There was an error on our end. Please try again.</h4>
                    </div>
                )
                return;
            }).then(()=> {
                    setMainDisp(
                    <div>
                        <h4>Client Added</h4>
                    </div>
                    )
            })
    }

    useEffect(()=>{
        if(clientTypeID === 2){
            addClient();                
        }else if(workoutTypeID > 0 && workoutTypeID < 5){
            setErrorMessage(<Alert variant="danger">No workout exists with this email.</Alert>)
        } 
    },[clientTypeID])

    return (
        <div>
            {mainDisp}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}


export default  connect(mapStateToProps)(AddClienttoTeam);
