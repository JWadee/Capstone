import React, {useEffect, useState} from "react";
import {Jumbotron, Button, Row, Col, Modal} from 'react-bootstrap';

//Components 
import EditSession from './EditSession';

const Session = (props) => {
    //Component Variables
    const [session, setSession] = useState(null);
    const [condDisp, setCondDisp] = useState(null);
    const [client, setClient] = useState(null);
    const [team, setTeam] = useState(null);    
    const [workout, setWorkout] = useState(null);
    const [day, setDay] = useState();
    const [date, setDate] = useState();
    const [mainDisp, setMainDisp] = useState();
    const [show, setShow] = useState(false);
    const [start, setStart] = useState(false);
    const [end, setEnd] = useState(false);
    const match = props.match;

    //Functions to handle to opening and closing of Modal (delete confirmation)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Function to delete session
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

    //Variable to contain display for session information
    const sessionDisp = (
        <div>
            <h2>Session Details</h2><br />
            <hr />
            <div>
                <div><p>When: {day}, {date} </p></div>
            </div>
            <div>
                <div><p>From: {start.hours+":"+start.minutes+start.AMPM+" - "+end.hours+":"+end.minutes+end.AMPM}</p></div>
            </div> 
            {workout != null ?                 
                <div>
                    <div><p>Workout: {workout[0].strWorkoutName}</p></div>
                </div> : <></>
            }
            {condDisp}
            <Row>
                <Col>
                    <Button>Start Workout</Button>
                    <Button onClick={()=>setMainDisp(<EditSession session={session} start={start} end={end} closeEdit={()=>closeEdit()} />)}>Edit Session</Button>
                    <Button onClick={()=>handleShow()}>Delete Session</Button>
                </Col>
            </Row>
        </div>
    )

    //Function to close edit 
    const closeEdit = () => {
        setMainDisp(sessionDisp)
    }

    //Variable containing the Modal
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

    //Function to get the day of the week
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

    //Function to format date as dd-mm
    const formatDate = () => {
        const date = new Date(session.dtmDate);
        const formatted_date = (date.getMonth() + 1)+ "-" + date.getDate();
        setDate(formatted_date);
    }

    const format_time = (time) =>{
        //split string into hours and minutes
        const split = time.split(":", 2)
        let hours = split[0];
        const minutes = split[1];
        
        /** CHECK HOURS FOR AM OR PM TIME */

        //if hours has leading zero, remove and set to AM
        if(hours.startsWith("0")){
            hours = hours.substring(1,2)
            const result = {
                hours: hours,
                minutes: minutes,
                AMPM: 'AM'
            }
            return result;
        //else check if > 12, subtract 12 and set to PM
        }else{
            hours = parseInt(hours);
            if(hours > 12){
                hours = hours - 12 ;
                const result = {
                    hours: hours,
                    minutes: minutes,
                    AMPM: 'PM'
                }
                return result;
            }else if(hours <= 12){
                const result = {
                    hours: hours,
                    minutes: minutes,
                    AMPM: 'AM'
                }
                return result;
            }
        }
        
    }

    //Run on initial render to fetch the session by ID
    useEffect(()=>{
        const fetch_session = async() =>{
            const response = await fetch('/sessions/byID?ID='+match.params.ID);
            const data = await response.json();
            setSession(data[0]);
        }

        fetch_session()
    },[])

    //Run when session is set, if ! null fetch workout, get day, format date, format times, and conditionally client or team
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
        
        const fetch_workout = async ()=>{
            const response = await fetch('/workouts/byID?ID='+session.intWorkoutID);
            const data = await response.json();
            setWorkout(data);
        }

        if(session != null){
            getDay();
            formatDate();
            fetch_workout();
            
            let start = format_time(session.tmStartTime);
            setStart(start);
            let end = format_time(session.tmEndTime);
            setEnd(end);
            
            
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

    //Run when client or team is set, check if ! null show set conditional display if client or team contains record
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

    //Run when condDisp, day, date, workout, or session changes. setMainDisp so that component will reflect changes.
    useEffect(()=>{
        if(session != null){
            setMainDisp(sessionDisp)
        }
    },[condDisp, day, date, session, workout])

    return (
        <Jumbotron fluid>
            {mainDisp}
            {modal}
        </Jumbotron>
    );
};

export default Session;

