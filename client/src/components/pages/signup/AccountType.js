import React, {useState, useEffect} from "react";
import {Form, Row, Col, Button, Alert, Image} from 'react-bootstrap'


const AccountType = (props) => {
    const [disabled, setDisabled] = useState();

    const saveAndContinue = (e) => {
        e.preventDefault()
        props.nextStep()
    }

    /* Run anytime values prop changes
    Check that account type is chosen*/
    useEffect(()=> {
        if(props.values.accountTypeID < 1){
            setDisabled(true);
        }else setDisabled(false);
    },[props.values]) 

    return(
        <div>
            <h2>Account Type</h2><br />
            <hr></hr>
            <Form>
                <Form.Group as={Row}>
                    <Col sm={12}>
                    {props.values.accountTypes.map(type =>{
                                //Don't display admin account
                                if(type.strAccountType != 'Admin'){
                                    return(
                                        <Form.Check key={type.intAccountTypeID} inline label={type.strAccountType} type="radio" name="type" checked={props.values.accountTypeID == type.intAccountTypeID} value={type.intAccountTypeID} onChange={props.handleChange('accountType')}/>
                                    )
                                }
                            })}
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 12 }}>
                        <Button disabled={disabled} onClick={(e)=> saveAndContinue(e)}>Save and Continue</Button>
                    </Col>
                </Form.Group>  
            </Form>
        </div>
    );
};

export default AccountType;