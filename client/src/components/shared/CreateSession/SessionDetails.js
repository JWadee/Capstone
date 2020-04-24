import React, {useState, useEffect} from "react";
import {div, Form, Row, Col, Button} from 'react-bootstrap';

const SessionType = (props) => {
    const [disabled, setDisabled] = useState(true)
    const values = props.values;
    const [teamDisp, setTeamDisp] = useState();
    const [clientDisp, setClientDisp] = useState();

    const saveAndContinue = () => {
        props.nextStep()
    }

    // Set team display when data loads
    useEffect(()=>{
        if(values.typeID === 2){
        setTeamDisp(
            <Form.Group as={Row}>
                <Form.Label column sm={{span:3, offset:2}}>Team:</Form.Label>
                <Col sm={10} md={4} lg={3}>
                <Form.Control as="select" onChange={props.handleChange('teamID')} value={values.teamID}>
                    <option selected={true} disabled hidden>Choose a Team</option>
                    {values.teams.map(team => {
                    return( 
                        <option selected={team.intTeamID == values.teamID} key={team.intTeamID} value={team.intTeamID}>{team.strTeamName}</option>
                    )})}
                </Form.Control>
                </Col>
            </Form.Group>
        )
        }
    },[values.teams, values.typeID])

    // Set client display when data loads
    useEffect(()=>{
        if(values.typeID === 3){
        setClientDisp(
            <Form.Group as={Row}>
                <Form.Label column sm={{span:3, offset:2}}>Client:</Form.Label>
                <Col sm={10} md={4} lg={3}>
                    <Form.Control as="select" onChange={props.handleChange('clientID')} value={values.clientID}>
                        <option selected={true} disabled hidden>Choose a Client</option>
                        {values.clients.map(client => {
                            return( 
                                <option key={client.intAccountID} value={client.intAccountID}>{client.strFirstName +" "+client.strLastName}</option>
                            )
                        })}
                    </Form.Control>
                </Col>
            </Form.Group>
        )
        }
    },[values.clients, values.typeID])
 
    //Enable Continue button
    useEffect(()=>{
        if(values.typeID === 1){
            setClientDisp();            
            setTeamDisp();
            setDisabled(false);
        }else if(values.typeID === 2){
            console.log(values.teamID)
            if(values.teamID > 0){
                setDisabled(false);
            }else setDisabled(true);
            setClientDisp();
        }else if(values.typeID === 3){
            if(values.clientID > 0){
                setDisabled(false);
            }else setDisabled(true);
            setTeamDisp();
        }
    },[values.typeID, values.clientID, values.teamID])

    //Options for session types drop down (map function runs for each object in the values.types array)
    let types = values.types.map(type => {
            //if the ID of the dropdown is == state value then set that option to selected
            if(type.intSessionTypeID == values.typeID){
                return <option selected key={type.intSessionTypeID} value={type.intSessionTypeID}>{type.strSessionType}</option>
            }else{
                return <option  key={type.intSessionTypeID} value={type.intSessionTypeID}>{type.strSessionType}</option>
            }
    })

    return (
        <div className="component">
            <h2>Add a Session</h2>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Type:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control as="select" onChange={props.handleChange('typeID')} value={values.typeID}>
                            <option selected disabled hidden>Choose a Type</option>
                            {types}
                        </Form.Control>
                    </Col>
                </Form.Group>
                {clientDisp}
                {teamDisp}
                <Form.Group as={Row}>
                    <Col sm={{ span: 12 }}>
                        <Button disabled={disabled} onClick={(e)=> saveAndContinue(e)}>Save and Continue</Button>
                    </Col>
                </Form.Group>  
            </Form>
        </div>    
    );
};

export default SessionType