import React, {useState, useEffect} from "react";

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
        <form> 
            <table> 
                <tr> 
                    <td> 
                        <label>Exercise Name</label>
                    </td>
                    <td> 
                        <input onChange={props.handleChange('name')} defaultValue={values.name} />
                    </td>
                </tr>
                <tr> 
                    <td> 
                        <label>Type</label>
                    </td>
                    <td> 
                        <select onChange={props.handleChange('type')}>
                            <option selected disabled hidden>Choose a Type</option>
                            {types}
                        </select>
                    </td>
                </tr>
                <tr> 
                    <td></td>
                    <td> 
                        <button disabled={disabled} onClick={(e)=> saveAndContinue(e)}>Save and Continue</button>
                    </td>
                </tr>               
            </table>
        </form>
    );
};

export default NameAndType