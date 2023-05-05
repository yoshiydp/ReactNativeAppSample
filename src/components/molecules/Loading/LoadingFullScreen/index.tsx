import React, { useEffect, useRef } from "react";
import { View, Text, Animated, ActivityIndicator, useWindowDimensions } from "react-native";

// Store
import { useSelector } from "store/index";

// Constants
import * as COLOR from "constants/color";
import * as VALUE from "constants/value";

// Styles
import styles from "./LoadingFullScreen.scss";

interface Props {
  isShow: boolean;
}

const LoadingFullScreen = (props: Props) => {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const widthValue = useRef(new Animated.Value(0)).current;
  const heightValue = useRef(new Animated.Value(0)).current;
  const message = useSelector((state) => state.loadingFullScreen.message);

  const opacityAnimatedFunc = (object: any, value: number) => {
    Animated.timing(object, {
      toValue: value,
      duration: VALUE.DURATION_200,
      useNativeDriver: false,
    }).start();
  };

  const animatedOpacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedOpacityStyle = {
    opacity: animatedOpacity,
  };

  const sizesAnimatedFunc = (object: any, value: number, delay: number) => {
    Animated.timing(object, {
      toValue: value,
      duration: 0,
      delay,
      useNativeDriver: false,
    }).start();
  };

  const animatedWidthStyle = {
    width: widthValue,
  };

  const animatedHeightStyle = {
    height: heightValue,
  };

  const minOpacityAnimated = () => {
    opacityAnimatedFunc(opacityValue, 0);
  };

  const maxOpacityAnimated = () => {
    opacityAnimatedFunc(opacityValue, 0.5);
  };

  useEffect(() => {
    if (props.isShow) {
      maxOpacityAnimated();
      sizesAnimatedFunc(widthValue, windowWidth, 0);
      sizesAnimatedFunc(heightValue, windowHeight, 0);
    } else {
      minOpacityAnimated();
      sizesAnimatedFunc(widthValue, 0, VALUE.DURATION_200);
      sizesAnimatedFunc(heightValue, 0, VALUE.DURATION_200);
    }
  }, [props.isShow]);

  return (
    <Animated.View
      style={[styles.container, animatedOpacityStyle, animatedWidthStyle, animatedHeightStyle]}
    >
      <View>
        {message && <Text style={styles.message}>{message}</Text>}
        <ActivityIndicator size="large" color={COLOR.COLOR_GREEN_BASE} />
      </View>
    </Animated.View>
  );
};

export default LoadingFullScreen;
