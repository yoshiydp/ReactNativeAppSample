import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";
import { hideOverlay } from "store/OverlaySlice";
import { hideMainTabMenu } from "store/MainTabMenuSlice";

// Constants
import * as VALUE from "constants/value";

// Styles
import styles from "./Overlay.scss";

interface Props {
  isShow: boolean;
}

const Overlay = (props: Props) => {
  const dispatch = useDispatch();
  const opacityValue = useRef(new Animated.Value(0)).current;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const widthValue = useRef(new Animated.Value(0)).current;
  const heightValue = useRef(new Animated.Value(0)).current;
  const activeHiddenState = useSelector((state) => state.overlay.inactiveHidden);

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
  }, [props.isShow, activeHiddenState]);

  const minOpacityAnimated = () => {
    opacityAnimatedFunc(opacityValue, 0);
  };

  const maxOpacityAnimated = () => {
    opacityAnimatedFunc(opacityValue, 0.5);
  };

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
      delay: delay,
      useNativeDriver: false,
    }).start();
  };

  const animatedWidthStyle = {
    width: widthValue,
  };

  const animatedHeightStyle = {
    height: heightValue,
  };

  const onPressHide = () => {
    if (!activeHiddenState) dispatch(hideOverlay());
    dispatch(hideMainTabMenu());
  };

  return (
    <Animated.View
      style={[styles.container, animatedOpacityStyle, animatedWidthStyle, animatedHeightStyle]}
    >
      <TouchableOpacity style={styles.touchable} onPress={onPressHide}></TouchableOpacity>
    </Animated.View>
  );
};

export default Overlay;
