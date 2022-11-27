import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// Components
import Icon from '@src/components/atoms/Icon';

// Constants
import * as COLOR from '@src/constants/color';
import * as SVGPATH from '@src/constants/svgPath';

// Styles
import styles from './LowerTitleHeader.scss';

interface Props {
  title: string;
  navigation: any;
}

const LowerTitleHeader = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.backBtn}
        onPress={() => props.navigation.goBack()} >
        <Icon
          svgType={1}
          width="10"
          height="17.543"
          viewBox="0 0 10 17.543"
          gTransform="translate(-97.141 -0.001)"
          pathD1={SVGPATH.ICON_ARROW_LEFT}
          pathTransform1="translate(0)"
          pathFill={COLOR.COLOR_GRAY_TYPE1}
        />
      </TouchableOpacity>
      <Text
        style={[styles.title]}>
        {props.title}
      </Text>
    </View>
  );
};

export default LowerTitleHeader;
