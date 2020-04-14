import React, {useState, useEffect} from "react";
import {Row, Col, Button} from "react-bootstrap";

import RecordSessionExercise from "./RecordSessionExercise";

const SessionExercise = (props) => {
    const [results, setResults] = useState([]);
    const [condDisp, setCondDisp] = useState();
    const exercise = props.exercise;
    
    
    //Run when exercises changes, check each session exercise for existing results 
    useEffect(()=>{
        const check_for_results = async(sessionExercise) => {
            const response = await fetch('/sessionResults/byExercise?exerciseid='+sessionExercise);
            const data  = await response.json()
            setResults(data);
        }
        
        check_for_results(exercise.intSessionExerciseID);
    },[exercise])
    
    useEffect(()=>{
        if(results.length > 0 ){
            setCondDisp(<h3>&#10004;</h3>)
        }else setCondDisp(<Button onClick={()=> props.change_display(<RecordSessionExercise exercise={exercise} change_display={props.change_display}/>)} >Enter Results</Button>)
    },[results])

    return (    
        <>
            <Row key={exercise.intSessionExerciseID}>
                <Col>
                    <p>{exercise.strExerciseName}</p> 
                </Col>
                <Col>
                    <p>{exercise.strTargetDescription}</p>   
                </Col>
                <Col>
                    {condDisp}
                </Col>
            </Row>
        </>
    );
};

export default  SessionExercise;

