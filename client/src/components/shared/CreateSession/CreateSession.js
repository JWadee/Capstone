import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';

import SessionDetails from './SessionDetails';
import DateAndTime from './DateAndTime';

const CreateSession = (props) => {
    const [step, setStep] = useState(1);
    const [typeID, setTypeID] = useState();
    const [teamID, setTeamID] = useState();
    const [clientID, setClientID] = useState();
    const [workoutID, setWorkoutID] = useState();
    const [date, setDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [types, setTypes] = useState([]);
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
            case 'start': setStartTime(event.target.value);
            return;
            case 'end': setEndTime(event.target.value);
            return;
        };
    }

    //Run on initial render to load exercise types
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

        fetch_sessiontypes();
    }, [])


    //Reset Team and Client ID based on selection of session type
    useEffect(()=>{
        if(typeID == 1){
            setTeamID();
            setClientID(); 
        }else if(typeID == 2){
            setClientID();
        }else if(typeID == 3){
            setTeamID();
        }
    },[typeID])

    let values = {typeID, teamID, clientID, workoutID, date, startTime, endTime, types, ID }

    switch(step){
        case 1:
            return (
                <SessionDetails nextStep={()=>nextStep()} handleChange={handleChange} values={values} />
            )
        case 2:
            return (
                <DateAndTime nextStep={()=>nextStep()} prevStep={()=>prevStep()} handleChange={handleChange} values={values} />
            )
    }
}


const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}

export default  connect(mapStateToProps)(CreateSession);