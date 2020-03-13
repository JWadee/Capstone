import React, {useEffect, useState} from 'react'

const CreateExercise = () => {
    const [name, setName] = useState('');
    const [muscleID, setMuscleID] = useState(0);
    const [muscleGroupID, setMuscleGroupID] = useState(0);
    const [exerciseTypeID, setExerciseTypeID] = useState(0);
    const [desc, setDesc] = useState('');
    const [exerciseTypes, setExerciseTypes] = useState([]);
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [muscles, setMuscles] = useState([]);


    //function to fetch exercise types 
    async function fetch_exercisetypes(){
        //call api
        const response = await fetch('/exerciseTypes/')
            //catch any error
            .catch((error) => console.log(error));
            //store response.json into data variable
            const data = await response.json();
            //set exerciseTypes State variable to data 
            setExerciseTypes(data);
        }

        //function to fetch muscle groups
    async function fetch_musclegroups(){
        //call api
        const response = await fetch('/muscleGroups/')
            //catch any error
            .catch((error) => console.log(error));
        //store response.json into data variable
        const data = await response.json();
        //set muscleGroups State variable to data 
        setMuscleGroups(data);
    }
    
    //function to fetch muscles
    async function fetch_muscles(){
        //call api
        const response = await fetch('/muscles/')
            //catch any error
            .catch((error) => console.log(error));
        //store response.json into data variable
        const data = await response.json();
        //set muscles State variable to data 
        setMuscles(data);
    }

    //function to fetch muscles by group 
    async function fetch_muscles_by_group(){
        //call api
        const response = await fetch('/muscles/byGroup?groupID='+muscleGroupID)
            //catch any error
            .catch((error) => console.log(error));
        //store response.json into data variable
        const data = await response.json();
        //set muscles State variable to data 
        setMuscles(data);
    }

    /* Run on initial component render
       Fetch exercise types, muscle groups, and muscles dropdown
    */ 
    useEffect(()=>{
        fetch_exercisetypes();
        fetch_musclegroups();
        fetch_muscles();
    }, [])
    
    /* Run when muscleGroupID changes
       filter muscles by selected group
    */ 
    useEffect(()=>{
        if(muscleGroupID != 0){
            //fetch muscles by group
            fetch_muscles_by_group();
        }
    }, [muscleGroupID])
    
    return (


        <form >
            <table>
            <tr>
                <td>
                    <label>Name</label>
                </td>
                <td>
                    <input type="text" onChange={(e)=> setName(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Exercise Type</label>
                </td>
                <td>
                    <select onChange={((e)=> setExerciseTypeID(e.target.value))}> 
                        <option value={0}></option>
                        {exerciseTypes.map(exerciseType => 
                            <option key={exerciseType.intExerciseTypeID} value={exerciseType.intExerciseTypeID}>{exerciseType.strExerciseType}</option>
                        )}
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Filter Muscles By Group</label>
                </td>
                <td>
                    <select onChange={((e)=> setMuscleGroupID(e.target.value))}> 
                        <option value={0}></option>
                        {muscleGroups.map(muscleGroup => 
                            <option key={muscleGroup.intMuscleGroupID} value={muscleGroup.intMuscleGroupID}>{muscleGroup.strMuscleGroup}</option>
                        )}
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Muscle</label>
                </td>
                <td>
                    <select> 
                        <option value={0}></option>
                        {muscles.map(muscle => 
                            <option key={muscle.intMuscleID} value={muscle.intMuscleID}>{muscle.strMuscle}</option>
                        )}
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Instructions</label>
                </td>
                <td>
                    <textarea onChange={(e)=> setDesc(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td> 
                    <button type="submit">Create Exercise</button>
                </td>
            </tr>
            </table>
        </form>
    )

}

export default CreateExercise