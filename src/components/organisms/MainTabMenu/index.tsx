import React, { useEffect, useRef, useState, useCallback } from "react";
import { Animated, View, TouchableOpacity, Text } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  HandlerStateChangeEvent,
} from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

// Store
import { hideOverlay } from "store/OverlaySlice";
import { hideMainTabMenu } from "store/MainTabMenuSlice";

// Components
import Icon from "components/atoms/Icon";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";
import * as VALUE from "constants/value";

// Styles
import styles from "./MainTabMenu.scss";

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
  };

  const getTargetWidth = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
  };

  useEffect(() => {
    props.isShow
      ? (translateYAnimated(translateValue, 0), positionAnimatedFunc(positionValue, 0, 0))
      : (translateYAnimated(translateValue, containerHeight),
        positionAnimatedFunc(positionValue, 0, VALUE.DURATION_200));
  }, [containerHeight, targetWidth, props.isShow]);

  const translateYAnimated = (object: any, value: number) => {
    Animated.timing(object, {
      toValue: value,
      duration: VALUE.DURATION_200,
      useNativeDriver: false,
    }).start();
  };

  const animatedTranlate = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 0],
  });

  const animatedTranlateStyle = {
    transform: [{ translateY: animatedTranlate }],
  };

  const positionAnimatedFunc = (object: any, value: number, delay: number) => {
    Animated.timing(object, {
      toValue: value,
      duration: 0,
      delay: delay,
      useNativeDriver: false,
    }).start();
  };

  const animatedPositionStyle = {
    bottom: positionValue,
  };

  const hideActivated = () => {
    dispatch(hideOverlay());
    dispatch(hideMainTabMenu());
  };

  const velocityThreshold = 0.3;
  const directionalOffsetThreshold = 80;

  const isValidSwipe = (velocity: number, directionalOffset: number) => {
    return (
      Math.abs(velocity) > velocityThreshold &&
      Math.abs(directionalOffset) < directionalOffsetThreshold
    );
  };

  const onPanGestureEvent = useCallback(
    (event: HandlerStateChangeEvent<any>) => {
      const { nativeEvent } = event;

      if (!isValidSwipe(nativeEvent.velocityY, nativeEvent.translationY)) {
        return;
      }

      if (nativeEvent.velocityY > 0) {
        hideActivated();
      }
    },
    [hideActivated],
  );

  return (
    <Animated.View
      style={[styles.container, animatedPositionStyle, animatedTranlateStyle]}
      onLayout={getContainerHeight}
    >
      <GestureHandlerRootView>
        <PanGestureHandler onActivated={onPanGestureEvent}>
          <View style={styles.nav}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.navItem}
              onPress={() => props.navigation.navigate("NewProject")}
            >
              <View style={styles.navIcon}>
                <Icon
                  svgType={1}
                  width="12"
                  height="15"
                  viewBox="0 0 12 15"
                  gTransform="translate(-4 -1)"
                  pathD1={SVGPATH.ICON_NEW_DOCUMENT_PATH1}
                  pathTransform1="translate(0 0)"
                  pathD2={SVGPATH.ICON_NEW_DOCUMENT_PATH2}
                  pathTransform2="translate(-3.5 -5.5)"
                  pathFill={COLOR.COLOR_BLUE_OVERLAY}
                />
              </View>
              <Text style={styles.navText}>新しいプロジェクトを作成</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.navItem}
              onPress={() => props.navigation.navigate("NewTrack")}
            >
              <View style={styles.navIcon}>
                <Icon
                  svgType={1}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  gTransform="translate(-1.25 -1.25)"
                  pathD1={SVGPATH.ICON_NEW_MUSIC_PATH1}
                  pathTransform1="translate(-1.047 -1.048)"
                  pathD2={SVGPATH.ICON_NEW_MUSIC_PATH2}
                  pathTransform2="translate(0)"
                  pathD3={SVGPATH.ICON_NEW_MUSIC_PATH3}
                  pathTransform3="translate(-4.884 -4.884)"
                  pathFill={COLOR.COLOR_BLUE_OVERLAY}
                />
              </View>
              <Text style={styles.navText}>新しいトラックを追加</Text>
            </TouchableOpacity>
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.close, { transform: [{ translateX: -(targetWidth / 2) }] }]}
        onLayout={getTargetWidth}
        onPress={hideActivated}
      >
        <Icon
          svgType={1}
          width="39.598"
          height="39.598"
          viewBox="0 0 39.598 39.598"
          gTransform="translate(19.799) rotate(45)"
          pathD1={SVGPATH.ICON_CLOSE_CIRCLE}
          pathFill={COLOR.COLOR_GREEN_BASE}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MainTabMenu;
