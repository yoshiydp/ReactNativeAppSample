import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Screens
import MyProjectsScreen from '../../../screens/MyProjects';
import TrackListScreen from '../../../screens/TrackList';
import RecordAudioScreen from '../../../screens/RecordAudio';
import MyAccountScreen from '../../../screens/MyAccount';

// Components
import Icon from '../../atoms/Icon';

// Constants
import * as COLOR from '../../../constants/color';
import * as SVGPATH from '../../../constants/svgPath';

// Styles
import styles from './MainTabBar.scss';

const MainNavBar = () => {
  const [targetWidth, setTargetWidth] = useState(0);

  const getTargetWidth = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
  }

  useEffect(() => {
  }, [targetWidth]);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.containerTabBar,
        }}
        initialRouteName={ "MyProjects" }
        >
        <Tab.Screen
          name="MyProjects"
          component={ MyProjectsScreen }
          options={{
            tabBarLabel: '',
            tabBarItemStyle: styles.tabBarLabel,
            tabBarIcon: () => (
              <Icon
                width="8"
                height="14.034"
                viewBox="0 0 8 14.034"
                gTransform="translate(-97.139 0)"
                pathD={SVGPATH.ICON_ARROW_RIGHT}
                pathTransform="translate(0 0)"
                pathFill={COLOR.COLOR_GRAY_TYPE1}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TrackList"
          component={ TrackListScreen }
          options={{
            tabBarLabel: '',
            tabBarItemStyle: [styles.tabBarLabel, { marginRight: targetWidth / 2 }],
            tabBarIcon: () => (
              <Icon
                width="8"
                height="14.034"
                viewBox="0 0 8 14.034"
                gTransform="translate(-97.139 0)"
                pathD={SVGPATH.ICON_ARROW_RIGHT}
                pathTransform="translate(0 0)"
                pathFill={COLOR.COLOR_GRAY_TYPE1}
              />
            ),
          }}
        />
        <Tab.Screen
          name="RecordAudio"
          component={ RecordAudioScreen }
          options={{
            tabBarLabel: '',
            tabBarItemStyle: [styles.tabBarLabel, { marginLeft: targetWidth / 2 }],
            tabBarIcon: () => (
              <Icon
                width="8"
                height="14.034"
                viewBox="0 0 8 14.034"
                gTransform="translate(-97.139 0)"
                pathD={SVGPATH.ICON_ARROW_RIGHT}
                pathTransform="translate(0 0)"
                pathFill={COLOR.COLOR_GRAY_TYPE1}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MyAccount"
          component={ MyAccountScreen }
          options={{
            tabBarLabel: '',
            tabBarItemStyle: styles.tabBarLabel,
            tabBarIcon: () => (
              <Icon
                width="8"
                height="14.034"
                viewBox="0 0 8 14.034"
                gTransform="translate(-97.139 0)"
                pathD={SVGPATH.ICON_ARROW_RIGHT}
                pathTransform="translate(0 0)"
                pathFill={COLOR.COLOR_GRAY_TYPE1}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <TouchableOpacity
        style={[
          styles.containerMainTabMenu,
          { transform: [{ translateX: - (targetWidth / 2) }] }
        ]}
        onLayout={ getTargetWidth }>
        <Icon
          width="28"
          height="28"
          viewBox="0 0 28 28"
          pathD={SVGPATH.ICON_PLUS_CIRCLE}
          pathFill={COLOR.COLOR_GRAY_TYPE3}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MainNavBar;
