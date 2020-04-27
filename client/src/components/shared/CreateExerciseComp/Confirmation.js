import React, {useState, useEffect} from "react";
import {Row, Col, Button, ListGroup} from 'react-bootstrap';

const Confirmation = (props) => {
    const [mainDisp, setMainDisp] = useState()
    const [muscleDisp, setMuscleDisp] = useState(<h1>h</h1>);
    const [groupDisp, setGroupDisp] = useState();
    const [typeDisp, setTypeDisp] = useState();
    const [StrFlxEx, setStrFlcEx] = useState();
    const [recDisp, setRecDisp] = useState();

    const values = props.values;

    const verify = () => {
        if(StrFlxEx){
            let data = {
                name : values.name,
                muscleID : values.muscleID,
                exerciseTypeID : values.exerciseTypeID,
                desc : values.desc,
                recTime: values.recTime,
                recDistance:values.recDistance,
                recReps:values.recReps,
                recWeight: values.recWeight
            }            
            return data;
        }else{
            let data = {
                name : values.name,
                muscleID : null,
                exerciseTypeID : values.exerciseTypeID,
                desc : values.desc,
                recTime: values.recTime,
                recDistance:values.recDistance,
                recReps:values.recReps,
                recWeight: values.recWeight
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

        fetch(url, options)
            .then(response=> {
                setMainDisp(
                    <div>
                        <h4>Exercise created successfully</h4>
                    </div>
                )
                return response.json();
            })//call api
        .catch(error=>{
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

    //Run on initial render, check if Flexibility or Strength exercise and set state variable, recording display 
    useEffect(()=>{
        if(values.exerciseTypeID == 2 || values.exerciseTypeID == 4){
            setStrFlcEx(true);
        }else setStrFlcEx(false);
    },[])

    useEffect(()=>{
        //set record display
        if(values.recReps === true){
            if(values.recWeight === true){
                setRecDisp(<ListGroup.Item>Record: Reps and Weight</ListGroup.Item>)
            }else{
                setRecDisp(<ListGroup.Item>Record: Reps</ListGroup.Item>)
            }
        }else if(values.recTime === true){
            if(values.recDistance === true){
                setRecDisp(<ListGroup.Item>Record: Time and Distance</ListGroup.Item>)
            }else{
                setRecDisp(<ListGroup.Item>Record: Time</ListGroup.Item>)
            }
        }else{
            setRecDisp(<ListGroup.Item>Record: No results recorded</ListGroup.Item>)
        }
    },[values])
    
    useEffect(()=>{
        let type = values.exerciseTypes.find(function(item){
            if(item.intExerciseTypeID === values.exerciseTypeID){
                return item;
            }
        });

        if(StrFlxEx === true){
            let group = values.muscleGroups.find(function(item){
                if(item.intMuscleGroupID === values.muscleGroupID){
                    return item;
                }
            });
            let muscle = values.muscles.find(function(item){
                if(item.intMuscleID === values.muscleID){
                    return item;
                }
            });
            setTypeDisp(<ListGroup.Item>Type: {type.strExerciseType}</ListGroup.Item>)
            setGroupDisp(<ListGroup.Item>Muscle Group: {group.strMuscleGroup}</ListGroup.Item>)
            setMuscleDisp(<ListGroup.Item>Muscle: {muscle.strMuscle}</ListGroup.Item>)
            
        }else{
            setTypeDisp(<ListGroup.Item>Type: {type.strExerciseType}</ListGroup.Item>)
            setGroupDisp();
            setMuscleDisp();
        }

    },[StrFlxEx])

    useEffect(()=>{
        setMainDisp(
            <div className="component">
                <h2>Confirmation</h2>
                <ListGroup>
                    <ListGroup.Item>Exercise Name: {values.name}</ListGroup.Item>
                    {typeDisp}
                    {recDisp}
                    {groupDisp}
                    {muscleDisp}
                    <ListGroup.Item>Instructions: {values.desc}</ListGroup.Item>
                </ListGroup>
                <Row>
                    <Col sm={{ span: 3, offset: 3  }}>
                        <Button onClick={(e)=> back(e)}>Back</Button>
                    </Col>
                    <Col sm={{ span: 3 }}>
                        <Button onClick={(e)=> submit(e)}>Confirm</Button>
                    </Col>
                </Row>
            </div>)
        }, [muscleDisp, groupDisp])

    return (
        <div>
            {mainDisp}
        </div>
    );
};

export default Confirmation