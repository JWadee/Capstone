import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button, Alert} from 'react-bootstrap'
import { connect } from 'react-redux';

const AddWorkouttoRoutine = (props) => {
    const [workout, setWorkout] = useState('');
    const [workoutID, setWorkoutID] = useState(-1);
    const [workoutTypeID, setWorkoutTypeID] = useState(Number);
    const [errorMessage, setErrorMessage] = useState();
    const [mainDisp, setMainDisp] = useState();


    useEffect(()=>{
        setMainDisp(
            <Jumbotron>
            <h2>Add Workout to Routine</h2><br />
            <hr></hr>
            <Form title="Add Workout to Routine"> 
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Workout</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setWorkout(e.target.value)}></Form.Control>
                        {errorMessage}
                    </Col>
                </Form.Group>
                
            <Form.Group as={Row}>
             <Form.Label column sm={{span:3, offset:2}}>Routine</Form.Label>
             <Col sm={10} md={4} lg={3}>
                 <Form.Control as="select" value="Choose...">                             
                    <option>Choose Routine</option>
                    </Form.Control>
                    </Col>
                    </Form.Group>    

                    <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 4  }}>
                        <Button type="submit" onClick={(e) => submit(e)} >Add Workout</Button>
                    </Col>
                </Form.Group>
             </Form>
             </Jumbotron>
       )
    },[errorMessage])

    //function to get account workout
    const getID = async () => {
        const response = await fetch('/accounts/byWorkout?workout='+workout);
        const data = await response.json();
        setWorkoutID(data.ID)
    }

    //function to get account by ID 
    const getAccount = async () => {
        if(workoutID > 0){
            const response = await fetch('/accounts/byID?ID='+workoutID);
            const data = await response.json();
            console.log(data)
            setWorkoutTypeID(data[0].intAccountTypeID);
        }else if (workoutID == 0){
            setErrorMessage(<Alert variant="danger"> Workout do not exists. </Alert>)
        }
    }



    //Run whenever workout ID is set
    useEffect(()=>{
        if(workoutID > -1){
            getAccount();
        }
    },[workoutID])

    const submit = async (e) => {
        // let exp = await getID();
        e.preventDefault();
        await getID();
    }
   

   
    
    const addWorkout = async() => {
        const body = {
            trainerID: props.ID, 
            workoutID: workoutID
        }

        //api parameters to create game
        const url ='/trainerClients/add'
        const options = {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json;charset=UTF-8'
                    }, 
                    body: JSON.stringify(body)
        }

        //call api
        fetch(url, options)
            .catch(error=>{
                console.log(error)
                setMainDisp(
                    <Jumbotron>
                        <h4>There was an error on our end. Please try again.</h4>
                    </Jumbotron>
                )
                return;
            }).then(()=> {
                    setMainDisp(
                    <Jumbotron>
                        <h4>Workout Added</h4>
                    </Jumbotron>
                    )
            })
    }

    useEffect(()=>{
        if(workoutTypeID === 2){
            addWorkout();                
        }else if(workoutTypeID > 0 && workoutTypeID < 5){
            setErrorMessage(<Alert variant="danger"> Workout does not exists.</Alert>)
        } 
    },[workoutTypeID])

    return (
        <div>
            {mainDisp}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}


export default  connect(mapStateToProps)(AddWorkouttoRoutine);

