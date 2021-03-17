import React from 'react';
import { View } from "react-native";
// import ReactDOM from 'react-dom';
// import * as V from 'victory';
import { VictoryLine, VictoryChart, VictoryAxis,VictoryTheme } from 'victory-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';


function LineChart() {
  // const theme={VictoryTheme.material};

  // const style={{
  //   data: { stroke: "#c43a31" },
  //   parent: { border: "1px solid #ccc"}
  // }};

  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];

  return (
    <View>
      <VictoryChart
        theme={VictoryTheme.material}
      >
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={data}
        />
      </VictoryChart>
    </View>
  );
};

// import { Line } from 'react-chartjs-2'
// function LineChart() {

//     const data = { 
//         labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
//         datasets: [ 
//             {
//                 label: 'Daily Step Count',
//                 data: [100, 200, 300, 223, 200, 300, 200],
//                 fill: true,
//                 backgroundColor: "rgba(75,192,192,0.2)",
//                 borderColor: "rgba(75,192,192,1)"
//             }
//         ]
//     };

//     const legend = {
//         display: true,
//         position: "bottom",
//         labels: {
//           fontColor: "#323130",
//           fontSize: 14
//         }
//     };
      
//     const options = {
//         title: {
//           display: true,
//           text: "Chart Title"
//         },
//         scales: {
//           yAxes: [
//             {
//               ticks: {
//                 suggestedMin: 0,
//                 suggestedMax: 100
//               }
//             }
//           ]
//         }
//     };


//     return <Line data={data} legend={legend} options={options}/>
// }

export default LineChart