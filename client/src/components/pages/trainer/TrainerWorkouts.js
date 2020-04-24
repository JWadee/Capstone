import React, {useState, useEffect} from "react";
import {Table, Row, Col} from 'react-bootstrap'
import { connect } from 'react-redux';
import history from '../../../utils/history';

const TrainerWorkouts = (props) => {
    const [workouts, setWorkouts] = useState([]);


    useEffect(()=>{
        const get_workouts = async() => {
            const response = await fetch('/workouts/byTrainer?ID='+props.ID)   
                .catch(err => console.log(err))
            const data = await response.json();
            setWorkouts(data);
        }

        get_workouts();
    },[])

    const goToWorkout = (workoutid) => {
        //Push to workout component
        history.push('/trainer/my-workouts/workout/'+workoutid);
    }
    
    return (
        <div className="component">
            <Row>
                <Col sm={{span: 6, offset: 3}}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th><h3>My Workouts</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                            {workouts.map((workout)=>{ return (
                                <tr onClick={()=>goToWorkout(workout.intWorkoutID)} key={workout.intWorkoutID}>
                                    <td>
                                        {workout.strWorkoutName}
                                    </td>
                                </tr>         
                            )})}
                        </tbody>
                    </Table>
                </Col> 
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}


export default  connect(mapStateToProps)(TrainerWorkouts);