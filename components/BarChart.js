import React from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

import {
  VictoryBar,
  VictoryChart,
  VictoryZoomContainer,
  VictoryAxis,
} from "victory-native";

function LineChart(props) {
  const { data } = props;
  const theme = useTheme();

  const chartTheme = {
    axis: {
      style: {
        tickLabels: {
          fill: theme.dark ? "white" : "black",
        },
        grid: {
          stroke: "transparent",
        },
        axis: {
          stroke: "transparent",
        },
      },
    },
  };

  return (
    <View>
      <VictoryChart
        theme={chartTheme}
        containerComponent={<VictoryZoomContainer />}
        domainPadding={20}
      >
        <VictoryAxis />
        <VictoryBar
          style={{
            data: { fill: theme.dark ? "#FFFFFF" : "#031E2D", width: 35 },
            labels: { fill: theme.dark ? "lightblue" : "#295771" },
            parent: { border: "1px solid #ccc" },
            position: "absolute",
            // top: 125,
            left: "25%",
            color: "#FFE600",
            fontSize: 60,
          }}
          data={data}
          labels={({ datum }) => `${datum.y}`}
        />
      </VictoryChart>
    </View>
  );
}

export default LineChart;
