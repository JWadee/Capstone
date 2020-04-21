import React, {useState, useEffect} from "react";
import {div, Row, Col, Table} from 'react-bootstrap'
import { connect } from 'react-redux';
import history from '../../../utils/history';

const TrainerTeams = (props) => {
    const [teams, setTeams] = useState([]);
    const match = props.match;

    useEffect(()=>{
        const fetch_teams = async() => {
            const response = await fetch('/teams/byTrainer?ID='+props.ID)   
                .catch(err => console.log(err))
            const data = await response.json();
            setTeams(data);
        }

        fetch_teams();
    },[props.ID])

    const goToTeam = (teamid) => {
        //Push to workout component
        history.push('/trainer/my-teams/team/'+teamid);
    }
    
    return (
        <div>
            <Row>
                <Col sm={{span: 6, offset: 3}}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th><h3>My Teams</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map(team =>{
                                return(
                                    <tr onClick={()=>goToTeam(team.intTeamID)} key={team.intTeamID}>
                                        <td>
                                            {team.strTeamName}
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


export default  connect(mapStateToProps)(TrainerTeams);