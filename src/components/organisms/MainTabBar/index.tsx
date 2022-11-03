import React, { useEffect, useRef, useState } from 'react';
import { View, Button } from 'react-native';

// Components
import SearchBar from '../../molecules/SearchBar';

// Styles
import styles from './MainTabBar.scss';

interface Props {
  navigation: any;
}

const MainNavBar = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={styles.list}>
      <Button title="RecordAudio" onPress={() => navigation.navigate('RecordAudio')} />
      </View>
    </View>
  );
};

export default MainNavBar;
