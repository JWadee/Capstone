import React, {useEffect, useState} from "react";
import {div, ListGroup, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { useRouteMatch } from "react-router-dom";

const InProgressSessions = (props) => {
    const [sessions, setSessions] = useState([]);
    const [start, setStart] = useState(false);
    const [end, setEnd] = useState(false);
    const match = useRouteMatch();

    useEffect(()=>{
        const fetch_sessions = async () =>{
            const response = await fetch('/sessions/inProgress/byOwner?ID='+props.ID);
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

    //Function to format date as dd-mm
    const formatDate = (session) => {
        const date = new Date(session.dtmDate);
        const formatted_date = (date.getMonth() + 1)+ "-" + date.getDate();
        return formatted_date;
    }

    const format_time = (time) =>{
        //split string into hours and minutes
        const split = time.split(":", 2)
        let hours = split[0];
        const minutes = split[1];
        
        /** CHECK HOURS FOR AM OR PM TIME */

        //if hours has leading zero, remove and set to AM
        if(hours.startsWith("0")){
            hours = hours.substring(1,2)
            const result = {
                hours: hours,
                minutes: minutes,
                AMPM: 'AM'
            }
            return result;
        //else check if > 12, subtract 12 and set to PM
        }else{
            hours = parseInt(hours);
            if(hours > 12){
                hours = hours - 12 ;
                const result = {
                    hours: hours,
                    minutes: minutes,
                    AMPM: 'PM'
                }
                return result;
            }else if(hours <= 12){
                const result = {
                    hours: hours,
                    minutes: minutes,
                    AMPM: 'AM'
                }
                return result;
            }
        }
        
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
        <div className="component">
            <h2>Sessions In Progress</h2>
            <ListGroup as={Row}>
                {sessions.map((session)=>{
                    let strDay = getDay(session);
                    let formatted_date = formatDate(session);
                    let start = format_time(session.tmStartTime);
                    let end = format_time(session.tmEndTime)
                    let team =  fetch_team(session);

                    return(
                    <Col sm={{span:4, offset:4}} key={session.intSessionID}>
                        <ListGroup.Item action key={session.intSessionID} href={"/trainer/sessions/session/"+session.intSessionID+"/record/workout/"+session.intWorkoutID}>
                            <div>
                                <p>{strDay +", "+formatted_date}</p>
                            </div>
                            <div>
                                <div><p>From: {start.hours+":"+start.minutes+start.AMPM+" - "+end.hours+":"+end.minutes+end.AMPM}</p></div>
                            </div> 
                        </ListGroup.Item>
                    </Col>
                    )
                })}
            </ListGroup>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}


export default  connect(mapStateToProps)(InProgressSessions);

