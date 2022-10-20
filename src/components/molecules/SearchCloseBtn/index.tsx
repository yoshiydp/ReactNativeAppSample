import React from 'react';
import { View } from 'react-native';

// Components
import Icon from '../../atoms/Icon';

// Constants
import * as COLOR from '../../../constants/color';
import * as SVGPATH from '../../../constants/svgPath';

// Styles
import styles from './SearchCloseBtn.scss';

const SearchCloseBtn = () => {
  return (
    <View style={styles.container}>
      <Icon
        width="8"
        height="14.034"
        viewBox="0 0 8 14.034"
        gTransform="translate(-97.139 0)"
        pathD={SVGPATH.ICON_ARROW_RIGHT}
        pathTransform="translate(0 0)"
        pathFill={COLOR.COLOR_GRAY_TYPE1}
      />
    </View>
  );
};

export default SearchCloseBtn;