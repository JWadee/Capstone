import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import { useRouteMatch } from "react-router-dom";
import LineGraph from './LineGraph';


const Results = (props) => {
    const [labels, setLabels] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [data, setData] = useState([]);
    const [results, setResults] = useState([]);
    const [exercise, setExercise] = useState([]);
    const [processed, setProcessed] = useState(1);
    const match = useRouteMatch();

    //Run on initial render, load all results (including date of session) for exercise by account id, and fetch the exercise
    useEffect(()=>{
      setLabels([]);
      setSessions([]);
      setData([])
      //Declare functions to fetch results, and the exercise
      const fetch_results = async ()=> {
        const response = await fetch('/sessionResults/byClient/byExercise?exerciseid='+props.exerciseid+'&clientid='+match.params.ID);
        const data = await response.json();
        setResults(data)
      }

      const fetch_exercise = async () => {
        const response = await fetch('/exercises/byID?ID='+props.exerciseid)
        const data = await response.json();
        setExercise(data);
      }
      
      //Call functions
      fetch_results();
      fetch_exercise();
    },[props.exerciseid, match.params.ID])

    //Function to format date to dd-mm-yyyy
    const formatDate = (date) => {
      const newDate = new Date(date);
      const formatted_date = (newDate.getMonth() + 1)+ "-" + newDate.getDate()+ "-" + newDate.getFullYear();
      return formatted_date
    }

    //Function to add date to array
    const addDate = (date) => {
      let tempArray = labels;
      let formatted = formatDate(date);
      tempArray.push(formatted);
      setLabels(tempArray);
    }

    const addDataPoint = (weight, reps) => {
      let tempArray = data;
      tempArray.push(parseInt(weight*reps));
      setData(tempArray);
    }

    const updateDataPoint = (weight, reps, index) => {
      let tempArray = data;
      let oldVal = tempArray[index];
      let newVal = parseInt(weight*reps)
      tempArray[index] = (oldVal + newVal);
      setData(tempArray);
    }
    
    const addSession = (id) => {
      let tempArray = sessions;
      tempArray.push(id);
      setSessions(tempArray);
    }

    //Function to check results and find 
    const checkResult = (result) => {
      //Check sessions array for id
      let index = sessions.indexOf(result.intSessionID);
      //if sessions has session id => update data array ELSE add new data point and date(label)
      if(index > -1){
        updateDataPoint(result.decWeight, result.intReps, index)
      }else{
        addSession(result.intSessionID);
        addDataPoint(result.decWeight, result.intReps);
        addDate(result.dtmDate)
      }
    }

    //Run when exercise results are fetched, update labels and weights moved arrays
    useEffect(()=>{
      let i = 1;
      results.forEach(result=>{
        checkResult(result);
        setProcessed(i++)
      })
    },[results])

    return (
      <Row>
        <Col sm={9}>
          {results.length === processed && results.length > 0 && exercise.length > 0 ? 
            <LineGraph labels={labels} data={data} name={exercise[0].strExerciseName}/>
              :
            <></>
          }
        </Col>
      </Row>
    );
}

export default Results