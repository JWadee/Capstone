import React, {useEffect, useState} from "react";
import {Jumbotron, ListGroup, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { useRouteMatch } from "react-router-dom";

const TrainerSessions = (props) => {
    const [sessions, setSessions] = useState([]);
    const match = useRouteMatch();

    useEffect(()=>{
        const fetch_sessions = async () =>{
            const response = await fetch('/sessions/active/byOwner?ID='+props.ID);
            const data = await response.json();
            setSessions(data);
        };

        fetch_sessions();
    },[])

    const getDay = (session) =>{
        const date = new Date(session.dtmDate);
        const day = date.getDay();
        let strDay = '';
        // Sunday - Saturday : 0 - 6
        if(day === 0){
            strDay = 'Sunday';
            return strDay;
        }else if(day === 1){
            strDay = 'Monday';
            return strDay;
        }else if(day === 2){
            strDay = 'Tuesday';
            return strDay;
        }else if(day === 3){
            strDay = 'Wednesday';
            return strDay;
        }else if(day === 4){
            strDay = 'Thursday';
            return strDay;
        }else if(day === 5){
            strDay = 'Friday';
            return strDay;
        }else if(day === 6){
            strDay = 'Saturday';
            return strDay;
        }

    }

    const formatDate = (session) => {
        const date = new Date(session.dtmDate);
        const formatted_date = (date.getMonth() + 1)+ "-" + date.getDate();
        return formatted_date
    }

    const fetch_client = async (session) => {
        if(session.intClientID != null){
            const response = await fetch('/accounts/byID?ID='+session.intClientID);
            const data = await response.json();
            return data;
        }else return false;
    } 

    const fetch_team = async (session) => {
        if(session.intTeamID != null){
            const response = await fetch('/teams/byID?ID='+session.intTeamID);
            const data = await response.json();
            return data;
        }else return false;
    } 


    return (
        <Jumbotron fluid>
            <h2>My Schedule</h2><br />
            <hr />
        
            <ListGroup as={Row}>
                {sessions.map((session)=>{
                    let strDay = getDay(session);
                    let formatted_date = formatDate(session);
                    let team =  fetch_team(session);

                    return(
                    <Col sm={{span:4, offset:4}} key={session.int}>
                        <ListGroup.Item action key={session.intSessionID} href={match.url+"/session/"+session.intSessionID}>
                            <div>
                                <p>{strDay +", "+formatted_date}</p>
                            </div>
                            <div>
                                <p>{session.tmStartTime + "-" + session.tmEndTime}</p>
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


export default  connect(mapStateToProps)(TrainerSessions);

