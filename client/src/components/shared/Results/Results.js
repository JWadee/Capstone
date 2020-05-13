import React, {useState, useEffect} from 'react';
import {Row, Col, Table} from 'react-bootstrap';
import { useRouteMatch } from "react-router-dom";

//Components
import StrengthGraph from './StrengthGraph';
import TimeAndDistanceGraph from './RateAndDistanceGraph';
import TimeGraph from './TimeGraph';
/*  ---Results Component---
  Step 1: fetch results, and exercise information
  Step 2: determine which data to display
  Step 3: pass data to data (x-axis) and labels(y-axis) variables, set label for key 
  Step 4: render
*/

const Results = (props) => {
    const [xaxis, setXaxis] = useState([]);
    const [labels, setLabels] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [datasets, setDatasets] = useState([]);
    const [rates, setRates] = useState([]);
    const [distances, setDistances] = useState([]);
    const [dataType, setDataType] = useState('');
    const [results, setResults] = useState([]);
    const [exercise, setExercise] = useState([]);
    const [processed, setProcessed] = useState(1);
    const [recordReps, setRecordReps] = useState(0);
    const [recordRepSet, setRecordRepSet] = useState('');
    const [recordWeight, setRecordWeight] = useState(0);
    const [recordWeightSet, setRecordWeightSet] = useState('');
    const [recordPace, setRecordPace] = useState(0);
    const [recordPaceRun, setRecordPaceRun] = useState('');
    const [recordDistance, setRecordDistance] = useState(0);
    const [recordDistanceRun, setRecordDistanceRun] = useState('');
    const [longestTime, setLongestTime] = useState(null);
    const [longestTimeDisp, setLongestTimeDisp] = useState('');
    const [shortestTime, setShortestTime] = useState(null);
    const [shortestTimeDisp, setShortestTimeDisp] = useState('');
    const [resultTable, setResultTable] = useState();

    const match = useRouteMatch();

    //Run on initial render, load all results (including date of session) for exercise by account id, and fetch the exercise
    useEffect(()=>{
      //clear old data
      setXaxis([]);
      setLabels([]);
      setSessions([]);
      setDatasets([]);
      setDataType('');
      setDistances([]);
      setRates([]);
      setResults([]);
      setExercise([]);
      setProcessed(1);
      setRecordReps(0);
      setRecordRepSet('');
      setRecordWeight(0);
      setRecordWeightSet('');
      setRecordPace(0);
      setRecordPaceRun('');
      setRecordDistance(0);
      setRecordDistanceRun('');
      setLongestTime(null);
      setLongestTimeDisp('');
      setShortestTime(null);
      setShortestTimeDisp('');
      setResultTable();

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

    //Run when exercise changes, set dataType and label variables
    useEffect(()=>{
      if(exercise.length > 0){
        if(exercise[0].recordTime === 1){
          switch (exercise[0].recordDistance){
            case 1 :
              setLabels(['(Rate mph)', 'Distance (mi)'])
              setDataType('td'); 
              break;
            case 0 :
              setLabels(['Reps'])
              setDataType('t');
              break; 
          }
        }else if(exercise[0].recordReps === 1){
          switch (exercise[0].recordWeight){
            case 1:
              setLabels('Work Done')
              setDataType('rw')
              break;
            case 0:               
              setLabels('Reps')
              setDataType('r')
              break;
          }
        }
      }  
    },[exercise])

    //Run when exercise results are fetched or dataType is set, update labels and datasets  arrays
    useEffect(()=>{
      let i = 1;
      if(dataType.length > 0 ){
        results.forEach(result=>{
          checkResult(result);
          checkStats(result);
          setProcessed(i++)
        })      
      }
    },[dataType, results])

    //Run when results, or datatype changes, set resultTable
    useEffect(()=>{
      switch(dataType){
        case 't':
          setResultTable(
            <Table striped bordered hover className="tableBodyScroll">
              <thead> 
                <th>Date</th>
                <th>Time (hh:mm:ss)</th>
              </thead>
              <tbody>
                {results.map(result=>{
                  return(
                    <tr key={result.intSessionExerciseResultID}>
                      <td>{formatDate(result.dtmDate)}</td>
                      <td>{result.tmTimeElapsed}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )
          break;
        case 'td':
          setResultTable(
            <Table striped bordered hover className="tableBodyScroll">
              <thead> 
                <th>Date</th>
                <th>Time (hh:mm:ss)</th>
                <th>Distance (mi)</th>
              </thead>
              <tbody>
                {results.map(result=>{
                  return(
                    <tr key={result.intSessionExerciseResultID}>
                      <td>{formatDate(result.dtmDate)}</td>
                      <td>{result.tmTimeElapsed}</td>
                      <td>{result.decDistance}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )
          break;
        case 'r':
          let resArr = results.reverse();
          setResultTable(
            <Table striped bordered hover className="tableBodyScroll">
              <thead> 
                <th>Date</th>
                <th>Reps</th>
              </thead>
              <tbody>
                {resArr.map(result=>{
                  return(
                    <tr key={result.intSessionExerciseResultID}>
                      <td>{formatDate(result.dtmDate)}</td>
                      <td>{result.intReps}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )
          break; 
        case 'rw':
          setResultTable(
            <Table striped bordered hover className="tableBodyScroll">
              <thead> 
                <th>Date</th>
                <th>Reps</th>
                <th>Weight</th>
              </thead>
              <tbody>
                {results.map(result=>{
                  return(
                    <tr key={result.intSessionExerciseResultID}>
                      <td>{formatDate(result.dtmDate)}</td>
                      <td>{result.intReps}</td>
                      <td>{result.decWeight}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )
          break;
      }
    },[dataType])

    //Function to format date to dd-mm-yyyy
    const formatDate = (date) => {
      const newDate = new Date(date);
      const formatted_date = (newDate.getMonth() + 1)+ "-" + newDate.getDate()+ "-" + newDate.getFullYear();
      return formatted_date
    }

    //Function to add date to array
    const addDate = (date) => {
      let tempArray = xaxis;
      let formatted = formatDate(date);
      tempArray.push(formatted);
      setXaxis(tempArray);
    }

    //Function to add new data point 
    const addDataPoint = (result) => {
      let tempArray = datasets;
      let time = new String; 
      let hours; 
      let minutes;
      let seconds; 
      let totalMins;
      let totalHours;

      switch (dataType){
        case 'r':
          tempArray.push(result.intReps);
          setDatasets(tempArray)
          break;
        case 'rw':
          tempArray.push(result.intReps * result.decWeight);
          setDatasets(tempArray)
          break;
        case 't':
          time = result.tmTimeElapsed.split(":");
          hours = parseFloat(time[0]);
          minutes = parseFloat(time[1]);
          seconds = parseFloat(time[2]);
          totalMins = ((hours * 60) + (minutes) + (seconds / 60)).toFixed(2);
          tempArray.push(totalMins)
          break;
        case 'td':
          let tempRates = rates;
          let tempDists = distances;
          time = result.tmTimeElapsed.split(":");
          hours = parseFloat(time[0]);
          minutes = parseFloat(time[1]);
          seconds = parseFloat(time[2]);
          totalHours = ((hours) + (minutes / 60 ) + (seconds / 60 / 60)).toFixed(2);
          let rate = (result.decDistance /  totalHours).toFixed(2);

          tempRates.push(rate);
          tempDists.push(result.decDistance);
          setRates(tempRates);
          setDistances(tempDists)
          break;
      }
    }

    //Function to update existing datapoint
    const updateDataPoint = (result, index) => {
      let tempArray = datasets;
      switch (dataType){
        case 'r':
          let oldReps = tempArray[index];
          let newReps = oldReps + result.intReps;
          tempArray[index] = newReps;
          setDatasets(tempArray)
          break;
        case 'rw':
          let oldWorkDone = tempArray[index];
          let newWorkDone = (result.decWeight * result.intReps);
          tempArray[index] = oldWorkDone + newWorkDone;
          setDatasets(tempArray)
          break;
        case 't':
          break;
        case 'td':
          break;
      }

    }
    
    //Funtion to add new session id to sessions array
    const addSession = (id) => {
      let tempArray = sessions;
      tempArray.push(id);
      setSessions(tempArray);
    }

    //Function to check stats
    const checkStats = (result) =>{
      switch (dataType){
        case 'r':
          //check for highest reps 
          if(result.intReps > recordReps){
            setRecordReps(result.intReps);
            setRecordRepSet('Record Set: '+result.intReps+' Reps');
          }
          break;
        case 'rw':
          //check for best set 
          if(result.decWeight > recordWeight){
            setRecordWeight(result.decWeight);
            setRecordWeightSet('Record Set: '+result.decWeight+' lbs x '+result.intReps);
          }
          break;
        case 't':
          let time = result.tmTimeElapsed.split(":");
          let hours = parseInt(time[0]);
          let minutes = parseInt(time[1]);
          let seconds = parseInt(time[2]);
          let totalMins = ((hours * 60) + (minutes) + (seconds / 60)).toFixed(2);

          if(totalMins > longestTime || longestTime === null){
            console.log(totalMins)
            setLongestTime(parseFloat(totalMins))
            setLongestTimeDisp('Longest Time: '+totalMins+ ' minutes');
          }
          if(totalMins < shortestTime || shortestTime === null){
            setShortestTime(parseFloat(totalMins))
            setShortestTimeDisp('Shortest Time: '+totalMins+ ' minutes')
          }
          
          break;
        case 'td':
          break;
      }
    }

    //Function to check results 
    const checkResult = (result) => {
      //Check sessions array for id
      let index = sessions.indexOf(result.intSessionID);
      if(index > -1){
        updateDataPoint(result, index)
      }else{
        addSession(result.intSessionID);
        addDataPoint(result);
        addDate(result.dtmDate)
      }
    }

    //Determine Display
    if(results.length === processed && results.length > 0 && exercise.length > 0){
      switch(dataType){
        case 'r': 
            return(
              <Row>
                <Col sm={8}>
                  <StrengthGraph xaxis={xaxis} data={datasets} labels={labels} yLabel={'Reps'} name={exercise[0].strExerciseName}/>
                  </Col>
                <Col sm={4}>
                  {/* <div>{recordRepSet}</div> */}
                  <div>Times Completed: {sessions.length}</div>
                  <div>{resultTable}</div>
                </Col>
              </Row>
            )
        case 'rw':         
          return(
            <Row>
              <Col sm={8}>
                <StrengthGraph xaxis={xaxis} data={datasets} labels={labels} yLabel={'Lbs'} name={exercise[0].strExerciseName}/>
                </Col>
              <Col sm={4}>
                {/* <div>{recordWeightSet}</div> */}
                <div>Times Completed: {sessions.length}</div>
                <div>{resultTable}</div>
              </Col>
            </Row>
          )        
        case 't': 
          return(
            <Row>
              <Col sm={8}>
                <TimeGraph xaxis={xaxis} data={datasets} yLabel={'minutes'} name={exercise[0].strExerciseName}/>
                </Col>
              <Col sm={4}>
                {/* <div>{longestTimeDisp}</div>
                <div>{shortestTimeDisp}</div> */}
                <div>Times Completed: {sessions.length}</div>
                <div>{resultTable}</div>
              </Col>
            </Row>
          );
        case 'td': 
          return(
            <Row>
              <Col sm={8}>
                <TimeAndDistanceGraph xaxis={xaxis} distances={distances} rates={rates} labels={['Rate (mph)', 'Distance (miles)']} yLabel={''} name={exercise[0].strExerciseName}/>
              </Col>
              <Col sm={4}>
                {/* <div>{recordWeightSet}</div> */}
                <div>Times Completed: {sessions.length}</div>
                {resultTable}
              </Col>
            </Row>
            );
        case '':
          return(<></>);
      }
    }else{ return (<></>)}
}

export default Results