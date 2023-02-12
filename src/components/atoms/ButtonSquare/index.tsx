import React from "react";
import { TouchableOpacity, Text } from "react-native";

// Interfaces
import { ButtonType } from "interfaces/buttonInterface";

// Styles
import styles from "./ButtonSquare.scss";

const ButtonSquare = (props: ButtonType) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={props.disabled ? styles.containerDisabled : styles.container}
      onPress={props.onPressEvent}
      disabled={props.disabled}
    >
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonSquare;
