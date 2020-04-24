import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import { div, Row, Col, Button, Table } from "react-bootstrap";

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
        <div className="component">
            {
                routine != null ? <h2>{routine[0].strRoutineName}</h2> : <></>
            }
            <Row>
                <Col sm={{span: 6, offset: 3}}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th><h4>Workouts</h4></th>
                            </tr>
                        </thead>
                        <tbody>
                            {workouts.map((workout)=>{ return (
                                <tr key={workout.intWorkoutID}>
                                    <td>
                                        {workout.strWorkoutName}
                                    </td>
                                </tr>         
                            )})}
                        </tbody>
                    </Table>
                </Col> 
            </Row>
            <Row>
                <Col >
                    <Button href={match.url+"/add-workout"}>Add Workout</Button>
                </Col>
            </Row>        

        </div>
    )

}

export default Routine