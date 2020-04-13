import React, {useState, useEffect} from "react";
import {Row, Col, Button} from "react-bootstrap";
import { useRouteMatch} from "react-router-dom";


import SessionExercise from "./SessionExercise";

const SessionWorkout = (props) => {
    const [exercises, setExercises] = useState([]);
    const match = useRouteMatch();
    
    //Run on initial render, pull session exercises
    useEffect(()=>{
        const fetch_session_exercises = async () =>{
            const response = await fetch('/sessionExercises/bySession?sessionid='+match.params.sessionid+"&workoutid="+match.params.workoutid);
            const data = await response.json();
            setExercises(data);
        }

        fetch_session_exercises();
    },[])

    return (    
        <>            
            <h2>Record Workout</h2><br />
            <hr />
            {exercises.map((exercise)=>{ return (
                <SessionExercise exercise={exercise} sessionid={match.params.sessionid} change_display={props.change_display} key={exercise.intSessionExericseID} />
            )})}
              
        </>
    );
};

export default  SessionWorkout;


