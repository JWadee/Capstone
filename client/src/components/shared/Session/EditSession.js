import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import {Jumbotron, Form, Row, Col, Button, Modal} from 'react-bootstrap';
import history from '../../../utils/history';

const EditSession = (props) => {
    const [typeID, setTypeID] = useState(props.session.intSessionTypeID);
    const [teamID, setTeamID] = useState(props.session.intTeamID);
    const [clientID, setClientID] = useState(props.session.intClientID);
    const [workoutID, setWorkoutID] = useState(props.session.intWorkoutID);
    const [date, setDate] = useState(props.session.dtmDate.substring(0,10));
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [startHour, setStartHour] = useState(props.start.hours);
    const [startMinute, setStartMinute] = useState(props.start.minutes);
    const [startAMPM, setStartAMPM] = useState(props.start.AMPM);
    const [endHour, setEndHour] = useState(props.end.hours);
    const [endMinute, setEndMinute] = useState(props.end.minutes);
    const [endAMPM, setEndAMPM] = useState(props.end.AMPM);
    const [types, setTypes] = useState([]);
    const [teams, setTeams] = useState([]);
    const [clients, setClients] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [teamDisp, setTeamDisp] = useState();
    const [clientDisp, setClientDisp] = useState();
    const [show, setShow] = useState(false);
    const [updated, setUpdated] = useState(false);

    let minuteOpts = ['00', '15', '30', '45'];
    let hourOpts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    

    //Functions to handle to opening and closing of Modal (delete confirmation)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const updateSession = async() => {
        const data = {
            clientID : clientID,
            teamID : teamID, 
            typeID : typeID, 
            workoutID : workoutID, 
            date : date, 
            start : startTime, 
            end: endTime, 
            sessionID : props.session.intSessionID
        }

        const url ='/sessions/update'
        const options = {
                    method:'PUT',
                    headers:{
                        'Content-Type': 'application/json;charset=UTF-8'
                    }, 
                    body: JSON.stringify(data)
        }

        //call api
        fetch(url, options)
            .then(()=> {
                setUpdated(true);
            }).catch(error=>{
                console.log(error)
                return(
                    <div>
                        <h4>There was an error on our end. Please try again.</h4>
                    </div>
                )
            })

    }
   //Variable containing the Modal
    const modal = (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Save your changes?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={updateSession}>
                    Update Session
                </Button>
                </Modal.Footer>
        </Modal>
    )

    //Run on initial render to load session types, clients, teams, and workouts
    useEffect(()=>{
        //function to fetch exercise types 
        async function fetch_sessiontypes(){
            //call api
            const response = await fetch('/sessions/types')
                //catch any error
                .catch((error) => console.log(error));
                //store response.json into data variable
            const data = await response.json();
            //set exerciseTypes State variable to data 
            setTypes(data);
        }
        const fetch_teams = async () => {
            const response = await fetch('/teams/byTrainer?ID='+props.session.intOwnerID);
            const data = await response.json();
            setTeams(data)
        }

        const fetch_clients = async () => {
            const response = await fetch('/trainerClients/byTrainer?ID='+props.session.intOwnerID);
            const data = await response.json();
            setClients(data)
        }

        const fetch_workouts = async () => {
            const response = await fetch('/workouts/byTrainer?ID='+props.session.intOwnerID);
            const data = await response.json();
            setWorkouts(data)
        }

        fetch_workouts();
        fetch_teams();
        fetch_clients();
        fetch_sessiontypes();
    }, [])


    //Reset Team and Client ID based on selection of session type
    useEffect(()=>{
        if(typeID == 1){
            setTeamID(null);
            setClientID(null); 
        }else if(typeID == 2){
            setClientID(null);
        }else if(typeID == 3){
            setTeamID(null);
        }
    },[typeID])


    //Change start time
    useEffect(()=>{
        if(startAMPM ==='PM'){
            let hour = parseInt(startHour)+12;
            setStartTime(
                hour+":"+startMinute
            )
        }else{
            setStartTime(
                startHour+":"+startMinute
            )
        }
    },[startMinute, startHour, startAMPM])
    
    // Set team display when data loads
    useEffect(()=>{
        if(typeID == 2){
        setTeamDisp(
            <Form.Group as={Row}>
                <Form.Label column sm={{span:3, offset:2}}>Team:</Form.Label>
                <Col sm={10} md={4} lg={3}>
                <Form.Control as="select" onChange={(e)=>setTeamID(e.target.value)} value={teamID}>
                    {teams.map(team => {
                    return( 
                        <option selected={team.intTeamID == teamID} key={team.intTeamID} value={team.intTeamID}>{team.strTeamName}</option>
                    )})}                    
                    {teamID === null ? <option selected disabled hidden>Choose a Team</option> :null}
                </Form.Control>
                </Col>
            </Form.Group>
        )
        }else setTeamDisp();
    },[teams, typeID, teamID])

    // Set client display when data loads
    useEffect(()=>{
        if(typeID == 3){
        setClientDisp(
            <Form.Group as={Row}>
                <Form.Label column sm={{span:3, offset:2}}>Client:</Form.Label>
                <Col sm={10} md={4} lg={3}>
                    <Form.Control as="select" onChange={(e)=>setClientID(e.target.value)} value={clientID}>
                        {clients.map(client => {
                            return( 
                                <option key={client.intAccountID} value={client.intAccountID}>{client.strFirstName +" "+client.strLastName}</option>
                            )
                        })}
                        {clientID === null ? <option selected disabled hidden>Choose a Client</option> :null}
                    </Form.Control>
                </Col>
            </Form.Group>
            
        )
        }else setClientDisp();
    },[clients, typeID, clientID])
 
    //Change end time
    useEffect(()=>{
        if(endAMPM === 'PM'){
            let hour = parseInt(endHour)+12;
            setEndTime(
                hour+":"+endMinute
            )
        }else{
            setEndTime(
                endHour+":"+endMinute
            )
        }
    },[endHour, endMinute, endAMPM])
    



    //Options for session types drop down (map function runs for each object in the  types array)
    let typeOpts = types.map(type => {
        return <option  key={type.intSessionTypeID} value={type.intSessionTypeID}>{type.strSessionType}</option>
        
    })

    let workoutOpts = workouts.map(workout => {
        return <option  key={workout.intWorkoutID} value={workout.intWorkoutID}>{workout.strWorkoutName}</option>
        
    })
    
    
    switch(updated){
        case false:
        return (
            <>
            <Jumbotron>
                <h2>Edit Session</h2><br />
                <hr></hr>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={{span:3, offset:2}}>Type:</Form.Label>
                        <Col sm={10} md={4} lg={3}>
                            <Form.Control as="select" onChange={(e)=>setTypeID(e.target.value)} value={typeID}>
                                {typeOpts}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    {clientDisp}
                    {teamDisp}
                    <Form.Group as={Row}>
                        <Form.Label column sm={{span:3, offset:2}}>Date:</Form.Label>
                        <Col sm={10} md={4} lg={3}>
                            <Form.Control type="date" value={ date} onChange={(e)=>setDate(e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Form.Group>
                    <Form.Row>
                        <Form.Label column sm={{span:3, offset:2}}>Start Time:</Form.Label>
                        <Col sm={2}>
                            <Form.Control as="select" value={ startHour} onChange={ (e)=>setStartHour(e.target.value)}> 
                               {hourOpts.map(hour =>{
                                   return(
                                       <option value={hour} key={hour}>{hour}</option>
                                   )
                               })}
                            </Form.Control>
                        </Col>
                        <Col sm={2}>
                            <Form.Control as="select" value={ startMinute} onChange={ (e)=>setStartMinute(e.target.value)}> 
                               {minuteOpts.map(minute =>{
                                   return(
                                       <option value={minute} key={minute}>{minute}</option>
                                )
                               })}
                            </Form.Control>
                        </Col>
                        <Col sm={2}>
                            <Form.Control as="select" value={ startAMPM} onChange={ (e)=>setStartAMPM(e.target.value)}> 
                               <option value="AM">AM</option>
                               <option value="PM">PM</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    </Form.Group>
                    <Form.Group>
                    <Form.Row>
                        <Form.Label column sm={{span:3, offset:2}}>End Time:</Form.Label>
                        <Col sm={2}>
                            <Form.Control as="select" value={endHour} onChange={ (e)=>setEndHour(e.target.value)}> 
                               {hourOpts.map(hour =>{
                                   return(
                                       <option value={hour} key={hour}>{hour}</option>
                                   )
                               })}
                            </Form.Control>
                        </Col>
                        <Col sm={2}>
                            <Form.Control as="select" value={ endMinute} onChange={ (e)=>setEndMinute(e.target.value)}> 
                               {minuteOpts.map(minute =>{
                                   return(
                                       <option value={minute} key={minute}>{minute}</option>
                                   )    
                               })}
                            </Form.Control>
                        </Col>
                        <Col sm={2}>
                            <Form.Control as="select" value={ endAMPM} onChange={ (e)=>setEndAMPM(e.target.value)}> 
                               <option value="AM">AM</option>
                               <option value="PM">PM</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={{span:3, offset:2}}>Type:</Form.Label>
                        <Col sm={10} md={4} lg={3}>
                            <Form.Control as="select" onChange={(e)=>setWorkoutID(e.target.value)} value={workoutID}>
                                {workoutOpts}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>                
                        <Col>
                            <Button onClick={props.closeEdit}>Cancel</Button>
                            <Button onClick={()=>handleShow()}>Save Changes</Button>
                        </Col>
                    </Form.Group>  
                </Form>
            </Jumbotron>    
            {modal}
            </>
        )
        case(true):
            return (<h2>Session Updated</h2>)
    }
        
}


const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}

export default  connect(mapStateToProps)(EditSession);