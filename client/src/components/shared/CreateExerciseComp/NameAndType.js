import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button} from 'react-bootstrap';

const NameAndType = (props) => {
    const [disabled, setDisabled] = useState(true)
    const values = props.values;

    const saveAndContinue = () => {
        props.nextStep()
    }
    
    /* Run anytime values prop changes
       Check that exercise has a name anf that type is selected*/
    useEffect(()=> {
        // if name is not empty and type is selected allow enable continue button
        if(values.name.length > 0 && values.exerciseTypeID > 0){
            setDisabled(false);
        }else setDisabled(true);
    },[values])

    //Options for exercise types drop down (map function runs for each object in the values.exerciseTypes array)
    let types = values.exerciseTypes.map(exerciseType => {
            //if the ID of the dropdown is == state value then set that option to selected
            if(exerciseType.intExerciseTypeID == values.exerciseTypeID){
                return <option selected key={exerciseType.intExerciseTypeID} value={exerciseType.intExerciseTypeID}>{exerciseType.strExerciseType}</option>
            }else{
                return <option  key={exerciseType.intExerciseTypeID} value={exerciseType.intExerciseTypeID}>{exerciseType.strExerciseType}</option>
            }
    })

    return (

        <Jumbotron>
            <h2>Exercise Information</h2><br />
            <hr></hr>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Exercise Name:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={props.handleChange('name')} defaultValue={values.name} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Type:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control as="select" onChange={props.handleChange('type')} value={values.exerciseTypeID}>
                            <option selected disabled hidden>Choose a Type</option>
                            {types}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 12 }}>
                        <Button disabled={disabled} onClick={(e)=> saveAndContinue(e)}>Save and Continue</Button>
                    </Col>
                </Form.Group>  
            </Form>
        </Jumbotron>    
    );
};

export default NameAndType