import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';

import SessionDetails from './SessionDetails';
import DateAndTime from './DateAndTime';
import SessionWorkout from './SessionWorkout';
import Confirmation from './Confirmation';

const CreateSession = (props) => {
    const [step, setStep] = useState(1);
    const [typeID, setTypeID] = useState(null);
    const [teamID, setTeamID] = useState(null);
    const [clientID, setClientID] = useState(null);
    const [workoutID, setWorkoutID] = useState(null);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [startHour, setStartHour] = useState('1');
    const [startMinute, setStartMinute] = useState('00');
    const [startAMPM, setStartAMPM] = useState('AM');
    const [endHour, setEndHour] = useState('1');
    const [endMinute, setEndMinute] = useState('00');
    const [endAMPM, setEndAMPM] = useState('AM');
    const [types, setTypes] = useState([]);
    const [teams, setTeams] = useState([]);
    const [clients, setClients] = useState([]);
    const [workouts, setWorkouts] = useState([]);

    let ID = props.ID;

    //Method to go to next step
    function nextStep(){
        setStep(step+1);
    }
    //Method to go to previous step
    function prevStep(){
        setStep(step-1);
    }

    const handleChange = input => event => {
        switch(input){
            case 'typeID': setTypeID(parseInt(event.target.value));
            return;
            case 'teamID': setTeamID(parseInt(event.target.value));
            return;
            case 'clientID': setClientID(parseInt(event.target.value));
            return;
            case 'workoutID': setWorkoutID(parseInt(event.target.value));
            return;
            case 'date': setDate(event.target.value);
            return;
            case 'startHour': setStartHour(event.target.value);
            return;
            case 'startMinute': setStartMinute(event.target.value);
            return;
            case 'startAMPM': setStartAMPM(event.target.value);
            return;
            case 'endHour': setEndHour(event.target.value);
            return;
            case 'endMinute': setEndMinute(event.target.value);
            return;
            case 'endAMPM': setEndAMPM(event.target.value);
            return;
        };
    }

    //Run on initial render to load session types, clients, teams, and workouts
    useEffect(()=>{
        //function to fetch exercise types 
        async function fetch_sessiontypes(){
            //call api
            const response = await fetch('/sessions/types')
                //catch any error
                .catch((error) => console.log(error));
                //store response.json into data variable
            const data = await response.json();
            //set exerciseTypes State variable to data 
            setTypes(data);
        }
        const fetch_teams = async () => {
            const response = await fetch('/teams/byTrainer?ID='+values.ID);
            const data = await response.json();
            setTeams(data)
        }

        const fetch_clients = async () => {
            const response = await fetch('/trainerClients/byTrainer?ID='+values.ID);
            const data = await response.json();
            setClients(data)
        }

        const fetch_workouts = async () => {
            const response = await fetch('/workouts/byTrainer?ID='+values.ID);
            const data = await response.json();
            setWorkouts(data)
        }

        fetch_workouts();
        fetch_teams();
        fetch_clients();
        fetch_sessiontypes();
    }, [])


    //Reset Team and Client ID based on selection of session type
    useEffect(()=>{
        if(typeID == 1){
            setTeamID(null);
            setClientID(null); 
        }else if(typeID == 2){
            setClientID(null);
        }else if(typeID == 3){
            setTeamID(null);
        }
    },[typeID])


    //Change start time
    useEffect(()=>{
        if(startAMPM ==='PM'){
            let hour = parseInt(startHour)+12;
            setStartTime(
                hour+":"+startMinute
            )
        }else{
            setStartTime(
                startHour+":"+startMinute
            )
        }
    },[startMinute, startHour, startAMPM])

    //Change end time
    useEffect(()=>{
        if(endAMPM === 'PM'){
            let hour = parseInt(endHour)+12;
            setEndTime(
                hour+":"+endMinute
            )
        }else{
            setEndTime(
                endHour+":"+endMinute
            )
        }
    },[endHour, endMinute, endAMPM])
    
    
    let values = {typeID, teamID, clientID, workoutID, date, startTime, endTime, types, ID, startHour, startMinute, endHour, endMinute, startAMPM, endAMPM, teams, clients, workouts}

    switch(step){
        case 1:
            return (
                <SessionDetails nextStep={()=>nextStep()} handleChange={handleChange} values={values} />
            )
        case 2:
            return (
                <DateAndTime nextStep={()=>nextStep()} prevStep={()=>prevStep()} handleChange={handleChange} values={values} />
            )
        case 3:
            return (
                <SessionWorkout nextStep={()=>nextStep()} prevStep={()=>prevStep()} handleChange={handleChange} values={values} />
            )
        case 4:
            return (
                <Confirmation prevStep={()=>prevStep()} values={values} />
            )
    }
}


const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}

export default  connect(mapStateToProps)(CreateSession);