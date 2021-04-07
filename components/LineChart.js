import React from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

import {
  VictoryLine,
  VictoryChart,
  VictoryZoomContainer,
} from "victory-native";

function LineChart(props) {
  const { data, height, multiData, multiLine } = props;
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
          stroke: "grey",
        },
      },
    },
  };

  return (
    <View>
      <VictoryChart
        theme={chartTheme}
        scale={multiLine ? { y: "sqrt" } : null}
        containerComponent={
          <VictoryZoomContainer
            allowPan={true}
            allowZoom={true}
            zoomDomain={{
              x: multiLine
                ? [multiData[0].data.length - 6, multiData[0].data.length + 1]
                : [data.length - 6, data.length + 1],
            }}
          />
        }
        domainPadding={20}
        height={height}
      >
        {multiLine ? (
          multiData.map((line) => (
            <VictoryLine
              style={{
                data: { stroke: line.color },
                labels: { fill: theme.dark ? "lightblue" : "#295771" },
                parent: { border: "1px solid #ccc" },
                position: "absolute",
                // top: 125,
                left: "25%",
                color: "#FFE600",
                fontSize: 60,
              }}
              data={line.data}
              labels={({ datum }) => `${datum.y}`}
            />
          ))
        ) : (
          <VictoryLine
            style={{
              data: { stroke: "grey" },
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
        )}
      </VictoryChart>
    </View>
  );
}

export default LineChart;
