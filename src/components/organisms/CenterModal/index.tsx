import React, { useEffect, useState, useRef } from 'react';
import { Animated, Easing, View, TouchableOpacity, Button } from 'react-native';
import { useDispatch } from 'react-redux';

// Store
import { hideCenterModal } from 'store/CenterModalSlice';
import { hideOverlay, activeHidden } from 'store/OverlaySlice';

// Constants
import * as VALUE from 'constants/value';

// Styles
import styles from './CenterModal.scss';

interface Props {
  isShow: boolean;
}

const CenterModal = (props: Props) => {
  const dispatch = useDispatch();
  const scaleValue = useRef(new Animated.Value(0)).current;
  const widthValue = useRef(new Animated.Value(0)).current;
  const heightValue = useRef(new Animated.Value(0)).current;
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);

  const getTargetPosition = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
    setTargetHeight(object.nativeEvent.layout.height);
  }

  useEffect(() => {
    props.isShow ?
    (
      maxScaleAnimated(),
      sizesAnimatedFunc(widthValue, 280, 0),
      sizesAnimatedFunc(heightValue, 100, 0)
    )
    :
    (
      minScaleAnimated(),
      sizesAnimatedFunc(widthValue, 0, VALUE.DURATION_200),
      sizesAnimatedFunc(heightValue, 0, VALUE.DURATION_200)
    )
  }, [props.isShow, targetWidth, targetHeight]);

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
  }

  const animatedScale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const sizesAnimatedFunc = (object: any, value: number, delay: number) => {
    Animated.timing(object, {
      toValue : value,
      duration : 0,
      delay: delay,
      useNativeDriver: false
    }).start();
  }

  const animatedWidthStyle = {
    width: widthValue,
  }

  const animatedHeightStyle = {
    height: heightValue,
  }

  const onPressHide = () => {
    dispatch(hideOverlay());
    dispatch(activeHidden());
    dispatch(hideCenterModal());
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {transform: [
          {translateX: - (targetWidth / 2)},
          {translateY: - (targetHeight / 2)},
          {scale: animatedScale}
        ]},
        animatedWidthStyle,
        animatedHeightStyle
      ]}
      onLayout={ getTargetPosition }>
        <Button
          title="Close"
          onPress={ onPressHide }
        />
    </Animated.View>
  );
};

export default CenterModal;
