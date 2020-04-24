import React, {useState, useEffect} from "react";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap'
import { connect } from 'react-redux';
import history from '../../../utils/history';

const NewClient = (props) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState();

    
    /*////
        submit function ----
            Step 1: Get accountID by Email, if exists set accountID, else set error message
            Step 2: Check if account type is client, yes = add client, no = set error message
    ////*/

    //function to get account ID by email, returns id or (if not existing the fetch returns 0)
    const getID = async () => {
        const response = await fetch('/accounts/byEmail?email='+email);
        let data = await response.json();
        return data.ID
    }

    //function to check account type, returns 1 if client, 0 if account doesn't exist or is not a client account
    const getType = async (id) => {
        if(id > 0){
            const response = await fetch('/accounts/byID?ID='+id);
            let data = await response.json();
            let type = data[0].intAccountTypeID
            if(type === 2){
                return(1)
            }else return(0)
        }else if (id === 0){
            return(0)
        }
    }

    //Function to add trainer client record to database
    const addClient = async (clientid) => {
        const body = {
            trainerID: props.ID, 
            clientID: clientid
        }

        //api parameters to create game
        const url ='/trainerClients/add'
        const options = {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json;charset=UTF-8'
                    }, 
                    body: JSON.stringify(body)
        }

        //call api
        fetch(url, options)
            .then(()=> {
                history.push('/trainer/my-clients')
            }).catch(error=>{
                console.log(error)
            })
    }
    const submit = async (e) => {
        //prevent form from clearing
        e.preventDefault();
        
        //call getID 
        getID().then(id=>{
            //then call getType
            getType(id).then(submit =>{
                //then either call addClient or set errormessage
                if(submit === 1){
                    addClient(id)
                }else{
                    setErrorMessage(<Alert variant="danger">No client account exists with this email.</Alert>)
                }
            })
        });
    }
   

   
    


    return (
        <div className="component">
            <h2>Add a Client</h2>
            <Form title="Add a Client"> 
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
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}


export default  connect(mapStateToProps)(NewClient);
