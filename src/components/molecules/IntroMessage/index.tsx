import React from "react";
import { View, Text } from "react-native";

// Constants
import * as TEXT from "constants/text";

// Styles
import styles from "./IntroMessage.scss";

interface Props {
  message?: string;
}

const IntroMessage = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to
      </Text>
      <Text style={styles.logo}>
        {TEXT.APP_NAME}
      </Text>
      { props.message &&
        <Text style={styles.message}>
          {props.message}
        </Text>
      }
    </View>
  );
};

export default IntroMessage;
