import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button} from 'react-bootstrap';


const MuscleAndGroup = (props) => {
    const [disabled, setDisabled] = useState(true)
    const [muscles, setMuscles] = useState(true)
    const values = props.values;

    const saveAndContinue = (e) => {
        e.preventDefault()
        props.nextStep()
    }

    const back  = (e) => {
        e.preventDefault();
        props.prevStep();
    }

    //Muscle Group Options for select
    let groups = values.muscleGroups.map(group => {
        if(group.intMuscleGroupID == values.muscleGroupID){
            return <option selected key={group.intMuscleGroupID} value={group.intMuscleGroupID}>{group.strMuscleGroup}</option>
        }else{
            return <option  key={group.intMuscleGroupID} value={group.intMuscleGroupID}>{group.strMuscleGroup}</option>
        }
    })

    //Muscle Options for select
    let muscleOpts = values.muscles.map(muscle => {
        if(muscle.intMuscleID == values.muscleID){
            return <option selected key={muscle.intMuscleID} value={muscle.intMuscleID}>{muscle.strMuscle}</option>
        }else{
            return <option key={muscle.intMuscleID} value={muscle.intMuscleID}>{muscle.strMuscle}</option>
        }} 
    )

    /* Run anytime values prop changes
       Check that muscle group ID & muscle ID > 0 & muscle is selected
    */
    useEffect(()=> {
        // if nmuscle id and group id > 0 allow enable continue button
        if(values.muscleID > 0 && values.muscleGroupID > 0){
            setDisabled(false);
        }else setDisabled(true);
        
        //Load muscle groups
        setMuscles(
            <Form.Control as="select" onLoad={props.handleChange('muscle')} onChange={props.handleChange('muscle')}>
                <option selected disabled hidden>Choose a Muscle</option>
                {muscleOpts}
            </Form.Control>
        )
    },[values])

    /* Run anytime muscle group selection changes
       Reload muscle dropdown*/
    useEffect(()=> {    
        setMuscles(
            <Form.Control as="select" onChange={props.handleChange('muscle')}>
                {muscleOpts}
                <option selected disabled hidden>Choose a Muscle</option>
            </Form.Control>
        )
    },[values.muscleGroupID])




    return (

        
        <Jumbotron>
            <h2>Exercise Details</h2><br />
            <hr></hr>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Muscle Group:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control as="select" onChange={props.handleChange('muscleGroup')} value={values.raceID}>
                            <option selected disabled hidden>Choose a Group</option>
                            {groups}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Muscles:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        {muscles}
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 3, offset: 3  }}>
                        <Button onClick={(e)=> back(e)}>Back</Button>
                    </Col>
                    <Col sm={{ span: 3 }}>
                        <Button disabled={disabled} onClick={(e)=> saveAndContinue(e)}>Save and Continue</Button>
                    </Col>
                </Form.Group>   
            </Form>
        </Jumbotron>    
    );
};

export default MuscleAndGroup