import React, {useState, useEffect} from "react";
import {Button, Row, Col, Card, Tab, Tabs} from 'react-bootstrap'
import { useRouteMatch } from "react-router-dom";
import history from '../../../utils/history';
import { connect } from 'react-redux';


const ClientPage = (props) => {
    const [client, setClient] = useState(null);
    const [trainerClient, setTrainerClient] = useState([]);
    const [clientDisp, setClientDisp] = useState();
    const [notes, setNotes] = useState([]);
    const [disp, setDisp] = useState(null);
    const [bodyType, setBodyType] = useState('');
    const [gender, setGender] = useState('');
    const [race, setRace] = useState('');

    const match = useRouteMatch();

    //fetch account information and trainer client record
    useEffect(()=>{
        const fetch_client = async () =>{
            const response = await fetch('/accounts/byID?ID='+match.params.ID);
            const data = await response.json();
            setClient(data);
        }

        const fetch_trainerclient = async () =>{
            const response = await fetch('/trainerClients/byTrainer/byClient?trainerid='+props.ID+'&clientid='+match.params.ID);
            const data = await response.json();
            setTrainerClient(data);
        }

        fetch_client();
        fetch_trainerclient();

    },[props.ID, match.params.ID])

    useEffect(()=>{
        if(trainerClient.length > 0){
            const fetch_notes = async () => {
                const response = await fetch('/trainerClients/notes/byTrainerClient?ID='+trainerClient[0].intTrainerClientID);
                const data = await response.json();
                setNotes(data);
            }

            fetch_notes();
        }   
    },[trainerClient])

    //Set bodytype and gender display, fetch and set race display
    useEffect(()=>{
        if(client != null){
            if(client[0].intGenderID === 1){
                setGender('Male');
            }else setGender('Female');

            if(client[0].intBodyTypeID === 1){
                setBodyType('Endomorph')
            }else if(client[0].intBodyTypeID === 2){
                setBodyType('Ectomorph')

            }else if(client[0].intBodyTypeID === 3){
                setBodyType('Mesomorph')
            }


            
            const fetch_race = async () =>{
                const response = await fetch('/races/byID?id='+client[0].intRaceID);
                const data = await response.json();
                setRace(data[0].strRace)
            }

            fetch_race();
        }

    },[client])

    //go to add note component
    const addNote = () => {
        //Push to AddClientNote Component
        history.push('/trainer/my-clients/client/'+match.params.ID+'/'+trainerClient[0].intTrainerClientID+'/add-note');
    }

    // set display when client data loads
    useEffect(()=>{
        if(client != null){
            setClientDisp(
                <Row>  
                    <Col md={{span:3, offset:3}}>
                        <Row>
                            <h3>{client[0].strFirstName+" "+client[0].strLastName}</h3> 
                        </Row>
                        <Row><p>{client[0].strEmail}</p></Row>
                        <Row>
                            <Button href={'/trainer/my-clients/client/'+match.params.ID+'/exercise-history'}>Exercise History</Button>
                            <Button onClick={()=>addNote()}>Add Note</Button>
                        </Row>
                    </Col>
                    <Col md={{span:3}}>
                        <Tabs defaultActiveKey="demographics" id="uncontrolled-tab-example">
                            <Tab eventKey="demographics" title="Demographics">
                                <p>
                                    Height: {client[0].decHeight} inches
                                </p>
                                <p>
                                    Weight: {client[0].decWeight} lbs
                                </p>
                                <p>
                                    Gender: {gender} 
                                </p>
                                <p>
                                    Body Type: {bodyType} 
                                </p>
                                <p>
                                    Race: {race} 
                                </p>
                            </Tab>
                            <Tab eventKey="notes" title="Notes">
                                {notes.map(note=>{
                                    return(
                                        <p key={note.intTrainerClientNoteID}>
                                            {note.strNote}
                                        </p>
                                    )
                                })}
                            </Tab>
                        </Tabs>
                    </Col>
                    <Row>
                    </Row>
                </Row>
            )
        }
    },[client, notes])
    

    return (
        <div className="component">
            {clientDisp}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}

export default  connect(mapStateToProps)(ClientPage);
