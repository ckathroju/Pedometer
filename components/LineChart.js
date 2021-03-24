import { DefaultTheme } from "@react-navigation/native";
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
            position: "absolute",
            // top: 125,
            left: "25%",
            color: "#FFE600",
            fontSize: 60,
          }}
          data = {data}
          labels = {({ datum }) => `${datum.y}`}
        />
      </VictoryChart>
      {/* <Text
        style={{
          position: "absolute",
          top: 125,
          left: "25%",
          color: "#FFE600",
          fontSize: 60,
        }}
      >
        {` ${value} `}
      </Text> */}
    </View>
  );
}

export default LineChart;
