import React, {useState, useEffect} from "react";
import {div, Form, Row, Col, Button} from 'react-bootstrap';

const Instructions = (props) => {
    const [disabled, setDisabled] = useState();
    const values = props.values;

    const saveAndContinue = (e) => {
        e.preventDefault()
        props.nextStep()
    }
    
    const back  = (e) => {
        e.preventDefault();
        props.prevStep();
    }
    
    /* Run anytime values prop changes
    Check that instructions are not empty*/
    useEffect(()=> {
        // if instructions are not empty allow enable continue button
        if(values.desc.length > 0){
            setDisabled(false);
        }else setDisabled(true);
    },[values])

    return (
        
        <div>
            <h2>Exercise Instructions</h2><br />
            <hr></hr>
            <Form>
                <Form.Group >
                    <Form.Label>Instructions:</Form.Label>
                    <Form.Control as="textarea" rows="2" onChange={props.handleChange('desc')} defaultValue={values.desc} />
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
        </div>    
    );
};

export default Instructions