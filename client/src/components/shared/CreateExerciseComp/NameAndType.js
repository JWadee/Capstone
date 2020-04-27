import React, {useState, useEffect} from "react";
import {Form, Row, Col, Button} from 'react-bootstrap';

const NameAndType = (props) => {
    const [disabled, setDisabled] = useState(true)
    const [condDisp, setCondDisp] = useState()
    const values = props.values;

    const saveAndContinue = () => {
        props.nextStep()
    }
    
    /* ----- Run anytime values prop changes -----
       --Check that exercise has a name anf that type is selected
       --Check record, set conditional disp
    */
    useEffect(()=> {
        // if name is not empty, type is selected, and record is selected allow enable continue button
        if(values.name.length > 0 && values.exerciseTypeID > 0 && values.record.length > 1){
            setDisabled(false);
        }else setDisabled(true);

        //Set cond disp based on record
        if(values.record === '' || values.record === 'neither'){
            setCondDisp();
        }else if(values.record === 'reps'){
            setCondDisp(
                <Form.Group as={Row}>
                    <Col>
                        <Form.Check label="Record Weight" type="checkbox" checked={values.additionalRecord} onChange={props.handleChange('additionalrecord')}/>
                    </Col>
                </Form.Group>    
            )
        }else if(values.record === 'time'){
            setCondDisp(
                <Form.Group as={Row}>
                    <Col>
                        <Form.Check label="Record Distance" type="checkbox" checked={values.additionalRecord} onChange={props.handleChange('additionalrecord')}/>
                    </Col>
                </Form.Group>    
            )
        }
    },[values])

    return (
        <div className="component">
            <h2>Exercise Information</h2>
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
                            <option value={0} disabled hidden>Choose a Type</option>
                            {values.exerciseTypes.map(type => {
                                return(
                                    <option key={type.intExerciseTypeID} value={type.intExerciseTypeID}>{type.strExerciseType}</option>
                                )
                            })}
                        </Form.Control>
                    </Col>
                </Form.Group>            
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>What to Record: </Form.Label>
                    <Col sm={10} md={4} lg={3} >
                        <Form.Control as="select" onChange={props.handleChange('record')} value={values.record}>
                            <option value={''} disabled hidden>Select One</option>
                            <option value={'reps'}>Reps</option>
                            <option value={'time'}>Time</option>
                            <option value={'neither'}>Neither</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                {condDisp}
                <Form.Group as={Row}>
                    <Col sm={{ span: 12 }}>
                        <Button disabled={disabled} onClick={(e)=> saveAndContinue(e)}>Save and Continue</Button>
                    </Col>
                </Form.Group>  
            </Form>
        </div>    
    );
};

export default NameAndType