import React, {useState, useEffect} from "react";
import {ListGroup, Jumbotron, Nav, Row, Col} from 'react-bootstrap'
import { connect } from 'react-redux';

const TrainerWorkouts = (props) => {
    const [workouts, setWorkouts] = useState([]);
    // const match = useRouteMatch();
    const match = props.match;

    useEffect(()=>{
        const get_workouts = async() => {
            const response = await fetch('/workouts/byTrainer?ID='+props.ID)   
                .catch(err => console.log(err))
            const data = await response.json();
            setWorkouts(data);
        }

        get_workouts();
    },[])
    
    return (
        <Jumbotron>
            <h2>My Workouts</h2><br />
            <hr />
            <ListGroup as={Row}>
                <Col sm={{span:4, offset:4}}>
                    {workouts.map(workout =>{
                        return(
                            <ListGroup.Item key={workout.intWorkoutID} action href={match.url+"/workout/"+workout.intWorkoutID}>{workout.strWorkoutName}</ListGroup.Item>
                        ) 
                    })}
                </Col>
            </ListGroup>
        </Jumbotron>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}


export default  connect(mapStateToProps)(TrainerWorkouts);