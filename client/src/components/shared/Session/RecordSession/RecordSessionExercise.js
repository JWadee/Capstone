import React, {useState, useEffect} from "react";
import {Card, Col, Row, Button, Form} from "react-bootstrap";
import {useRouteMatch} from "react-router-dom";

import SessionWorkout from './SessionWorkout';


const RecordSessionExercise = (props) => {
    const [disp, setDisp] = useState();
    const [time, setTime] = useState();
    const match = useRouteMatch();

    const exercise = props.exercise;

    //Run on initial render to set disp
    useEffect(()=>{
        if(exercise.tmTargetTime != null){
            setDisp(
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={{span:3, offset:2}}>Time:</Form.Label>
                        <Col sm={10} md={4} lg={3}>
                            <Form.Control type="text" onChange={setTime('time')} value={time} />
                        </Col>
                    </Form.Group>
                </Form>
            )
        }else if(exercise.intTargetSets != null){
            let sets = [];
            for(let i = 1; i <= exercise.intTargetSets; i++){
                sets.push(i)
            }
            setDisp(
                <Form>
                    {sets.map(set=>{
                        return(
                        <>
                            <Form.Group as={Row} key={set}>
                                <Form.Label column sm={{span:2}}>Set {set}:</Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="text" onChange={(e)=>setTime(e.target.value)} value={time} />
                                </Col>
                                <Form.Label column sm={{span:2}}>Reps</Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="text"  value={time} onChange={(e)=>setTime(e.target.value)} />
                                </Col>
                                <Form.Label column sm={{span:2}}>Weight (lbs)</Form.Label>
                            </Form.Group>
                        </>
                        )
                    })}

                </Form>
            )
        }
    },[])
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
                        <Button>Save</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
};

export default  RecordSessionExercise;