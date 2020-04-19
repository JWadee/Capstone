import React, {useEffect, useState} from "react";
import {Jumbotron, ListGroup, Row, Col} from 'react-bootstrap';
import { useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';

const TrainerRoutines = (props) => {
    const [routines, setRoutines] = useState([]);
    const match = useRouteMatch();

    useEffect(()=>{
        const fetch_routines = async () =>{
            const response = await fetch('/routines/byTrainer?id='+props.ID);
            const data = await response.json();
            setRoutines(data);
        };

        fetch_routines();
    },[])

    return (
        <Jumbotron fluid>
            <h2>My Routines</h2><br />
            <hr />
        
            <ListGroup as={Row}>
                {routines.map((routine)=>{
                    return(
                    <Col sm={{span:4, offset:4}} key={routine.intRoutineID}>
                        <ListGroup.Item action key={routine.intRoutineID} href={match.url+"/routine/"+routine.intRoutineID}>
                            <div>
                                <p>{routine.strRoutineName}</p>
                            </div>
                        </ListGroup.Item>
                    </Col>
                    )
                })}
            </ListGroup>
        </Jumbotron>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}

export default connect(mapStateToProps)(TrainerRoutines);