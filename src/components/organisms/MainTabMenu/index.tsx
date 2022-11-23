import React, { useEffect, useRef, useState } from 'react';
import { Animated, TouchableOpacity, Button } from 'react-native';
import { useDispatch } from 'react-redux';

// Stores
import { hideOverlay } from '../../../stores/OverlaySlice';
import { hideMainTabMenu } from '../../../stores/MainTabMenuSlice';

// Components
import Icon from '../../atoms/Icon';

// Constants
import * as COLOR from '../../../constants/color';
import * as SVGPATH from '../../../constants/svgPath';
import * as VALUE from '../../../constants/value';

// Styles
import styles from './MainTabMenu.scss';

interface Props {
  isShow: boolean;
  navigation: any;
}

const MainTabMenu = (props: Props) => {
  const dispatch = useDispatch();
  const [containerHeight, setContainerHeight] = useState(0);
  const [targetWidth, setTargetWidth] = useState(0);
  const translateValue = useRef(new Animated.Value(containerHeight)).current;
  const positionValue = useRef(new Animated.Value(-containerHeight)).current;

  const getContainerHeight = (object: any) => {
    setContainerHeight(object.nativeEvent.layout.height);
  }

  const getTargetWidth = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
  }

  useEffect(() => {
    props.isShow ?
    (
      translateYAnimated(translateValue, 0),
      positionAnimatedFunc(positionValue, 0, 0)
    )
    :
    (
      translateYAnimated(translateValue, containerHeight),
      positionAnimatedFunc(positionValue, 0, VALUE.DURATION_200)
    )
  }, [containerHeight, targetWidth, props.isShow]);

  const translateYAnimated = (object: any, value: number) => {
    Animated.timing(object, {
      toValue : value,
      duration : VALUE.DURATION_200,
      useNativeDriver: false
    }).start();
  }

  const animatedTranlate = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 0]
  });

  const animatedTranlateStyle = {
    transform: [{ translateY: animatedTranlate }]
  }

  const positionAnimatedFunc = (object: any, value: number, delay: number) => {
    Animated.timing(object, {
      toValue : value,
      duration : 0,
      delay: delay,
      useNativeDriver: false
    }).start();
  }

  const animatedPositionStyle = {
    bottom: positionValue,
  }

  const onPressHide = () => {
    dispatch(hideOverlay());
    dispatch(hideMainTabMenu());
  };

  return (
    <Animated.View
      style={[
        styles.container,
        animatedPositionStyle,
        animatedTranlateStyle
      ]}
      onLayout={ getContainerHeight }>
      <Button title="NewTrack" onPress={() => props.navigation.navigate('NewTrack')} />
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.close,
          { transform: [{ translateX: - (targetWidth / 2) }] }
        ]}
        onLayout={ getTargetWidth }
        onPress={ onPressHide }>
        <Icon
          svgType={1}
          width="39.598"
          height="39.598"
          viewBox="0 0 39.598 39.598"
          gTransform="translate(19.799) rotate(45)"
          pathD={SVGPATH.ICON_CLOSE_CIRCLE}
          pathFill={COLOR.COLOR_GREEN_BASE}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MainTabMenu;
