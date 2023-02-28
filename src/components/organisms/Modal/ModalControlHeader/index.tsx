import React, { useRef, useState } from "react";
import { View, Animated, Pressable } from "react-native";
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";
import { hideModalPageSheet } from "store/ModalPageSheetSlice";

// Components
import SearchBar from "components/molecules/SearchBar";
import Icon from "components/atoms/Icon";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";
import * as VALUE from "constants/value";

// Styles
import styles from "./ModalControlHeader.scss";

interface Props {
  setSearchValue?: (value: string) => void;
}

const ModalControlHeader = (props: Props) => {
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(false);
  const opacityValue = useRef(new Animated.Value(1)).current;
  const myProjectsItems = useSelector((state) => state.myProjectsItems.myProjectsItems);
  const trackListItems = useSelector((state) => state.trackListItems.trackListItems);

  const minOpacityAnimated = () => {
    setIsHidden(true);
    opacityAnimatedFunc(opacityValue, 0);
  };

  const maxOpacityAnimated = () => {
    setIsHidden(false);
    opacityAnimatedFunc(opacityValue, 1);
  };

  const opacityAnimatedFunc = (object: any, value: number) => {
    Animated.timing(object, {
      toValue: value,
      duration: VALUE.DURATION_200,
      useNativeDriver: false,
    }).start();
  };

  const onPressClose = () => {
    dispatch(hideModalPageSheet());
  };

  const animatedOpacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedOpacityStyle = {
    opacity: animatedOpacity,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.closeButtonWrap, animatedOpacityStyle]}>
        <Pressable style={styles.closeButton} onPress={onPressClose}>
          <Icon
            svgType={4}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            pathD1={SVGPATH.ICON_CLOSE}
            pathTransform1="translate(-0.5 -0.5)"
            pathFill={COLOR.COLOR_GRAY_TYPE1}
          />
        </Pressable>
      </Animated.View>
      {(myProjectsItems.length > 0 || trackListItems.length > 0) && (
        <SearchBar
          activeMinOpacityAnimated={minOpacityAnimated}
          activeMaxOpacityAnimated={maxOpacityAnimated}
          setSearchValue={props.setSearchValue}
        />
      )}
    </View>
  );
};

export default ModalControlHeader;
