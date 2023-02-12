import React from "react";
import { View } from "react-native";

// Components
import AppLogo from "components/atoms/AppLogo";

// Styles
import styles from "./Loading.scss";

const Loading = () => {
  return (
    <View style={styles.container}>
      <AppLogo style={styles.text} />
    </View>
  );
};

export default Loading;
