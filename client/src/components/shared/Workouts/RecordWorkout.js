import React, {useState, useEffect} from "react";
import {Navbar, NavDropdown, Nav, ListGroup, Jumbotron} from "react-bootstrap";
import { Route, Switch, useRouteMatch} from "react-router-dom";
import { connect } from 'react-redux';

const RecordWorkout = (props) => {
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
    console.log(exercises);
    
    return (
        <Jumbotron>
            <h2>Record Workout</h2><br />
            <hr />
            {exercises.map(exercise=>{
               return (
                   <ListGroup.Item key={exercise.intSessionExerciseID}>
                       <div>{exercise.strExerciseName}</div>
                       <div>{exercise.strTargetDescription}</div>
                   </ListGroup.Item> 
               )

            })}
        </Jumbotron>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
        }
}


export default  connect(mapStateToProps)(RecordWorkout);