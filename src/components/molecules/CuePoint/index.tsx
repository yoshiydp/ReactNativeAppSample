import React from "react";
import { View, Text } from "react-native";

// Styles
import styles from "./CuePoint.scss";

interface Props {
  name: string;
  position: number | undefined;
}

const CuePoint = (props: Props) => {
  return (
    <View style={[styles["container"], { left: props.position ? props.position + 36 : 0 }]}>
      <Text style={[styles["name"]]}>{props.name}</Text>
      <View style={styles["point"]}></View>
    </View>
  );
};

export default CuePoint;
