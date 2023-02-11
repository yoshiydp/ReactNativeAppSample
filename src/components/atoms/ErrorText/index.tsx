import React from "react";
import { View, Text } from "react-native";

// Styles
import styles from "./ErrorText.scss";

interface Props {
  text: string;
}

const ErrorText = (props: Props) => {

  return (
    <View style={ styles.container }>
      <Text style={ styles.text }>
        { props.text }
      </Text>
    </View>
  );
};

export default ErrorText;
