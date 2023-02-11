import React, { useRef, useState } from "react";
import { View, TextInput, TouchableOpacity, Animated, useWindowDimensions } from "react-native";

// Components
import SearchCloseBtn from "components/molecules/SearchCloseBtn";
import Icon from "components/atoms/Icon";

// Constants
import * as TEXT from "constants/text";
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";
import * as VALUE from "constants/value";

// Styles
import styles from "./SearchBar.scss";

interface Props {
  activeMinOpacityAnimated: any;
  activeMaxOpacityAnimated: any;
}

const SearchBar = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState("");
  const widthValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const windowWidth = useWindowDimensions().width;

  const activePress = () => {
    setIsEnabled(true);
    widthAnimatedFunc(widthValue, 1);
    opacityAnimatedFunc(opacityValue, 1, VALUE.DURATION_300);
    props.activeMinOpacityAnimated();
  };

  const inactivePress = () => {
    setIsEnabled(false);
    setText("");
    widthAnimatedFunc(widthValue, 0);
    opacityAnimatedFunc(opacityValue, 0, VALUE.DURATION_200);
    props.activeMaxOpacityAnimated();
  };

  const widthAnimatedFunc = (object: any, value: number) => {
    Animated.timing(object, {
      toValue: value,
      duration: VALUE.DURATION_250,
      useNativeDriver: false
    }).start();
  };

  const animatedWidth = widthValue.interpolate({
    inputRange: [0, 1],
    outputRange: [60, windowWidth - 84]
  });

  const animatedWidthStyle = {
    width: animatedWidth
  };

  const opacityAnimatedFunc = (object: any, value: number, duration: number) => {
    Animated.timing(object, {
      toValue: value,
      duration: duration,
      useNativeDriver: false
    }).start();
  };

  const animatedOpacity = widthValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const animatedOpacityStyle = {
    opacity: animatedOpacity
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={activePress}
        style={[styles.containerOpenButton, isEnabled ? styles.containerOpenButtonActive : ""]}>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.containerSearchBar,
          animatedWidthStyle
        ]}>
        <Icon
          svgType={1}
          containerStyle={styles.icon}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          pathD1={SVGPATH.ICON_SEARCH}
          pathTransform1="translate(-0.006)"
          pathFill={COLOR.COLOR_GRAY_TYPE2}
        />
        <TextInput
          style={[styles.input, isEnabled ? styles.inputActive : ""]}
          placeholder={TEXT.PLACEHOLDER_INPUT_SEARCH}
          placeholderTextColor={COLOR.COLOR_WHITE_BASE}
          editable={isEnabled}
          selectTextOnFocus={isEnabled}
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.containerCloseButton,
          isEnabled ? styles.containerCloseButtonActive : "",
          animatedOpacityStyle
        ]}>
        <TouchableOpacity
          onPress={inactivePress}>
          <SearchCloseBtn />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SearchBar;
