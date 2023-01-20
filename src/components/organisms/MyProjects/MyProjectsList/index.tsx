import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

// Components
import MyProjectsItem from 'components/organisms/MyProjects/MyProjectsItem';

// Styles
import styles from './MyProjectsList.scss';

const MyProjectsList = () => {

  useEffect(() => {
  }, []);

  return (
    <View style={ styles.container }>
      <MyProjectsItem />
    </View>
  );
};

export default MyProjectsList;
