import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button} from 'react-bootstrap';

const SessionWorkout = (props) => {
    const [disabled, setDisabled] = useState(true);
    const [workoutDisp, setWorkoutDisp] = useState();
    let values = props.values;

    const saveAndContinue = () => {
        props.nextStep()
    }
    
    const back  = (e) => {
        e.preventDefault();
        props.prevStep();
    }
    
    useEffect(()=>{
        if(values.workouts.length > 0){
            setWorkoutDisp(
                values.workouts.map(workout=>{
                    return(
                        <option selected={workout.intWorkoutID == values.workoutID} value={workout.intWorkoutID} key={workout.intWorkoutID}>{workout.strWorkoutName}</option>
                    )
                })
            )
        }
    },[values.workouts]);
    
    useEffect(()=>{
        if(values.workoutID > 0){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    },[values.workoutID]);

    return (
        <Jumbotron>
            <h2>Choose a Workout</h2><br />
            <hr></hr>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Type:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control as="select" onChange={props.handleChange('workoutID')} value={values.workoutID}>
                            <option selected disabled hidden>Choose a Workout</option>
                            {workoutDisp}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 3, offset: 3  }}>
                        <Button onClick={(e)=> back(e)}>Back</Button>
                    </Col>
                    <Col sm={{ span: 3 }}>
                        <Button disabled={disabled} onClick={(e)=> saveAndContinue(e)}>Save and Continue</Button>
                    </Col>
                </Form.Group>  
            </Form>
        </Jumbotron>    
    );
};

export default SessionWorkout