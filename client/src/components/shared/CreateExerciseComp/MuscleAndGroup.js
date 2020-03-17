import React, {useState, useEffect} from "react";


const MuscleAndGroup = (props) => {
    const [disabled, setDisabled] = useState(true)
    const [muscles, setMuscles] = useState(true)
    const values = props.values;

    const saveAndContinue = (e) => {
        e.preventDefault()
        props.nextStep()
    }

    const back  = (e) => {
        e.preventDefault();
        props.prevStep();
    }

    //Muscle Group Options for select
    let groups = values.muscleGroups.map(group => {
        if(group.intMuscleGroupID == values.muscleGroupID){
            return <option selected key={group.intMuscleGroupID} value={group.intMuscleGroupID}>{group.strMuscleGroup}</option>
        }else{
            return <option  key={group.intMuscleGroupID} value={group.intMuscleGroupID}>{group.strMuscleGroup}</option>
        }
    })

    //Muscle Options for select
    let muscleOpts = values.muscles.map(muscle => {
        if(muscle.intMuscleID == values.muscleID){
            return <option selected key={muscle.intMuscleID} value={muscle.intMuscleID}>{muscle.strMuscle}</option>
        }else{
            return <option key={muscle.intMuscleID} value={muscle.intMuscleID}>{muscle.strMuscle}</option>
        }} 
    )

    /* Run anytime values prop changes
       Check that muscle group ID & muscle ID > 0 & muscle is selected
    */
    useEffect(()=> {
        // if nmuscle id and group id > 0 allow enable continue button
        if(values.muscleID > 0 && values.muscleGroupID > 0){
            setDisabled(false);
        }else setDisabled(true);
        
        //Load muscle groups
        setMuscles(
            <select onLoad={props.handleChange('muscle')} onChange={props.handleChange('muscle')}>
                <option selected disabled hidden>Choose a Muscle</option>
                {muscleOpts}
            </select>
        )
    },[values])

    /* Run anytime muscle group selection changes
       Reload muscle dropdown*/
    useEffect(()=> {    
        setMuscles(
            <select onChange={props.handleChange('muscle')}>
                {muscleOpts}
                <option selected disabled hidden>Choose a Muscle</option>
            </select>
        )
    },[values.muscleGroupID])




    return (
        <form> 
            <table> 
                <tr> 
                    <td> 
                        <label>Muscle Group</label>
                    </td>
                    <td> 
                        <select onChange={props.handleChange('muscleGroup')}>
                            <option selected disabled hidden>Choose a Group</option>
                            {groups}
                        </select>
                    </td>
                </tr>
                <tr> 
                    <td> 
                        <label>Muscle</label>
                    </td>
                    <td> 
                        {muscles}
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

export default MuscleAndGroup