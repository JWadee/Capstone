import React, {useState, useEffect} from "react";
import {ListGroup, Jumbotron, Row, Col} from 'react-bootstrap'
import { connect } from 'react-redux';

const TrainerTeams = (props) => {
    const [teams, setTeams] = useState([]);
    // const match = useRouteMatch();
    const match = props.match;

    useEffect(()=>{
        const fetch_teams = async() => {
            const response = await fetch('/teams/byTrainer?ID='+props.ID)   
                .catch(err => console.log(err))
            const data = await response.json();
            setTeams(data);
        }

        fetch_teams();
    },[])
    
    return (
        <Jumbotron>
            <h2>My Teams</h2><br />
            <hr />
            <ListGroup as={Row}>
                <Col sm={{span:4, offset:4}}>
                    {teams.map(team =>{
                        return(
                            <ListGroup.Item key={team.intTeamID} action href={match.url+"/team/"+team.intTeamID}>{team.strTeamName}</ListGroup.Item>
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


export default  connect(mapStateToProps)(TrainerTeams);