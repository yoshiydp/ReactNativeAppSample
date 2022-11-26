import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// Components
import MainTitleHeader from '../../components/organisms/MainTitleHeader';

// Constants
import * as TEXT from '../../constants/text';

// Styles
import styles from './SignUp.scss';

const SignUp = () => {

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <MainTitleHeader
        title={TEXT.TITLE_SIGNUP}
      />
    </View>
  );
};

export default SignUp;
