import React, {useEffect, useState} from "react";
import {div, Button, Row, Col, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import history from '../../../utils/history';

//Components 
import EditSession from './EditSession';

const ActiveSession = (props) => {
    //Component Variables
    const [session, setSession] = useState(null);
    const [condDisp, setCondDisp] = useState(null);
    const [client, setClient] = useState(null);
    const [team, setTeam] = useState(null);    
    const [workout, setWorkout] = useState(null);
    const [day, setDay] = useState();
    const [date, setDate] = useState();
    const [mainDisp, setMainDisp] = useState();
    const [startShow, setStartShow] = useState(false);    
    const [deleteShow, setDeleteShow] = useState(false);
    const [start, setStart] = useState(false);
    const [end, setEnd] = useState(false);
    const match = props.match;

    //Functions to handle to opening and closing of Modals (delete confirmation, and start)
    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);
    const handleStartClose = () => setStartShow(false);
    const handleStartShow = () => setStartShow(true);

    //Function to delete session
    const deleteSession = async() =>{
        fetch('/sessions/delete?ID='+session.intSessionID, { method: 'delete'}) 
            .then(response =>{
                setMainDisp(<h2>Session Deleted</h2>)
                handleDeleteClose();
            })
            .catch(err =>{
                setMainDisp(<h2>Something went wrong, try again.</h2>)
            })
    }

    
    /*Function to start workout
      Create session exercises for each workout exercise, then push to Record Workout Component
    */
    const startWorkout = async() =>{
        handleStartClose();
        //fetch workout exercises

        fetch('/workoutExercises/byWorkout?ID='+session.intWorkoutID) 
            //wait for json
            .then((response)=>{
                return response.json()
            })
            //create session exercise for each workout exercise
            .then(json=>{
                //set account id to client id if client session, owner if personal, or logged in account id if team session
                let id; 
                if(session.intSessionTypeID === 1){
                    id = session.intOwnerID;
                }else if(session.intSessionTypeID === 2){
                    id = props.ID
                }else if(session.intSessionTypeID === 3){
                    id = session.intClientID
                }

                //Create session exercise for each workout exercise
                for(let i=0; i < json.length; i++){
                    let exercisedata = {
                        sessionid: session.intSessionID,
                        accountid: id, 
                        exerciseid : json[i].intWorkoutExerciseID
                    }
                    let url = '/sessionExercises/add'
                    const options = {
                        method:'POST',
                        headers:{
                            'Content-Type': 'application/json;charset=UTF-8'
                        }, 
                        body: JSON.stringify(exercisedata)
                    }
                    fetch(url, options)
                        .catch(error=>{
                        console.log(error)
                        setMainDisp(
                            <div>
                                <h4>There was an error on our end. Please try again.</h4>
                            </div>
                        )
                    })
                }

                let statusbody = {
                    sessionid: session.intSessionID,
                    statusid: 3
                }

                //Set session status to 'In Progress'
                fetch('/sessions/updateStatus',
                    {
                    method:"PUT",
                    headers:{
                        'Content-Type': 'application/json;charset=UTF-8'
                    }, 
                    body: JSON.stringify(statusbody)
                    }
                ).then(()=>{
                    //Push to Record workout component
                    history.push('/trainer/sessions/session/'+match.params.ID+'/record/workout/'+session.intWorkoutID);
                })
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
                    <Button onClick={()=>handleStartShow()}>Start Workout</Button>
                    <Button onClick={()=>setMainDisp(<EditSession session={session} start={start} end={end} closeEdit={()=>closeEdit()} />)}>Edit Session</Button>
                    <Button onClick={()=>handleDeleteShow()}>Delete Session</Button>
                </Col>
            </Row>
        </div>
    )

    //Function to close edit 
    const closeEdit = () => {
        setMainDisp(sessionDisp)
    }

    //Variable containing the Delete Modal
    const deleteModal = (
        <Modal show={deleteShow} onHide={handleDeleteClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete this Session?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={deleteSession}>
                    Delete Session
                </Button>
                </Modal.Footer>
        </Modal>
    )

        //Variable containing the Modal
        const startModal = (
            <Modal show={startShow} onHide={handleStartClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Start this Workout?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleStartClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={startWorkout}>
                        Start
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
        <div fluid>
            {mainDisp}
            {deleteModal}
            {startModal}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}


export default  connect(mapStateToProps)(ActiveSession);
