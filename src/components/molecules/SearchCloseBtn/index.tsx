import React from 'react';
import { View } from 'react-native';

// Components
import Icon from '@src/components/atoms/Icon';

// Constants
import * as COLOR from '@src/constants/color';
import * as SVGPATH from '@src/constants/svgPath';

// Styles
import styles from './SearchCloseBtn.scss';

const SearchCloseBtn = () => {
  return (
    <View style={styles.container}>
      <Icon
        svgType={1}
        width="8"
        height="14.034"
        viewBox="0 0 8 14.034"
        gTransform="translate(-97.139 0)"
        pathD1={SVGPATH.ICON_ARROW_RIGHT}
        pathTransform1="translate(0 0)"
        pathFill={COLOR.COLOR_GRAY_TYPE1}
      />
    </View>
  );
};

export default SearchCloseBtn;
