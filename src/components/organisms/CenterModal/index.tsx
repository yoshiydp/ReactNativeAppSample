import React, { useEffect, useState, useRef } from "react";
import { Animated, Easing, Text } from "react-native";

// Store
import { useSelector } from "store/index";

// Components
import HorizontalButtonList from "components/molecules/Modal/HorizontalButtonList";

// Constants
import * as VALUE from "constants/value";

// Styles
import styles from "./CenterModal.scss";

interface Props {
  isShow: boolean;
}

const CenterModal = (props: Props) => {
  const centerModalTitleState = useSelector((state) => state.centerModal.title);
  const centerModalDataTitleState = useSelector((state) => state.centerModal.dataTitle);
  const centerModalDescriptionState = useSelector((state) => state.centerModal.description);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);

  const getTargetPosition = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
    setTargetHeight(object.nativeEvent.layout.height);
  };

  useEffect(() => {
    props.isShow ? maxScaleAnimated() : minScaleAnimated();
  },
  [
    props.isShow,
    centerModalTitleState,
    centerModalDataTitleState,
    centerModalDescriptionState,
    targetWidth,
    targetHeight
  ]);

  const minScaleAnimated = () => {
    scaleAnimatedFunc(scaleValue, 0);
  };

  const maxScaleAnimated = () => {
    scaleAnimatedFunc(scaleValue, 1);
  };

  const scaleAnimatedFunc = (object: any, value: number) => {
    Animated.timing(object, {
      toValue : value,
      duration : VALUE.DURATION_200,
      easing: Easing.ease,
      useNativeDriver: false
    }).start();
  };

  const animatedScale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {transform: [
          {translateX: - (targetWidth / 2)},
          {translateY: - (targetHeight / 2)},
          {scale: animatedScale}
        ]},
      ]}
      onLayout={ getTargetPosition }>
      { centerModalTitleState &&
        <Text style={ styles.title }>
          { centerModalTitleState }
        </Text>
      }
      { centerModalDataTitleState &&
        <Text style={ styles.dataTitle }>
          { centerModalDataTitleState }
        </Text>
      }
      { centerModalDescriptionState &&
        <Text style={ styles.description }>
          { centerModalDescriptionState }
        </Text>
      }
      <HorizontalButtonList
      />
    </Animated.View>
  );
};

export default CenterModal;
