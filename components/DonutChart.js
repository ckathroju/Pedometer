import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { VictoryPie } from "victory-native";

const DonutChart = (props) => {
  const { value, goal } = props;
  const graphicData = [{ y: value }, { y: goal - value }];
  const graphicColor = ["lightgreen", "red"];

  return (
    <View>
      <VictoryPie
        data={graphicData}
        colorScale={graphicColor}
        width={350}
        height={350}
        innerRadius={90}
        labels={() => null}
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
        {` ${value} `}
      </Text>
    </View>
  );
};

export default DonutChart;
