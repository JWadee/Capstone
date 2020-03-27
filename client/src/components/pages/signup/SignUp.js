import React, {useEffect, useState} from 'react'

import AccountType from './AccountType';
import PersonalInfo from './PersonalInfo';
import Demographics from './Demographics';
import Confirmation from './Confirmation';

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [accountTypeID, setAccountTypeID] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [DOB, setDOB] = useState('');
    const [height, setHeight] = useState();
    const [feet, setFeet] = useState();
    const [inches, setInches] = useState();
    const [weight, setWeight] = useState();
    const [raceID, setRaceID] = useState();
    const [genderID, setGenderID] = useState();
    const [bodyTypeID, setBodyTypeID] = useState();
    const [accountTypes, setAccountTypes] = useState([]);
    const [genders, setGenders] = useState([]);
    const [races, setRaces] = useState([]);
    const [bodyTypes, setBodyTypes] = useState([]);


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
            case 'accountType': setAccountTypeID(event.target.value)
            return;
            case 'firstName': setFirstName(event.target.value)
            return;
            case 'lastName': setLastName(event.target.value)
            return;
            case 'email': setEmail(event.target.value)
            return;
            case 'pass': setPass(event.target.value);
            return;
            case 'DOB': setDOB(event.target.value);
            return;
            case 'height': setHeight(event.target.value);
            return;
            case 'weight': setWeight(event.target.value);
            return;
            case 'race': setRaceID(event.target.value)
            return;
            case 'gender': setGenderID(event.target.value)
            return;
            case 'bodyType': setBodyTypeID(event.target.value)
            return;
            case 'feet': setFeet(event.target.value)
            return;
            case 'inches': setInches(event.target.value)
            return;
        };
    }

    //Run on initial render.. fetch account types, genders, races, body types
    useEffect(()=>{
        //function to fetch account types
        async function fetch_accountTypes(){
            //call api
            const response = await fetch('/accounts/types')
                //catch any error
                .catch((error) => console.log(error));
                //store response.json into data variable
            const data = await response.json();
            //set exerciseTypes State variable to data 
            setAccountTypes(data);
        }
        
        //function to fetch races
        async function fetch_races(){
            //call api
            const response = await fetch('/races/')
                //catch any error
                .catch((error) => console.log(error));
                //store response.json into data variable
            const data = await response.json();
            //set exerciseTypes State variable to data 
            setRaces(data);
        }
                
        //function to fetch genders
        async function fetch_genders(){
            //call api
            const response = await fetch('/genders/')
                //catch any error
                .catch((error) => console.log(error));
                //store response.json into data variable
            const data = await response.json();
            //set exerciseTypes State variable to data 
            setGenders(data);
        }              

        //function to fetch body types
        async function fetch_bodyTypes(){
            //call api
            const response = await fetch('/bodyTypes/')
                //catch any error
                .catch((error) => console.log(error));
                //store response.json into data variable
            const data = await response.json();
            //set exerciseTypes State variable to data 
            setBodyTypes(data);
        }

        fetch_accountTypes();
        fetch_races();
        fetch_genders();
        fetch_bodyTypes();
    }, [])

    // Run when feet or inches change, calculate total inches of height
    useEffect(()=>{
        let totalInches = parseInt(feet)*12+parseInt(inches);
        setHeight(totalInches);
    },[feet, inches])

    let values = {accountTypeID, firstName, lastName, email, pass, DOB, height, weight, raceID, genderID, bodyTypeID, races, accountTypes, genders, bodyTypes, feet, inches};

    switch(step){
        case 1:
            return (
                <AccountType nextStep={()=>nextStep()} handleChange={handleChange} values={values} />
            )
        case 2:
            return ( 
                <PersonalInfo nextStep={()=>nextStep()} prevStep={()=>prevStep()} handleChange={handleChange} values={values} />
            )
        case 3: 
            return ( 
                <Demographics nextStep={()=>nextStep()} prevStep={()=>prevStep()} handleChange={handleChange} values={values} />
            )
        case 4: 
            return(
                <Confirmation prevStep={()=> prevStep()} values={values} />
            )
    }
}

export default SignUp