import React from 'react'
import {Line} from 'react-chartjs-2';


const TimeGraph = (props) => {
    const graphConfig = {
        labels: props.xaxis,
        datasets: [
          {
            label: 'Time (minutes)',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.data
          }
        ]
      };
    return (
        <>
          <Line
          data={graphConfig}
          options={{
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
                    labelString: 'minutes'
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }]
            },
           
          }}
          />
        </>
    )

}

export default TimeGraph