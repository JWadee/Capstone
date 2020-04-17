import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap';

const Confirmation = (props) => {
    const [mainDisp, setMainDisp] = useState()
    const [condDisp, setCondDisp] = useState();
    const [typeDisp, setTypeDisp] = useState();
    const [workoutDisp, setWorkoutDisp] = useState();
    const values = props.values;
    console.log(values.ID)
    const submit = (e) => {
        e.preventDefault()

        const data ={
            ownerID: values.ID,
            clientID: values.clientID,
            teamID: values.teamID,
            typeID: values.typeID,
            statusID: 1, 
            workoutID: values.workoutID,
            date: values.date, 
            start: values.startTime, 
            end: values.endTime
        }

        console.log(data)
        //api parameters to create game
        const url ='/sessions/add'
        const options = {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json;charset=UTF-8'
                    }, 
                    body: JSON.stringify(data)
        }

        //call api
        fetch(url, options)
            .then(response=> {
                setMainDisp(
                    <div>
                        <h4>Session created successfully</h4>
                    </div>
                )
                return response.json();
            }).catch(error=>{
                console.log(error)
                setMainDisp(
                    <div>
                        <h4>There was an error on our end. Please try again.</h4>
                    </div>
                )
            })
    }

    const back  = (e) => {
        e.preventDefault();
        props.prevStep();
    }

    //Set conditional team or client disp
    useEffect(()=>{
        let type = values.types.find(function(item){
            if(item.intSessionTypeID === values.typeID){
                return item;
            }    
        })
        let workout = values.workouts.find(function(item){
            if(item.intWorkoutID === values.workoutID){
                return item;
            }    
        })

        setTypeDisp(
            <ListGroup.Item>Session Type: {type.strSessionType}</ListGroup.Item>
        )

        setWorkoutDisp(
            <ListGroup.Item>Workout: {workout.strWorkoutName}</ListGroup.Item>
        )

        if(values.typeID == 2){
            let team = values.teams.find(function(item){
                if(item.intTeamID === values.teamID){
                    return item;
                }
            });

            setCondDisp(
                <ListGroup.Item>Team: {team.strTeamName}</ListGroup.Item>
            );
        }else if(values.typeID == 3){
            let client = values.clients.find(function(item){
                if(item.intAccountID === values.clientID){
                    return item;
                }
            });

            setCondDisp(
                <ListGroup.Item>Client: {client.strFirstName+" "+client.strLastName}</ListGroup.Item>
            ); 
        }else setCondDisp();
    },[values])

    useEffect(()=>{
        setMainDisp(
            <Jumbotron>
                <h2>Confirmation</h2><br />
                <hr></hr>
                <ListGroup>                    
                    {typeDisp}
                    {condDisp}
                    <ListGroup.Item>Date: {values.date}</ListGroup.Item>
                    <ListGroup.Item>Start Time: {values.startHour +":"+values.startMinute+" "+values.startAMPM} </ListGroup.Item>
                    <ListGroup.Item>End Time: {values.endHour +":"+values.endMinute+" "+values.endAMPM} </ListGroup.Item>
                    {workoutDisp}
                </ListGroup>
                <Row>
                    <Col sm={{ span: 3, offset: 3  }}>
                        <Button onClick={(e)=> back(e)}>Back</Button>
                    </Col>
                    <Col sm={{ span: 3 }}>
                        <Button onClick={(e)=> submit(e)}>Confirm</Button>
                    </Col>
                </Row>
            </Jumbotron>)
        }, [condDisp, workoutDisp, typeDisp])

    return (
        <div>
            {mainDisp}
        </div>
    );
};

export default Confirmation