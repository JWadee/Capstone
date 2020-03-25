import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button, Alert, Image} from 'react-bootstrap'
import bodytypes from '../../../images/bodytypes.jpg';

const Demographics = (props) => {
    const [lbsError, setLbsError] = useState();
    const [feetError, setFeetError] = useState();
    const [inchesError, setInchesError] = useState();
    const values = props.values;
    
    const saveAndContinue = (e) => {
        e.preventDefault()

        let verified = verify();

        if(verified === true){
            props.nextStep()
        } 
    }

    const back = (e) => {
        e.preventDefault()
        props.prevStep()
    }

    const verify = () =>{
        let lbsVerify = false;
        let feetVerify = false; 
        let inchesVerify = false;
        
        if(values.weight < 1 || values.weight > 1000){
            setLbsError(<Alert variant="danger">Enter a valid weight between 1-1000 lbs.</Alert>)            
            lbsVerify = false;
        }else{
            setLbsError();
            lbsVerify = true;
        } 

                
        if(values.feet < 1 || values.feet > 8){
            setFeetError(<Alert variant="danger">Enter a valid amount for feet between 1-8.</Alert>)
            feetVerify = false;
        }else{
            setFeetError();
            feetVerify = true;
        } 

        if(values.inches < 0 || values.feet > 11){
            setInchesError(<Alert variant="danger">Enter a valid amount for inches between 0-11.</Alert>)
            inchesVerify = false;
        }else{
            setInchesError();
            inchesVerify = true;
        } 

        if(feetVerify === true && inchesVerify === true && lbsVerify === true){
            return true;
        }else return false;

    }

    return(
        <Jumbotron> 
            <h2>Demographics</h2><br />
            <hr></hr>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Height:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control  type="number" min="1" max="8" step="1" onChange={props.handleChange('feet')} value={values.feet} />
                        <Form.Label>ft</Form.Label>         
                        <Form.Control  type="number" min="0" max="11" step="1" onChange={props.handleChange('inches')} value={values.inches} />
                        <Form.Label>in</Form.Label>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Weight:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <span>
                            <Form.Control type="number" onChange={props.handleChange('weight')} value={values.weight}/> 
                            <Form.Label>lbs</Form.Label>
                        </span>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Body Type:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control as="select" onChange={props.handleChange('bodyType')} value={values.bodyTypeID}>
                            <option selected disabled hidden>Choose a Body Type</option>
                                {props.values.bodyTypes.map(type =>{
                                    return(
                                        <option selected={type.intBodyTypeID == values.bodyTypeID} key={type.intBodyTypeID} value={type.intBodyTypeID}>{type.strBodyType}</option>   
                                    )
                            })}
                        </Form.Control>
                        <Image src={bodytypes} fluid />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Race:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control as="select" onChange={props.handleChange('race')} value={values.raceID}>
                            <option selected disabled hidden>Choose a Race</option>
                            {props.values.races.map(race =>{
                                return(
                                    <option selected={race.intRaceID == values.raceID} key={race.intRaceID} value={race.intRaceID}>{race.strRace}</option>   
                                )
                            })}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Gender:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control as="select" onChange={props.handleChange('gender')} value={values.genderID}>
                            <option selected disabled hidden>Choose a Gender</option>
                            {props.values.genders.map(gender =>{
                                return(
                                    <option selected={gender.intGenderID == values.genderID} key={gender.intGenderID} value={gender.intGenderID}>{gender.strGender}</option>   
                                )
                            })}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 3, offset: 3  }}>
                        <Button onClick={(e)=> back(e)}>Back</Button>
                    </Col>
                    <Col sm={{ span: 3 }}>
                        <Button onClick={(e)=> saveAndContinue(e)}>Save and Continue</Button>
                    </Col>
                </Form.Group>     
            </Form>
        </Jumbotron>
    );
};

export default Demographics;