import React, { useEffect, useState, useRef } from "react";
import { Animated, Easing, Text } from "react-native";

// Store
import { useSelector } from "store/index";

// Components
import HorizontalButtonList from "components/molecules/Modal/HorizontalButtonList";

// Constants
import * as VALUE from "constants/value";

// Styles
import styles from "./CenterModalProjectSettings.scss";

interface Props {
  isShow: boolean;
  navigation: any;
}

const CenterModalProjectSettings = (props: Props) => {
  const centerModalProjectSettingsMessage = useSelector(
    (state) => state.centerModalProjectSettings.message
  );
  const centerModalProjectSettingsTrackTitle = useSelector(
    (state) => state.centerModalProjectSettings.trackTitle
  );
  const centerModalProjectSettingsNotes = useSelector(
    (state) => state.centerModalProjectSettings.notes
  );
  const centerModalProjectSettingsSubmitButtonText = useSelector(
    (state) => state.centerModalProjectSettings.submitButtonText
  );
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);

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
  }, [
    props.isShow,
    centerModalProjectSettingsMessage,
    centerModalProjectSettingsTrackTitle,
    centerModalProjectSettingsNotes,
    centerModalProjectSettingsSubmitButtonText,
    targetWidth,
    targetHeight,
  ]);

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
      {centerModalProjectSettingsMessage && (
        <Text style={styles.title}>{centerModalProjectSettingsMessage}</Text>
      )}
      {centerModalProjectSettingsTrackTitle && (
        <Text style={styles.dataTitle}>{centerModalProjectSettingsTrackTitle}</Text>
      )}
      {centerModalProjectSettingsNotes && (
        <Text style={styles.notes}>{centerModalProjectSettingsNotes}</Text>
      )}
      <HorizontalButtonList navigation={props.navigation} />
    </Animated.View>
  );
};

export default CenterModalProjectSettings;
