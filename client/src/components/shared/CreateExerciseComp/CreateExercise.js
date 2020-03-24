import React, {useEffect, useState} from 'react'

import NameAndType from './NameAndType';
import MuscleAndGroup from './MuscleAndGroup';
import Instructions from './Instructions';
import Confirmation from './Confirmation';

const CreateExercise = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [exerciseTypeID, setExerciseTypeID] = useState();
    const [muscleGroupID, setMuscleGroupID] = useState();
    const [muscleID, setMuscleID] = useState();
    const [desc, setDesc] = useState('');
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [muscles, setMuscles] = useState([]);
    const [exerciseTypes, setExerciseTypes] = useState([]);


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
            case 'name': setName(event.target.value)
            return;
            case 'type': setExerciseTypeID(parseInt(event.target.value));
            return;
            case 'muscleGroup': setMuscleGroupID(parseInt(event.target.value));
            return;
            case 'muscle': setMuscleID(parseInt(event.target.value));
            return;
            case 'desc': setDesc(event.target.value);
            return;
        };
    }
    //Run on initial render to load exercise types
    useEffect(()=>{
        //function to fetch exercise types 
        async function fetch_exercisetypes(){
            //call api
            const response = await fetch('/exerciseTypes/')
                //catch any error
                .catch((error) => console.log(error));
                //store response.json into data variable
            const data = await response.json();
            //set exerciseTypes State variable to data 
            setExerciseTypes(data);
        }

        fetch_exercisetypes();
    }, [])

    //Run when exercise type ID changes
    useEffect(()=>{
        //function to fetch muscle groups
        async function fetch_musclegroups(){
            //call api
            const response = await fetch('/muscleGroups/')
                //catch any error
                .catch((error) => console.log(error));
            //store response.json into data variable
            const data = await response.json();
            //set muscleGroups State variable to data 
            setMuscleGroups(data);
        }

        fetch_musclegroups();
    }, [exerciseTypeID])
 
    //Run when muscle group ID changes
    useEffect(()=>{

        //function to fetch muscles by group 
        async function fetch_muscles_by_group(){
            //call api
            const response = await fetch('/muscles/byGroup?groupID='+muscleGroupID)
                //catch any error
                .catch((error) => console.log(error));
            //store response.json into data variable
            const data = await response.json();
            //set muscles State variable to data 
            setMuscles(data);
        }
        
        fetch_muscles_by_group();
    },[muscleGroupID])

    let values = {name, exerciseTypeID, muscleGroupID, muscleID, desc, exerciseTypes, muscleGroups, muscles};

    switch(step){
        case 1:
            return (
                <NameAndType nextStep={()=>nextStep()} handleChange={handleChange} values={values} />
            )
        case 2: 
            //Balance or Endurance exercise type (no need for muscle selection)
            if(exerciseTypeID == 3 || exerciseTypeID == 1){
                return (
                    <Instructions prevStep={()=> prevStep()} nextStep={()=>nextStep()} handleChange={handleChange} values={values} />
                )
            //Strength or Flexibility exercise type (need muscle selection)
            }else if(exerciseTypeID == 2 || exerciseTypeID == 4){
                return (
                    <MuscleAndGroup prevStep={()=> prevStep()} nextStep={()=>nextStep()} handleChange={handleChange} values={values} />
                )
            }
        case 3: 
            //Balance or Endurance exercise type step 3 - Confirm data
            if(exerciseTypeID == 3 || exerciseTypeID == 1){
                return (
                    <Confirmation prevStep={()=> prevStep()} values={values} />
                )
            //Strength or Flexibility exercise type step 3 - Instructions
            }else if(exerciseTypeID == 2 || exerciseTypeID == 4){
                return (
                    <Instructions prevStep={()=> prevStep()} nextStep={()=>nextStep()} handleChange={handleChange} values={values} />
                )
            }
        case 4: 
            //Strength or Flexibility exercise type step 3 - Instructions
            return(
                <Confirmation prevStep={()=> prevStep()} values={values} />
            )
    }
}

export default CreateExercise