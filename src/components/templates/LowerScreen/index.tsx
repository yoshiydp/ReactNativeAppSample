import React, { useEffect, useState } from 'react';
import { View, ScrollView, Button } from 'react-native';

// Components
import LowerTitleHeader from '../../molecules/LowerTitleHeader';

// Styles
import styles from './LowerScreen.scss';

interface Props {
  navigation: any;
  title: string;
}

const LowerScreen = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <View style={ styles.container }>
      <LowerTitleHeader
        title={ props.title }
        navigation={ props.navigation }
      />
      <ScrollView>
        <Button title="NewProject" onPress={() => props.navigation.navigate('NewProject')} />
        <Button title="EditProject" onPress={() => props.navigation.navigate('EditProject')} />
        <Button title="Recording" onPress={() => props.navigation.navigate('Recording')} />
        <Button title="NewTrack" onPress={() => props.navigation.navigate('NewTrack')} />
        <Button title="EditTrack" onPress={() => props.navigation.navigate('EditTrack')} />
        <Button title="EditMyAccount" onPress={() => props.navigation.navigate('EditMyAccount')} />
        <Button title="PasswordReset" onPress={() => props.navigation.navigate('PasswordReset')} />
        {/* <View style={styles.block }></View> */}
      </ScrollView>
    </View>
  );
};

export default LowerScreen;
