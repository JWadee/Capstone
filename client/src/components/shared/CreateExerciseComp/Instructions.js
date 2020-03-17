import React, {useState, useEffect} from "react";


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
        <form> 
            <table> 
                <tr> 
                    <td> 
                        <label>Instructions</label>
                    </td>
                    <td> 
                        <textarea onChange={props.handleChange('desc')} defaultValue={values.desc} />
                    </td>
                </tr>
                <tr>                     
                    <td>
                        <button onClick={(e)=> back(e)}>Back</button>
                    </td>
                    <td> 
                        <button disabled={disabled} onClick={(e)=> saveAndContinue(e)}>Save and Continue</button>
                    </td>
                </tr>               
            </table>
        </form>
    );
};

export default Instructions