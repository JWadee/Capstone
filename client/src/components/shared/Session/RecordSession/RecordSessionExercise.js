import React, {useState, useEffect} from "react";
import {Col, Row, Button, Form} from "react-bootstrap";
import {useRouteMatch} from "react-router-dom";

import SessionWorkout from './SessionWorkout';


const RecordSessionExercise = (props) => {
    const [disp, setDisp] = useState();
    const [hours, setHours] = useState(Number);
    const [minutes, setMinutes] = useState(Number);
    const [seconds, setSeconds] = useState(Number);
    const [reps, setReps] = useState([]);
    const [weights, setWeights] = useState([]);
    const [distance, setDistance] = useState(Number);
    const [fields, setFields] = useState('');

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

    /*run when exercise changes, determine fields to record 
        t  = time
        td = time and distance
        r  = reps 
        rw = reps and weight
    */
    useEffect(()=>{
        if(exercise.recordTime === 1){
            if(exercise.recordDistance === 1){
                setFields('td');
            }else setFields('t');
        }else if (exercise.recordReps === 1){
            if(exercise.recordWeight === 1){
                setFields('rw');
            }else setFields('r');
        };
    },[exercise])

    //Run whenever component variables affecting the display change
    useEffect(()=>{
        let sets = [];
        for(let i = 1; i <= exercise.intTargetSets; i++){
            sets.push(i)
        }
        switch (fields){
            case 't':
                setDisp(
                    <Form.Group as={Row}>
                        <Form.Label column sm={{span:3}}>Time (hh:mm:ss):</Form.Label>
                        <Col sm={3} md={2} lg={2}>
                            <Form.Control type="number" onChange={(e)=>setHours(e.target.value)} value={hours} />
                        </Col>:
                        <Col sm={3} md={2} lg={2}>
                            <Form.Control type="number" onChange={(e)=>setMinutes(e.target.value)} value={minutes} />
                        </Col>:                               
                        <Col sm={3} md={2} lg={2}>
                            <Form.Control type="number" onChange={(e)=>setSeconds(e.target.value)} value={seconds} />
                        </Col>
                    </Form.Group>
                )
                break;
            case 'td':
                console.log('here')
                setDisp(
                    <>
                        <Form.Group as={Row}>
                            <Form.Label column sm={{span:3}}>Time (hh:mm:ss):</Form.Label>
                            <Col sm={3} md={2} lg={2}>
                                <Form.Control type="number" onChange={(e)=>setHours(e.target.value)} value={hours} />
                            </Col>:
                            <Col sm={3} md={2} lg={2}>
                                <Form.Control type="number" onChange={(e)=>setMinutes(e.target.value)} value={minutes} />
                            </Col>:                               
                            <Col sm={3} md={2} lg={2}>
                                <Form.Control type="number" onChange={(e)=>setSeconds(e.target.value)} value={seconds} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={{span:3}}>Distance (mi): </Form.Label>
                            <Col sm={3}>
                                <Form.Control type="number" onChange={(e)=>setDistance(e.target.value)} value={distance} />
                            </Col>
                        </Form.Group>
                    </>
                )
                break;
            case 'r':
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
                                </Form.Group>
                            )
                        })}
                    </>
                )
                break;
            case 'rw':
                console.log('hereee')

                setDisp(
                    <>
                        {sets.map(set=>{
                            return(
                                <>
                                    <Form.Group as={Row} key={set}>
                                        <Form.Label column sm={{span:2}}>Set {set}:</Form.Label>
                                        <Col sm={2}>
                                            <Form.Control type="number" onChange={(e)=>pushToReps(e, set)} value={reps[set-1]} />
                                        </Col>
                                        <Form.Label column sm={{span:2}}>Reps</Form.Label>

                                        <Col sm={2}>
                                            <Form.Control type="text"  value={weights[set-1]} onChange={(e)=>pushToWeights(e, set)} />
                                        </Col>
                                        <Form.Label column sm={{span:2}}>Weight (lbs)</Form.Label>
        
                                    </Form.Group>
                                </>
                            )
                        })}
                    </>
                )
                break;
        }

    },[fields, hours, minutes, seconds, reps, weights, distance])


    const submit = async () => {
        
        if(exercise.recordTime === 1){
            let data = {
                exerciseid: exercise.intSessionExerciseID,
                time: hours+":"+minutes+":"+seconds,
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
        <div>
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
        </div>
    );
};

export default  RecordSessionExercise;