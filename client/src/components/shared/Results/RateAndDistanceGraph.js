import React, {useState, useEffect} from 'react'
import {Line, defaults} from 'react-chartjs-2';


const RateAndDistanceGraph = (props) => {
    const [graphConfig, setGraphConfig] = useState({});
    const [graphOptions, setGraphOptions] = useState({});
    defaults.global.defaultFontColor ="white";
    
    useEffect(()=>{
      setGraphConfig({
        labels: props.xaxis,
        datasets: [
          {
            label: 'Rate (mph)',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rbga(184, 195, 230, 0.3)',
            borderColor: '#90ee90',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'white',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,0.4)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.rates ,
            type: 'line'
          },
          {
            label: 'Distance (miles)',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'white',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.distances, 
            type: 'line'
          }
        ]
    })

      setGraphOptions({
          scaleFontColor: "#FFFFFF",
          title:{
            display:true,
            text: props.name,
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          },
          scales: {
              yAxes: [{
                scaleLabel: {
                  
                  display: true,
                  labelString: props.yLabel,
                },
                ticks: {
                  beginAtZero: true
                }
              }],
              xAxis:[{
                ticks: {
                  beginAtZero: false
                }              }]
          },
         
        
      })
    },[props])

    return (
        <>
          <Line
          data={graphConfig}
          options={graphOptions}
          />
        </>
    )

}

export default RateAndDistanceGraph;