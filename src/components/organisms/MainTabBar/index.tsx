import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Screens
import MyProjectsScreen from '../../../screens/MyProjects';
import TrackListScreen from '../../../screens/TrackList';
import RecordAudioScreen from '../../../screens/RecordAudio';
import MyAccountScreen from '../../../screens/MyAccount';

// Styles
import styles from './MainTabBar.scss';

const MainNavBar = () => {

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.containerTabBar
        }}
        initialRouteName={ "MyProjects" }
        >
        <Tab.Screen
          name="MyProjects"
          component={ MyProjectsScreen }
        />
        <Tab.Screen
          name="TrackList"
          component={ TrackListScreen }
        />
        <Tab.Screen
          name="RecordAudio"
          component={ RecordAudioScreen }
        />
        <Tab.Screen
          name="MyAccount"
          component={ MyAccountScreen }
        />
      </Tab.Navigator>
    </View>
  );
};

export default MainNavBar;
