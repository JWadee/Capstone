import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import { div, Row, Col, Button, Table} from "react-bootstrap";


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
        <div className="component">
            {
                workout != null ? <h2>{workout[0].strWorkoutName}</h2> : <></>
            }
            <Table bordered hover>
                <thead>
                    <tr>
                        <th><h4>Exercise</h4></th>
                        <th><h4>Description</h4></th>
                    </tr>                    
                </thead>
                <tbody>
                    {exercises.map((exercise)=>{ return (
                        <tr key={exercise.intExerciseID}>
                            <td>{exercise.strExerciseName}</td>
                            <td>{exercise.strTargetDescription}</td>
                        </tr>                
                    )})}
                </tbody>
            </Table>

            <Row>
                <Col >
                    <Button href={match.url+"/add-exercise"}>Add Exercise</Button>
                </Col>
            </Row>        

        </div>
    )

}

export default Workout