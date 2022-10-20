import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// Components
import HeaderTitle from '../../components/organisms/HeaderTitle';

// Constants
import * as TEXT from '../../constants/text';

// Styles
import styles from './MyProjects.scss';

const MyProjects = () => {

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <HeaderTitle
        title={TEXT.TITLE_MY_PROJECTS}
      />
    </View>
  );
};

export default MyProjects;
