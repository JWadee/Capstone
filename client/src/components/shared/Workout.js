import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import { Jumbotron, Row, Col, Button } from "react-bootstrap";


const Workout = () => {
    const [exercises, setExercises] = useState([]);
    const [workout, setWorkout] = useState(null);

    const match = useRouteMatch();

    //Run on initial render, fetch workout exercises
    useEffect(()=>{
        const fetch_exercises = async () => {
            const response = await fetch('/workoutExercises/byWorkout?ID='+match.params.ID);
            const data = await response.json();
            setExercises(data)
        }

        const fetch_workout = async () => {
            const response = await fetch('/workouts/byID?ID='+match.params.ID);
            const data = await response.json();
            setWorkout(data);
        }

        fetch_exercises()
        fetch_workout()
    },[])

    return (
        <Jumbotron>
            {
                workout != null ? <h2>{workout[0].strWorkoutName}</h2> : <></>
            }
            <br />
            <hr />
            {exercises.map((exercise)=>{ return (
                <Row key={exercise.intExerciseID}>
                    <Col>
                        <p>{exercise.strExerciseName}</p> 
                    </Col>
                    <Col>
                        <p>{exercise.strTargetDescription}</p>   
                    </Col>
                </Row>                
            )})}
            <Row>
                <Col >
                    <Button href={match.url+"/add-exercise"}>Add Exercise</Button>
                </Col>
            </Row>        

        </Jumbotron>
    )

}

export default Workout