import React, { useRef, useState } from "react";
import { View, Animated } from "react-native";

// Store
import { useSelector } from "store/index";

// Components
// import SearchBar from "components/molecules/SearchBar";

// Constants
import * as VALUE from "constants/value";

// Styles
import styles from "./MainTitleHeader.scss";

interface Props {
  title: string;
  setSearchValue?: (value: string) => void;
}

const MainTitleHeader = (props: Props) => {
  const [isHidden, setIsHidden] = useState(false);
  const opacityValue = useRef(new Animated.Value(1)).current;
  const myProjectsItems = useSelector((state) => state.myProjectsItems.myProjectsItems);
  const trackListItems = useSelector((state) => state.trackListItems.trackListItems);

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

  const minOpacityAnimated = () => {
    setIsHidden(true);
    opacityAnimatedFunc(opacityValue, 0);
  };

  const maxOpacityAnimated = () => {
    setIsHidden(false);
    opacityAnimatedFunc(opacityValue, 1);
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, animatedOpacityStyle]}>{props.title}</Animated.Text>
      {/* {(myProjectsItems.length > 0 || trackListItems.length > 0) && (
        <SearchBar
          activeMinOpacityAnimated={minOpacityAnimated}
          activeMaxOpacityAnimated={maxOpacityAnimated}
          setSearchValue={props.setSearchValue}
        />
      )} */}
    </View>
  );
};

export default MainTitleHeader;
