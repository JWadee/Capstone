import React, {useState, useEffect} from 'react'
import {Line, defaults} from 'react-chartjs-2';


const StrengthGraph = (props) => {
    const [graphConfig, setGraphConfig] = useState({});
    const [graphOptions, setGraphOptions] = useState({});
    defaults.global.defaultFontColor ="white";
    
    useEffect(()=>{
      setGraphConfig({
        labels: props.xaxis,
        datasets: [
          {
            label: props.labels,
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            defaultFontColor: 'white',
            pointBorderColor: 'white',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.data
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
              }]
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

export default StrengthGraph