import React, {useEffect, useState} from "react";
import {div, Row, Col, Table} from 'react-bootstrap';
import { useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';
import history from '../../../utils/history';

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
    },[props.ID])

    const goToRoutine = (routineid) => {
        //Push to workout component
        history.push('/trainer/my-routines/routine/'+routineid);
    }
    
    return (
        <div fluid>
            <Row>
                <Col sm={{span: 6, offset: 3}}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th><h3>My Routines</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                        {routines.map((routine)=>{
                            return(
                                <tr onClick={()=>goToRoutine(routine.intRoutineID)} key={routine.intRoutineID}>
                                    <td>
                                        {routine.strRoutineName}
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

export default connect(mapStateToProps)(TrainerRoutines);