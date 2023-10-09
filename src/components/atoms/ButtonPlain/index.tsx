import React from "react";
import { TouchableOpacity, Text } from "react-native";

// Interfaces
import { ButtonType } from "interfaces/buttonInterface";

interface Props extends ButtonType {
  styles: any;
}

const ButtonPlain = (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={props.onPressEvent} disabled={props.disabled}>
      <Text style={props.styles}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPlain;
