import React, { useRef, useEffect, useState } from "react";
import { Animated, Easing, TouchableOpacity, TextInput } from "react-native";

// Components
import Icon from "components/atoms/Icon";

// Constants
import * as COLOR from "constants/color";
import * as VALUE from "constants/value";
import * as SVGPATH from "constants/svgPath";

// Styles
import styles from "./EditCueNameTextField.scss";

interface Props {
  isShow: boolean;
  value: string;
  onChangeText?: (value: string) => void;
  onPressSave: () => void;
}

const EditCueNameTextField = (props: Props) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [value, valueHandler] = useState(props.value ? props.value : "");

  const getTargetPosition = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
    setTargetHeight(object.nativeEvent.layout.height);
  };

  const scaleAnimatedFunc = (object: any, value: number) => {
    Animated.timing(object, {
      toValue: value,
      duration: VALUE.DURATION_200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const animatedScale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const minScaleAnimated = () => {
    scaleAnimatedFunc(scaleValue, 0);
  };

  const maxScaleAnimated = () => {
    scaleAnimatedFunc(scaleValue, 1);
  };

  useEffect(() => {
    props.isShow ? maxScaleAnimated() : minScaleAnimated();
    valueHandler(props.value ? props.value : "");
  }, [props.isShow, targetWidth, targetHeight, props.value]);

  const onChangeText = (event: any) => {
    valueHandler(event);

    if (props.onChangeText) {
      props.onChangeText(event);
      console.log(event);
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: -(targetWidth / 2) },
            { translateY: -(targetHeight / 2) },
            { scale: animatedScale },
          ],
        },
      ]}
      onLayout={getTargetPosition}
    >
      <TextInput
        style={styles["text-field"]}
        placeholderTextColor={COLOR.COLOR_BLUE_NAVY}
        onChangeText={onChangeText}
        value={props.value}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles["button-save"]} onPress={props.onPressSave}>
        <Icon
          svgType={1}
          width="28"
          height="22.751"
          viewBox="0 0 28 22.751"
          gTransform="translate(-16.05 -61)"
          pathD1={SVGPATH.ICON_ARROW_CIRCLE_PATH1}
          pathTransform1="translate(0 -127.277)"
          pathD2={SVGPATH.ICON_ARROW_CIRCLE_PATH2}
          pathTransform2="translate(-78.49 0)"
          pathFill={COLOR.COLOR_WHITE_BASE}
          containerStyle={styles.icon}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default EditCueNameTextField;
