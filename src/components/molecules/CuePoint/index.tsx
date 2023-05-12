import React, { useEffect } from "react";
import { View, Text } from "react-native";

// Styles
import styles from "./CuePoint.scss";

interface Props {
  name: string;
  position: number | undefined;
}

const CuePoint = (props: Props) => {
  const sec = 60;
  const hundredfold = 100;
  const cuePointWidth = 24;

  useEffect(() => {
    if (props.position) {
      console.log("props.position: ", (props.position / sec) * hundredfold + cuePointWidth);
    }
  }, [props.position]);

  return (
    <View
      style={[
        styles.container,
        { left: props.position && (props.position / sec) * hundredfold + cuePointWidth },
      ]}
    >
      <Text style={[styles.name]}>{props.name}</Text>
      <View style={styles.point}></View>
    </View>
  );
};

export default CuePoint;
