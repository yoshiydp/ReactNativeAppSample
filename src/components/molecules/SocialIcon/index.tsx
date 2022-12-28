import React from 'react';
import { TouchableOpacity } from 'react-native';

// Components
import Icon from 'components/atoms/Icon';

// Constants
import * as COLOR from 'constants/color';
import * as SVGPATH from 'constants/svgPath';

// Styles
import styles from './SocialIcon.scss';

interface Props {
  onPressEvent?: () => void;
}

const SocialIcon = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={ styles.container }
      onPress={ props.onPressEvent }>
      <Icon
        svgType={1}
        width="15"
        height="19"
        viewBox="0 0 15 19"
        pathD1={SVGPATH.ICON_APPLE}
        pathTransform1="translate(-20.5 -16)"
        pathFill={COLOR.COLOR_BLACK_BASE}
      />
    </TouchableOpacity>
  );
};

export default SocialIcon;
