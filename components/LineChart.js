import React from 'react'
import { Line } from 'react-chartjs-2'

function LineChart() {

    const data = { 
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
        datasets: [ 
            {
                label: 'Daily Step Count',
                data: [100, 200, 300, 223, 200, 300, 200],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };

    const legend = {
        display: true,
        position: "bottom",
        labels: {
          fontColor: "#323130",
          fontSize: 14
        }
    };
      
    const options = {
        title: {
          display: true,
          text: "Chart Title"
        },
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          ]
        }
    };


    return <Line data={data} legend={legend} options={options}/>
}

export default LineChart