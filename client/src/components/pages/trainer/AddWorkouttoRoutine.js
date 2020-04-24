import React, {useState, useEffect} from "react";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap'
import { connect } from 'react-redux';
import history from '../../../utils/history';
import { useRouteMatch } from "react-router-dom";

const AddWorkouttoRoutine = (props) => {
    const [workouts, setWorkouts] = useState([]);
    const [workoutID, setWorkoutID] = useState();
    const [disabled, setDisabled] = useState(true)
    const match = useRouteMatch();

    //Run on initial render to fetch trainers workouts
    useEffect(()=> {
        const fetch_workouts = async () => {
            const response = await fetch('/workouts/byTrainer?ID='+props.ID);
            const data = await response.json();
            setWorkouts(data)
        }
        fetch_workouts();
    },[])

    //Set disabled based on workoutID
    useEffect(()=>{
        if(workoutID > 0){
            setDisabled(false)
        }
    },[workoutID])

    const submit = async (e) => {
        //prevent form from clearing
        e.preventDefault();

        //vars for POST request
        const data={
            routineid: match.params.ID,
            workoutid: workoutID
        };
        const url = '/routineWorkouts/add';
        const options =  {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }

        //POST request to create routine workout record
        fetch(url, options)
            .then(()=>{
                //Push back to Routine component
                history.push("/trainer/my-routines/routine/"+match.params.ID);
            })
            .catch((err)=> console.log(err));
    }

    return (
        <div className="component">
            <h2>Add Workout to Routine</h2>
            <Form title="Add Workout to Routine"> 
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Workout</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control as="select" onChange={e=> setWorkoutID(e.target.value)} defaultValue={-1}>
                            <option disabled hidden value={-1}>Choose Workout</option>
                            {workouts.map(workout => {
                                return (
                                <option value={workout.intWorkoutID} key={workout.intWorkoutID}>{workout.strWorkoutName}</option>
                                )
                            })}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 4  }}>
                        <Button type="submit" disabled={disabled} onClick={(e) => submit(e)}>Add Workout</Button>
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


export default  connect(mapStateToProps)(AddWorkouttoRoutine);

