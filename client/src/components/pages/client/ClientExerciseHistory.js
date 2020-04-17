import React, {useState, useEffect} from 'react';
import {Jumbotron, Form, Row, Col, Button} from 'react-bootstrap';
import Results from '../../shared/Results/Results';


const ClientExerciseHistory = () => {
    const [exercises, setExercises] = useState([]);
    const [exerciseID, setExerciseID] = useState();
    const [disp, setDisp] = useState();


    //fetch all exercises that have at least one session recorded by client
    useEffect(()=>{
        const fetch_exercises = async()=> {
            const response = await fetch('/exercises/');
            const data = await response.json();
            setExercises(data)
        }   

        fetch_exercises();
    },[])

    
    return (
        <Jumbotron>
            <h2>Exercise History</h2><br />
            <hr></hr>
            <Row>
                <Form>
                    <Col>
                        <Form.Control as="select" defaultValue={0} onChange={(e) => setExerciseID(e.target.value)}>
                            <option disabled hidden value={0}>Select Exercise</option>
                                {exercises.map((exercise) => {
                                    return (
                                        <option key={exercise.intExerciseID} value={exercise.intExerciseID}>{exercise.strExerciseName}</option>
                                    )
                                })}
                        </Form.Control>
                    </Col>
                </Form>
            </Row>
            <Row>
                <Col>
                    <Results exerciseid={exerciseID} />
                </Col>
            </Row>
        </Jumbotron>
    )

}

export default ClientExerciseHistory