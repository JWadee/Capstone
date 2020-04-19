import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import { Jumbotron, Row, Col, Button } from "react-bootstrap";

const Routine = () => {
    const [routine, setRoutine] = useState(null);
    const [workouts, setWorkouts] = useState([]);

    const match = useRouteMatch();

    //Run on initial render, fetch routine workouts and routine
    useEffect(()=>{
        const fetch_workouts = async () => {
            const response = await fetch('/routineWorkouts/byRoutine?ID='+match.params.ID);
            const data = await response.json();
            setWorkouts(data)
        }

        const fetch_routine = async () => {
            const response = await fetch('/routines/byID?ID='+match.params.ID);
            const data = await response.json();
            setRoutine(data);
        }

        fetch_routine()
        fetch_workouts()
    },[])

    return (
        <Jumbotron>
            {
                routine != null ? <h2>{routine[0].strRoutineName}</h2> : <></>
            }
            <br />
            <hr />
            {workouts.map((workout)=>{ return (
                <Row key={workout.intWorkoutID}>
                    <Col>
                        <p>{workout.strWorkoutName}</p> 
                    </Col>
                </Row>                
            )})}
            <Row>
                <Col >
                    <Button href={match.url+"/add-workout"}>Add Workout</Button>
                </Col>
            </Row>        

        </Jumbotron>
    )

}

export default Routine