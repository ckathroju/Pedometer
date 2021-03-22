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
          data={data}
    
        />
      </VictoryChart>
    </View>
  );
}

export default LineChart;
