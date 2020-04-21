import React, {useState, useEffect} from "react";
import {Button, Row, Col, Card, div} from 'react-bootstrap'
import { useRouteMatch } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import history from '../../../utils/history';
import { connect } from 'react-redux';


const ClientPage = (props) => {
    const [client, setClient] = useState(null);
    const [trainerClient, setTrainerClient] = useState([]);
    const [clientDisp, setClientDisp] = useState();
    const [notes, setNotes] = useState([]);
    const [disp, setDisp] = useState(null);

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

    //go to add note component
    const addNote = () => {
        //Push to AddClientNote Component
        history.push('/trainer/my-clients/client/'+match.params.ID+'/'+trainerClient[0].intTrainerClientID+'/add-note');
    }

    // set display when client data loads
    useEffect(()=>{
        if(client != null){
            setClientDisp(
                <>  
                    <h3>Client: {client[0].strFirstName+" "+client[0].strLastName}</h3>
                    <Row>
                        <Card sm={{span:3, offset:1}} as={Col}>
                            <Card.Header as={Row}>
                                <Col sm={{span:12}}>
                                    <Card.Title >Demographics</Card.Title>
                                </Col>
                            </Card.Header>
                            <Card.Body> 
                                <Card.Text>
                                    Height: {client[0].decHeight} inches
                                </Card.Text>
                                <Card.Text>
                                    Weight: {client[0].decWeight} lbs
                                </Card.Text>
                                <Card.Text>
                                    Gender: {client[0].decWeight} 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card sm={{span:3, offset:1}} as={Col}>
                            <Card.Header as={Row}>
                                <Col sm={{span:9}}>
                                    <Card.Title >Notes</Card.Title>
                                </Col>
                                <Button onClick={()=>addNote()} as={Col} sm={{span:3}}>Add <IoIosAddCircleOutline /></Button>
                            </Card.Header>
                            <Card.Body>
                                {notes.map(note=>{
                                    return(
                                        <Card.Text key={note.intTrainerClientNoteID}>
                                            {note.strNote}
                                        </Card.Text>
                                    )
                                })}
                            </Card.Body>
                        </Card>
                        <Col sm={{span:4}}>
                            <Button href={'/trainer/my-clients/client/'+match.params.ID+'/exercise-history'}>Exercise History</Button>
                        </Col>
                    </Row>
                </>
            )
        }
    },[client, notes])
    

    return (
        <div>
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
