import React from "react";
import { View } from "react-native";
// import ReactDOM from 'react-dom';
// import * as V from 'victory';

import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
} from "victory-native";

function LineChart(props) {
  const {data} = props

  return (
    <View>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 },
          ]}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel="step counts"
          xAxisLabel="date"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
        />
      </VictoryChart>
    </View>
  );
}

export default LineChart;
