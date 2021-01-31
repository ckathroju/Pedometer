import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { VictoryPie } from "victory-native";

const DonutChart = (props) => {
  const graphicData = [
    { y: 10, x: "5%" },
    { y: 90, x: "90%" },
    { y: 50, x: "50%" },
    { y: 20, x: "20%" },
    { y: 70, x: "70%" },
  ];
  const graphicColor = ["red", "blue", "yellow", "green", "tomato"];

  return (
    <View>
      <VictoryPie
        data={graphicData}
        colorScale={graphicColor}
        width={350}
        height={350}
        innerRadius={90}
        style={{
          labels: {
            fill: "white",
            fontSize: 15,
            padding: 7,
          },
        }}
      />
      <Text
        style={{
          position: "absolute",
          top: 125,
          left: "25%",
          color: "#FFE600",
          fontSize: 60,
        }}
      >
        {" "}
        85%{" "}
      </Text>
    </View>
  );
};

export default DonutChart;
