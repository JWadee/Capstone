import React, {useState, useEffect} from "react";
import {Accordion, Card,Row, Col, Button, ListGroup, div} from "react-bootstrap";
import { Route, Switch, useRouteMatch} from "react-router-dom";
import { connect } from 'react-redux';

import RecordSessionExercise from './RecordSessionExercise';
import SessionWorkout from './SessionWorkout';

const RecordSessionWorkout = (props) => {
    const [exercises, setExercises] = useState([]);
    const match = useRouteMatch();
    const [disp, setDisp] = useState()

    //Run on initial render, pull session exercises
    useEffect(()=>{
        const fetch_session_exercises = async () =>{
            const response = await fetch('/sessionExercises/bySession?sessionid='+match.params.sessionid+"&workoutid="+match.params.workoutid);
            const data = await response.json();
            setExercises(data);
        }

        fetch_session_exercises();
        setDisp(<SessionWorkout sessionid={match.params.sessionid} change_display={change_display}/>)
    },[])
    
    const change_display = (component) => {
        setDisp(component)
    };

    return (
        <div>
            {disp}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
        }
}


export default  connect(mapStateToProps)(RecordSessionWorkout);