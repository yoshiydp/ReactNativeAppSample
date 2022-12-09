import React, { useEffect, useState } from 'react';
import { View, Button, ScrollView, Text } from 'react-native';

import { firebaseConfig } from '../../../config';

// Components
import MainTitleHeader from 'components/organisms/MainTitleHeader';

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
      <MainTitleHeader
        title={ props.title }
      />
      <ScrollView>
        <Button title="NewProject" onPress={() => props.navigation.navigate('NewProject')} />
        <Button title="EditProject" onPress={() => props.navigation.navigate('EditProject')} />
        <Button title="Recording" onPress={() => props.navigation.navigate('Recording')} />
        <Button title="NewTrack" onPress={() => props.navigation.navigate('NewTrack')} />
        <Button title="EditTrack" onPress={() => props.navigation.navigate('EditTrack')} />
        <Button title="EditMyAccount" onPress={() => props.navigation.navigate('EditMyAccount')} />
        <Button title="PasswordReset" onPress={() => props.navigation.navigate('PasswordReset')} />
      </ScrollView>
    </View>
  );
};

export default MainScreen;
