import React, {useEffect, useState} from "react";
import {Jumbotron, Button, Row, Col, Modal} from 'react-bootstrap';
import { Route, useRouteMatch } from "react-router-dom";

const Session = () => {
    const [session, setSession] = useState(null);
    const [condDisp, setCondDisp] = useState(null);
    const [client, setClient] = useState(null);
    const [team, setTeam] = useState(null);
    const [day, setDay] = useState();
    const [date, setDate] = useState();
    const [mainDisp, setMainDisp] = useState();
    const [show, setShow] = useState(false);
    const match = useRouteMatch();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteSession = async() =>{
        fetch('/sessions/delete?ID='+session.intSessionID, { method: 'delete'}) 
            .then(response =>{
                setMainDisp(<h2>Session Deleted</h2>)
                handleClose();
            })
            .catch(err =>{
                setMainDisp(<h2>Something went wrong, try again.</h2>)
            })
    }

    const modal = (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete this Session?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={deleteSession}>
                    Delete Session
                </Button>
                </Modal.Footer>
        </Modal>
    )

    const getDay = () =>{
        const date = new Date(session.dtmDate);
        const day = date.getDay();
        let strDay = '';
        // Sunday - Saturday : 0 - 6
        if(day === 0){
            strDay = 'Sunday';
            setDay(strDay);
        }else if(day === 1){
            strDay = 'Monday';
            setDay(strDay);
        }else if(day === 2){
            strDay = 'Tuesday';
            setDay(strDay);
        }else if(day === 3){
            strDay = 'Wednesday';
            setDay(strDay);
        }else if(day === 4){
            strDay = 'Thursday';
            setDay(strDay);
        }else if(day === 5){
            strDay = 'Friday';
            setDay(strDay);
        }else if(day === 6){
            strDay = 'Saturday';
            setDay(strDay);
        }

    }

    const formatDate = () => {
        const date = new Date(session.dtmDate);
        const formatted_date = (date.getMonth() + 1)+ "-" + date.getDate();
        setDate(formatted_date);
    }


    useEffect(()=>{
        const fetch_session = async() =>{
            const response = await fetch('/sessions/byID?ID='+match.params.ID);
            const data = await response.json();
            setSession(data[0]);
        }

        fetch_session()
    },[])

    useEffect(()=>{
        const fetch_client = async ()=>{
            const response = await fetch('/accounts/byID?ID='+session.intClientID);
            const data = await response.json();
            setClient(data);
        }

        const fetch_team = async ()=>{
            const response = await fetch('/teams/byID?ID='+session.intTeamID);
            const data = await response.json();
            setTeam(data);
        }

        if(session != null){
            getDay();
            formatDate();
            
            if(session.intSessionTypeID === 3){
                fetch_client();
            }else if(session.intSessionTypeID === 2){
                fetch_team();
            }else{
                setClient(null);
                setTeam(null);
            }
        }    
    },[session])

    useEffect(()=>{
        if(client != null){
            setCondDisp(
                <div><p>Client: {client[0].strFirstName +" "+client[0].strLastName}</p></div>
            )
        }
        if(team != null){
            setCondDisp(
                <div><p>Team: {team[0].strTeamName}</p></div>
            )
        }
    },[client, team])

    useEffect(()=>{
        if(session != null){
        setMainDisp(
            <div>
                <h2>Session Details</h2><br />
                <hr />
                <div>
                    <div><p>When: {day}, {date} </p></div>
                </div>
                <div>
                    <div><p>From: {session.tmStartTime+" - "+session.tmEndTime}</p></div>
                </div> 
                {condDisp}
                <Row>
                    <Col>
                        <Button float="right">Start Workout</Button>
                        <Button>Edit Session</Button>
                        <Button onClick={()=>handleShow()}>Delete Session</Button>

                    </Col>
                </Row>
            </div>
            )
        }
    },[condDisp, day, date, session])




    return (
        <Jumbotron fluid>
            {mainDisp}
            {modal}
        </Jumbotron>
    );
};

export default Session;

