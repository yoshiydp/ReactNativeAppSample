import React, { useEffect, useRef, useState } from 'react';
import { View, Animated } from 'react-native';

// Components
import SearchBar from '../../molecules/SearchBar';

// Constants
import * as VALUE from '../../../constants/value';

// Styles
import styles from './HeaderTitle.scss';

interface Props {
  title: string;
}

const HeaderTitle = (props: Props) => {
  const [isHidden, setIsHidden] = useState(false);
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
  }, [isHidden]);

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
      toValue : value,
      duration : VALUE.DURATION_200,
      useNativeDriver: false
    }).start();
  }

  const animatedOpacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const animatedOpacityStyle = {
    opacity: animatedOpacity
  }

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.title, animatedOpacityStyle]}>
        {props.title}
      </Animated.Text>
      <SearchBar
        activeMinOpacityAnimated={minOpacityAnimated}
        activeMaxOpacityAnimated={maxOpacityAnimated}
      />
    </View>
  );
};

export default HeaderTitle;
