import React, {useState, useEffect} from "react";
import {Card, Col, Row, Button, Form} from "react-bootstrap";
import {useRouteMatch} from "react-router-dom";

import SessionWorkout from './SessionWorkout';


const RecordSessionExercise = (props) => {
    const [disp, setDisp] = useState();
    const [time, setTime] = useState();
    const [reps, setReps] = useState([]);
    const [weights, setWeights] = useState([]);
    const [distance, setDistance] = useState();

    const match = useRouteMatch();
    const exercise = props.exercise;

    //Function to push data to reps array for right set
    const pushToReps = (event, set) => {
        let tempArr = reps;
        tempArr[set-1] = event.target.value
        setReps(tempArr)
    }


    //Function to push data to weights array for right set
    const pushToWeights = (event, set) => {
        let tempArr = weights;
        tempArr[set-1] = event.target.value
        setWeights(tempArr)
    }

    //Run whenever component variables affecting the display change
    useEffect(()=>{
        if(exercise.tmTargetTime != null){
            setDisp(
                <>
                    <Form.Group as={Row}>
                        <Form.Label column sm={{span:3, offset:2}}>Time:</Form.Label>
                        <Col sm={10} md={4} lg={3}>
                            <Form.Control type="text" onChange={setTime('time')} value={time} />
                        </Col>
                    </Form.Group>
                </>
            )
        }else if(exercise.intTargetSets != null){
            let sets = [];
            for(let i = 1; i <= exercise.intTargetSets; i++){
                sets.push(i)
            }
            setDisp(
                <>
                    {sets.map(set=>{
                        return(
                            <Form.Group as={Row} key={set}>
                                <Form.Label column sm={{span:2}}>Set {set}:</Form.Label>
                                <Form.Label column sm={{span:2}}>Reps</Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="number" onChange={(e)=>pushToReps(e, set)} value={reps[set-1]} />
                                </Col>
                                <Col sm={2}>
                                    <Form.Control type="text"  value={time} onChange={(e)=>pushToWeights(e, set)} />
                                </Col>
                                <Form.Label column sm={{span:2}}>Weight (lbs)</Form.Label>

                            </Form.Group>
                        )
                    })}

                </>
            )
        }
    },[time, reps, weights, distance])

    const submit = async () => {
        
        if(exercise.tmTargetTime != null){
            let data = {
                exerciseid: exercise.intSessionExerciseID,
                time: time,
                distance: distance,
                weight: null,
                reps: null
            }
            fetch('/sessionResults/add', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            }).then(props.change_display(<SessionWorkout sessionid={match.params.sessionid} change_display={props.change_display}/>))
            .catch(err => console.log(err));
            
        }else if(exercise.intTargetSets != null){
            for(let i=0; i < exercise.intTargetSets; i++){
                let data ={
                    exerciseid: exercise.intSessionExerciseID,
                    time: null,
                    distance: null,
                    weight: weights[i],
                    reps: reps[i]
                }
                fetch('/sessionResults/add', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                });
            };
            props.change_display(<SessionWorkout sessionid={match.params.sessionid} change_display={props.change_display}/>)
        }

    }

    return (
        <>
            <h2>{exercise.strExerciseName}</h2><br />
            <hr />
            <Form>
                {disp}
                <Form.Group as={Row}>
                    <Col>
                        <Button onClick={()=>props.change_display(<SessionWorkout sessionid={match.params.sessionid} change_display={props.change_display}/>)}>Cancel</Button>
                    </Col>
                    <Col>
                        <Button onClick={()=>submit()}>Save</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
};

export default  RecordSessionExercise;