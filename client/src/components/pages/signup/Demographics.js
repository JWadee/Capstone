import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button, Alert} from 'react-bootstrap'

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
        <form>
            <table> 
                <tbody> 
                    <tr> 
                        <td>
                            <label>Height:</label>
                        </td>
                        <td>
                            <span>
                                <span>
                                    <input type="number" min="1" max="8" step="1" onChange={props.handleChange('feet')} value={values.feet}/> 
                                    <label>ft</label>
                                </span>
                                <span>
                                    <input type="number" min="0" max="11" step="1" onChange={props.handleChange('inches')} value={values.inches}/> 
                                    <label>in</label>
                                </span>
                            </span>

                        </td>
                    </tr>
                    <tr> 
                        <td>
                            <label>Weight:</label>
                        </td>
                        <td>
                            <span>
                                <span>
                                    <input type="number" onChange={props.handleChange('weight')} value={values.weight}/> 
                                    <label>lbs</label>
                                </span>
                            </span>

                        </td>
                    </tr>
                    <tr> 
                        <td> 
                            <label>Body Type:</label>
                        </td>
                        <td>
                            <select onChange={props.handleChange('bodyType')}>
                                <option selected disabled hidden>Choose a Body Type</option>
                                {props.values.bodyTypes.map(type =>{
                                    return(
                                        <option selected={type.intBodyTypeID == values.bodyTypeID} key={type.intBodyTypeID} value={type.intBodyTypeID}>{type.strBodyType}</option>   
                                    )
                                })}
                            </select>
                        </td>
                    </tr>
                    <tr> 
                        <td> 
                            <label>Race:</label>
                        </td>
                        <td>
                            <select onChange={props.handleChange('race')}>
                                <option selected disabled hidden>Choose a Race</option>
                                {props.values.races.map(race =>{
                                    return(
                                        <option selected={race.intRaceID == values.raceID} key={race.intRaceID} value={race.intRaceID}>{race.strRace}</option>   
                                    )
                                })}
                            </select>
                        </td>
                    </tr>
                    <tr> 
                        <td> 
                            <label>Gender:</label>
                        </td>
                        <td>
                            <select onChange={props.handleChange('gender')}>
                                <option selected disabled hidden>Choose a Gender</option>
                                {props.values.genders.map(gender =>{
                                    return(
                                        <option selected={gender.intGenderID == values.genderID} key={gender.intGenderID} value={gender.intGenderID}>{gender.strGender}</option>   
                                    )
                                })}
                            </select>
                        </td>
                    </tr>
                    <tr>     
                        <td> 
                            <button onClick={(e)=> back(e)}>Back</button>
                        </td>                      
                        <td> 
                            <button onClick={(e)=> saveAndContinue(e)}>Save and Continue</button>
                        </td>
                    </tr>      
                </tbody>
            </table>

        </form>
    );
};

export default Demographics;