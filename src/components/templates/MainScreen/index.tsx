import React, { useEffect, useState } from 'react';
import { View, Button, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../../config/firebase';
import auth from '@react-native-firebase/auth';

// Store
import { useSelector } from 'store/index';
import { unsubscribe } from 'src/store/SubscribeSlice';

// Components
import MainTitleHeader from 'components/organisms/MainTitleHeader';

// Styles
import styles from './MainScreen.scss';

interface Props {
  navigation: any;
  title: string;
}

const MainScreen = (props: Props) => {
  const dispatch = useDispatch();
  const subscribed = useSelector((state) => state.subscribe.subscribe);

  useEffect(() => {
    console.log('route: '+props.navigation);
  }, [props.navigation]);

  const handleLogout = () => {
    signOut(firebaseAuth)
      .then(() => {
        console.log('logout');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const socialSignOut = async () => {
    await auth().signOut();
    dispatch(unsubscribe());
    console.log('SignOut');
  }

  return (
    <View style={ styles.container }>
      <MainTitleHeader
        title={ props.title }
      />
      <ScrollView>
        {/* <Button title="NewProject" onPress={() => props.navigation.navigate('NewProject')} />
        <Button title="EditProject" onPress={() => props.navigation.navigate('EditProject')} />
        <Button title="Recording" onPress={() => props.navigation.navigate('Recording')} />
        <Button title="NewTrack" onPress={() => props.navigation.navigate('NewTrack')} />
        <Button title="EditTrack" onPress={() => props.navigation.navigate('EditTrack')} />
        <Button title="EditMyAccount" onPress={() => props.navigation.navigate('EditMyAccount')} />
        <Button title="PasswordReset" onPress={() => props.navigation.navigate('PasswordReset')} /> */}
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
        <TouchableOpacity
          onPress={socialSignOut}
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: '#88cb7f',
            borderRadius: 10,
            width: 100,
          }}
        >
          <Text style={{ color: 'white' }}>Google SignOut</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MainScreen;
