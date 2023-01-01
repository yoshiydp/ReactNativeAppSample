import React, { useEffect, useState } from 'react';
import { View, Button, ScrollView, Text, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../../config/firebase';

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

  const handleLogout = () => {
    signOut(firebaseAuth)
      .then(() => {
        console.log('logout');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: '#88cb7f',
            borderRadius: 10,
            width: 100,
          }}
        >
          <Text style={{ color: 'white' }}>ログアウト</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MainScreen;
