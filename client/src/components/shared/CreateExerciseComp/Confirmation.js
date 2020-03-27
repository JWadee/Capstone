import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button, ListGroup} from 'react-bootstrap';

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
        .catch(error=>{
            console.log(error)
            setMainDisp(
                <div>
                    <h4>There was an error on our end. Please try again.</h4>
                </div>
            )
        }).fetch(url, options)
            .then(response=> {
                setMainDisp(
                    <div>
                        <h4>Exercise created successfully</h4>
                    </div>
                )
                return response.json();
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
            <Jumbotron>
                <h2>Confirmation</h2><br />
                <hr></hr>
                <ListGroup>
                    <ListGroup.Item>Exercise Name: {values.name}</ListGroup.Item>
                    {typeDisp}
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
            </Jumbotron>)
        }, [muscleDisp, groupDisp])

    return (
        <div>
            {mainDisp}
        </div>
    );
};

export default Confirmation