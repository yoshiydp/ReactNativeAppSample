import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';

// Components
import Icon from '../../atoms/Icon';

// Constants
import * as COLOR from '../../../constants/color';
import * as SVGPATH from '../../../constants/svgPath';

// Styles
import styles from './MainTabMenu.scss';

const MainTabMenu = () => {
  const [targetWidth, setTargetWidth] = useState(0);

  const getTargetWidth = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
  }

  useEffect(() => {
  }, [targetWidth]);

  const onOpenButtonClick = () => {
    // dispatchShowOverlay();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.close,
          { transform: [{ translateX: - (targetWidth / 2) }] }
        ]}
        onLayout={ getTargetWidth }
        onPress={ onOpenButtonClick }>
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
    </View>
  );
};

export default MainTabMenu;
