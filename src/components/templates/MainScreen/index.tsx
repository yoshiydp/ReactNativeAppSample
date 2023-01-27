import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { firebaseAuth, db } from 'src/config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
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

interface MyProjectData {
  projectTitle: string;
  lyric: string;
  trackDataPath: string;
  trackTitle: string;
  artistName: string;
  artWorkPath: string;
}

interface Props {
  navigation: any;
  title: string;
  myProjectDataItems: Array<MyProjectData>;
}

const MainScreen = (props: Props) => {
  const dispatch = useDispatch();

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

  const socialSignOut = async () => {
    await auth().signOut();
    dispatch(unsubscribe());
    console.log('SignOut');
  }

  const addSampleData = async () => {
    const { uid }: any = firebaseAuth.currentUser;
    if (!uid) return;
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      projectData: sampleProjectData,
    });
  }

  const sampleProjectData = [
    {
      projectTitle: 'Project Title1',
      lyric: 'リリックが表示されます。リリックが表示されます…',
      trackDataPath: '',
      trackTitle: 'Track Title',
      artistName: 'Artist Name',
      artWorkPath: ''
    },
    {
      projectTitle: 'Project Title2',
      lyric: 'リリックが表示されます。リリックが表示されます…',
      trackDataPath: '',
      trackTitle: 'Track Title',
      artistName: 'Artist Name',
      artWorkPath: ''
    },
    {
      projectTitle: 'Project Title3',
      lyric: 'リリックが表示されます。リリックが表示されます…',
      trackDataPath: '',
      trackTitle: 'Track Title',
      artistName: 'Artist Name',
      artWorkPath: ''
    },
    {
      projectTitle: 'Project Title4',
      lyric: 'リリックが表示されます。リリックが表示されます…',
      trackDataPath: '',
      trackTitle: 'Track Title',
      artistName: 'Artist Name',
      artWorkPath: ''
    },
    {
      projectTitle: 'Project Title5',
      lyric: 'リリックが表示されます。リリックが表示されます…',
      trackDataPath: '',
      trackTitle: 'Track Title',
      artistName: 'Artist Name',
      artWorkPath: ''
    },
    {
      projectTitle: 'Project Title6',
      lyric: 'リリックが表示されます。リリックが表示されます…',
      trackDataPath: '',
      trackTitle: 'Track Title',
      artistName: 'Artist Name',
      artWorkPath: ''
    },
    {
      projectTitle: 'Project Title7',
      lyric: 'リリックが表示されます。リリックが表示されます…',
      trackDataPath: '',
      trackTitle: 'Track Title',
      artistName: 'Artist Name',
      artWorkPath: ''
    },
    {
      projectTitle: 'Project Title8',
      lyric: 'リリックが表示されます。リリックが表示されます…',
      trackDataPath: '',
      trackTitle: 'Track Title',
      artistName: 'Artist Name',
      artWorkPath: ''
    },
    {
      projectTitle: 'Project Title9',
      lyric: 'リリックが表示されます。リリックが表示されます…',
      trackDataPath: '',
      trackTitle: 'Track Title',
      artistName: 'Artist Name',
      artWorkPath: ''
    },
    {
      projectTitle: 'Project Title10',
      lyric: 'リリックが表示されます。リリックが表示されます…',
      trackDataPath: '',
      trackTitle: 'Track Title',
      artistName: 'Artist Name',
      artWorkPath: ''
    },
  ];

  return (
    <View style={ styles.container }>
      <MainTitleHeader
        title={ props.title }
      />
      <ScrollView>
        {
          props.title === TEXT.TITLE_MY_PROJECTS ?
            <MyProjectsList
              myProjectDataItems={ props.myProjectDataItems }
              navigation={ props.navigation }
            />
          : props.title === TEXT.TITLE_TRACK_LIST ?
            <Text>{ TEXT.TITLE_TRACK_LIST } screen</Text>
          : props.title === TEXT.TITLE_RECORD_AUDIO ?
            <Text>{ TEXT.TITLE_RECORD_AUDIO } screen</Text>
          : props.title === TEXT.TITLE_MY_ACCOUNT ?
            <Text>{ TEXT.TITLE_MY_ACCOUNT } screen</Text>
          : ''
        }
        <TouchableOpacity
          onPress={ addSampleData }
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: '#88cb7f',
            borderRadius: 10,
            width: 100,
          }}
        >
          <Text style={{ color: 'white' }}>サンプルデータ追加</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ handleLogout }
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
          onPress={ socialSignOut }
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: '#88cb7f',
            borderRadius: 10,
            width: 100,
          }}>
          <Text style={{ color: 'white' }}>Google SignOut</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MainScreen;
