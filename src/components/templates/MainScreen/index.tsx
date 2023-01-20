import React, { useEffect, useState } from 'react';
import { View, Button, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from 'src/config/firebase';
import auth from '@react-native-firebase/auth';

// Store
import { useSelector } from 'store/index';
import { unsubscribe } from 'src/store/SubscribeSlice';

// Components
import MainTitleHeader from 'components/organisms/MainTitleHeader';
import MyProjectsList from 'src/components/organisms/MyProjects/MyProjectsList';

// Constants
import * as TEXT from 'constants/text';

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
      <ScrollView>
        <MainTitleHeader
          title={ props.title }
        />
        {
          props.title === TEXT.TITLE_MY_PROJECTS ?
            <MyProjectsList />
          : props.title === TEXT.TITLE_TRACK_LIST ?
            <Text>{ TEXT.TITLE_TRACK_LIST } screen</Text>
          : props.title === TEXT.TITLE_RECORD_AUDIO ?
            <Text>{ TEXT.TITLE_RECORD_AUDIO } screen</Text>
          : props.title === TEXT.TITLE_MY_ACCOUNT ?
            <Text>{ TEXT.TITLE_MY_ACCOUNT } screen</Text>
          : ''
        }
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
