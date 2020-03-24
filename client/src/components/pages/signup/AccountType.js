import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button, Alert} from 'react-bootstrap'

const AccountType = (props) => {
    const [disabled, setDisabled] = useState(true);

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
        <form>
            <table> 
                <tbody> 
                    <tr> 
                        <td> 
                            <label>Account Type:</label>
                        </td>
                        <td>
                            {props.values.accountTypes.map(type =>{
                                //Don't display admin account
                                if(type.strAccountType != 'Admin'){
                                    return(
                                        <div>
                                            <input type="radio" name="type" checked={props.values.accountTypeID == type.intAccountTypeID} value={type.intAccountTypeID} onChange={props.handleChange('accountType')}/>
                                            <label>{type.strAccountType}</label>
                                        </div>
                                    )
                                }
                            })}
                        </td>
                    </tr>
                    <tr>                     
                        <td> 
                            <button disabled={disabled} onClick={(e)=> saveAndContinue(e)}>Save and Continue</button>
                        </td>
                    </tr>      
                </tbody>
            </table>

        </form>
    );
};

export default AccountType;