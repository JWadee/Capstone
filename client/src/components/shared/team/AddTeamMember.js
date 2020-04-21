import React, {useState, useEffect} from "react";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap'
import {useRouteMatch} from "react-router-dom";
import history from '../../../utils/history';

const AddTeamMember = (props) => {
    const [email, setEmail] = useState('');
    const [accountID, setAccountID] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const match = useRouteMatch();

    //function to get account ID by email
    const getID = async () => {
        const response = await fetch('/accounts/byEmail?email='+email);
        const data = await response.json();
        setAccountID(data.ID)
    }
    
    //Run whenever account ID is set, get accounttype
    useEffect(()=>{
        if(accountID > 0){
            addMember();
        }else if(accountID === 0){
            setErrorMessage(<Alert variant="danger">No account exists with this email.</Alert>)
        }
    },[accountID])
    
    //Submit function
    const submit = (e) => {
        e.preventDefault();
        getID();
    }

    const addMember = async() => {
        const body = {
            accountid: accountID, 
            teamid: match.params.ID
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
                return;
            }).then(()=> {
                history.push('/trainer/my-teams/team/1')
            })
    }

    const cancel = () => {
        history.push('/trainer/my-teams/team/1')
    }
    
    return (
        <div>
            <h2>Add a Member</h2>
            <Form title="Add a Member"> 
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Email</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setEmail(e.target.value)}></Form.Control>
                        {errorMessage}
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 3, offset: 3  }}>
                        <Button type="submit" onClick={() => cancel()} >Cancel</Button>
                    </Col>
                    <Col sm={{ span:3}}>
                        <Button type="submit" onClick={(e) => submit(e)} >Add Trainer</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};




export default AddTeamMember;
