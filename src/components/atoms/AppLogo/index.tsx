import React from "react";
import { View, Text } from "react-native";

// Constants
import * as TEXT from "constants/text";

interface Props {
  style: any;
}

const AppLogo = (props: Props) => {
  return (
    <View>
      <Text style={props.style}>{TEXT.APP_NAME}</Text>
    </View>
  );
};

export default AppLogo;
