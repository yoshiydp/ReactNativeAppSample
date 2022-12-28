import React, { useEffect, useRef, useState } from 'react';
import { View, Text} from 'react-native';

// Components
import SocialIcon from 'components/molecules/SocialIcon';

// Constants
import * as VALUE from 'constants/value';

// Styles
import styles from './SocialSignIn.scss';

const SocialSignIn = () => {

  useEffect(() => {
  }, []);

  return (
    <View style={ styles.container }>
      <View style={ styles.titleWrap }>
        <View style={ styles.titleBorder }></View>
        <Text style={ styles.title }>
          or Sign in with
        </Text>
        <View style={ styles.titleBorder }></View>
      </View>
      <View style={ styles.socialList }>
        <View style={ styles.socialItems }>
          <SocialIcon />
        </View>
      </View>
    </View>
  );
};

export default SocialSignIn;
