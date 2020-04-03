import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button} from 'react-bootstrap';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
const DateAndTime = (props) =>{
    const [disabled, setDisabled] = useState(true);
    let values = props.values;
    let minuteOpts = ['00', '15', '30', '45'];
    let hourOpts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    const saveAndContinue = (e) => {
        e.preventDefault()
        props.nextStep()
    }

    const back  = (e) => {
        e.preventDefault();
        props.prevStep();
    }

    //load options for hours and minutes
    useEffect(()=>{

    },[])

    return (
        <Jumbotron>
            <h2>Add a Session</h2><br />
            <hr></hr>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Date:</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <input type="date" value={values.date} onChange={props.handleChange('date')}/>
                    </Col>
                </Form.Group>
                <Form.Row>
                    <Form.Label column sm={{span:3, offset:2}}>Start Time:</Form.Label>
                    <Col sm={1}>
                        <Form.Control as="select"> 
                           {hourOpts.map(hour =>{
                               return(
                                   <option value={hour}>{hour}</option>
                               )
                           })}
                        </Form.Control>
                    </Col>
                    <Col sm={1}>
                        <Form.Control as="select"> 
                           {minuteOpts.map(minute =>{
                               return(
                                   <option value={minute}>{minute}</option>
                               )
                           })}
                        </Form.Control>
                    </Col>
                    <Col sm={1}>
                        <Form.Control as="select"> 
                           <option value="AM">AM</option>
                           <option value="PM">PM</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Form.Label column sm={{span:3, offset:2}}>End Time:</Form.Label>
                    <Col sm={1}>
                        <Form.Control as="select"> 
                           {hourOpts.map(hour =>{
                               return(
                                   <option value={hour}>{hour}</option>
                               )
                           })}
                        </Form.Control>
                    </Col>
                    <Col sm={1}>
                        <Form.Control as="select"> 
                           {minuteOpts.map(minute =>{
                               return(
                                   <option value={minute}>{minute}</option>
                               )
                           })}
                        </Form.Control>
                    </Col>
                    <Col sm={1}>
                        <Form.Control as="select"> 
                           <option value="AM">AM</option>
                           <option value="PM">PM</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
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
}


export default DateAndTime