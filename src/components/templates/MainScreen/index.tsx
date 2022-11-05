import React, { useEffect, useState } from 'react';
import { View, ScrollView, Button } from 'react-native';

// Components
import HeaderTitle from '../../organisms/HeaderTitle';

// Styles
import styles from './MainScreen.scss';

interface Props {
  navigation: any;
  title: string;
}

const MainScreen = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <View style={ styles.container }>
      <HeaderTitle
        title={ props.title }
      />
      <ScrollView>
        <Button title="RecordAudio" onPress={() => props.navigation.navigate('RecordAudio')} />
        {/* <View style={styles.block }></View> */}
      </ScrollView>
    </View>
  );
};

export default MainScreen;
