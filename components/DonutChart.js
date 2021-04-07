import React from "react";
import { Text, View } from "react-native";
import {
  VictoryPie,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
} from "victory-native";
import { useTheme } from "@react-navigation/native";

const DonutChart = (props) => {
  const theme = useTheme();
  const { value, goal } = props;
  const graphicData = [{ y: value }, { y: goal - value }];
  const graphicColor = theme.dark
    ? ["#98C0EF", "#FFFFFF"]
    : ["#295771", "#031E2D"];

  const chartTheme = {
    axis: {
      style: {
        tickLabels: {
          fill: "transparent",
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
      <VictoryChart theme={chartTheme}>
        <VictoryPie
          data={graphicData}
          colorScale={graphicColor}
          width={350}
          height={350}
          innerRadius={130}
          radius={100}
          labels={() => null}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{
            fontSize: 60,
            fill: theme.dark ? "#FFFFFF" : "#031E2D",
          }}
          x={200}
          y={150}
          text={value}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{
            fontSize: 20,
            fill: theme.dark ? "#FFFFFF" : "#031E2D",
          }}
          x={200}
          y={200}
          text="steps"
        />
      </VictoryChart>
    </View>
  );
};

export default DonutChart;
