import React, {useState, useEffect} from "react";
import {ListGroup} from "react-bootstrap";

const Confirmation = (props) => {
    const [mainDisp, setMainDisp] = useState()
    const [muscleDisp, setMuscleDisp] = useState();
    const [groupDisp, setGroupDisp] = useState();
    const [typeDisp, setTypeDisp] = useState();
    const [StrFlxEx, setStrFlcEx] = useState();
    const values = props.values;

    const verify = () => {
        if(StrFlxEx){
            let data = {
                name : values.name,
                muscleID : values.muscleID,
                exerciseTypeID : values.exerciseTypeID,
                desc : values.desc
            }            
            return data;
        }else{
            let data = {
                name : values.name,
                muscleID : null,
                exerciseTypeID : values.exerciseTypeID,
                desc : values.desc
            }
            return data;
        }
    }

    const submit = () => {
        const data =  verify();
        console.log(data);
        //api parameters to create game
        const url ='/exercises/add'
        const options = {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json;charset=UTF-8'
                    }, 
                    body: JSON.stringify(data)
        }

        //call api
        fetch(url, options)
            .then(response=> {
                setMainDisp(
                    <div>
                        <h4>Exercise created successfully</h4>
                    </div>
                )
                return response.json();
            }).catch(error=>{
                console.log(error)
                setMainDisp(
                    <div>
                        <h4>There was an error on our end. Please try again.</h4>
                    </div>
                )
            })
    }

    const back  = (e) => {
        e.preventDefault();
        props.prevStep();
    }

    //Run on initial render, check if Flexibility or Strength exercise and set state variable 
    useEffect(()=>{
        if(values.exerciseTypeID == 2 || values.exerciseTypeID == 4) setStrFlcEx(true)
        else setStrFlcEx(false);
    },[])
    
    useEffect(()=>{
        if(StrFlxEx){
            let groupIndex; 
            let group = values.muscleGroups.find(function(item, i){
                if(item.intMuscleGroupID === values.muscleGroupID){
                    groupIndex = i;
                    return item;
                }
            });
            let muscleIndex; 
            let muscle = values.muscles.find(function(item, i){
                if(item.intMuscleID === values.muscleID){
                    muscleIndex = i;
                    muscleIndex = i;
                    return item;
                }
            });

            setGroupDisp(<ListGroup.Item>Muscle Group: {group.strMuscleGroup}</ListGroup.Item>)
            setMuscleDisp(<ListGroup.Item>Muscle: {muscle.strMuscle}</ListGroup.Item>)
            
        }else{
            setGroupDisp();
            setMuscleDisp();
        }

        if(values.exerciseTypeID == values.exerciseTypes.intExerciseTypeID){
            setTypeDisp(<ListGroup.Item>Type: {values.exerciseTypes.strExerciseType}</ListGroup.Item>)
        }
    },[StrFlxEx])

    useEffect(()=>{
        setMainDisp(
            <div>
                <ListGroup>
                    <ListGroup.Item>Exercise Name: {values.name}</ListGroup.Item>
                    {typeDisp}
                    {groupDisp}
                    {muscleDisp}
                    <ListGroup.Item>Instructions: {values.desc}</ListGroup.Item>
                </ListGroup>
                <span>
                <button onClick={(e)=> back(e)}>Back</button>
                    <button onClick={(e)=> submit(e)}>Confirm</button>
                </span>
            </div>)
        }, [muscleDisp, groupDisp])

    return (
        <div>
            {mainDisp}
        </div>
    );
};

export default Confirmation