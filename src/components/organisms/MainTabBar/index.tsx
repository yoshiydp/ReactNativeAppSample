import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Store
import { useSelector } from 'store/index';
import { showOverlay } from 'store/OverlaySlice';
import { showMainTabMenu } from 'store/MainTabMenuSlice';

// Screens
import MyProjectsScreen from 'screens/MyProjects';
import TrackListScreen from 'screens/TrackList';
import RecordAudioScreen from 'screens/RecordAudio';
import MyAccountScreen from 'screens/MyAccount';

// Components
import MainTabMenu from 'components/organisms/MainTabMenu';
import Overlay from 'components/atoms/Overlay';
import Icon from 'components/atoms/Icon';

// Constants
import * as COLOR from 'constants/color';
import * as SVGPATH from 'constants/svgPath';

// Styles
import styles from './MainTabBar.scss';

interface Props {
  navigation: any;
  inactiveHidden: boolean;
}

const MainNavBar = (props: Props) => {
  const dispatch = useDispatch();
  const overlay = useSelector((state) => state.overlay.overlay);
  const mainTabMenu = useSelector((state) => state.mainTabMenu.mainTabMenu);
  const [targetWidth, setTargetWidth] = useState(0);

  const getTargetWidth = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
  }

  useEffect(() => {
  }, [targetWidth]);

  const onPressShow = () => {
    dispatch(showOverlay());
    dispatch(showMainTabMenu());
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.containerTabBar,
          tabBarActiveTintColor: COLOR.COLOR_GREEN_BASE,
          tabBarInactiveTintColor: COLOR.COLOR_GRAY_TYPE3
        }}
        initialRouteName={ "MyProjects" }
        >
        <Tab.Screen
          name="MyProjects"
          component={ MyProjectsScreen }
          options={{
            tabBarLabel: '',
            tabBarItemStyle: styles.tabBarLabel,
            tabBarIcon: ({ color }) => (
              <Icon
                svgType={3}
                width="20"
                height="16.219"
                viewBox="0 0 20 16.219"
                parentGTransform1="translate(0 0)"
                parentGTransform2="translate(0.263 4.438)"
                childGTransform1="translate(0 0)"
                childGTransform2="translate(0 0)"
                pathD1={SVGPATH.ICON_FOLDER_PATH1}
                pathD2={SVGPATH.ICON_FOLDER_PATH2}
                pathTransform1="translate(0 -48.403)"
                pathTransform2="translate(-6.746 -162.01)"
                pathFill={
                  color
                  ? color
                  : COLOR.COLOR_GRAY_TYPE3
                }
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
            tabBarIcon: ({ color }) => (
              <Icon
                svgType={2}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                parentGTransform="translate(0 -0.004)"
                childGTransform="translate(0 0.004)"
                pathD={SVGPATH.ICON_MUSIC}
                pathTransform="translate(0 -0.004)"
                pathFill={
                  color
                  ? color
                  : COLOR.COLOR_GRAY_TYPE3
                }
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
            tabBarIcon: ({ color }) => (
              <Icon
                svgType={4}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                pathD1={SVGPATH.ICON_SOUND_PATH1}
                pathD2={SVGPATH.ICON_SOUND_PATH2}
                pathD3={SVGPATH.ICON_SOUND_PATH3}
                pathD4={SVGPATH.ICON_SOUND_PATH4}
                pathD5={SVGPATH.ICON_SOUND_PATH5}
                pathTransform1="translate(0 -156.948)"
                pathTransform2="translate(-104.631 -78.471)"
                pathTransform3="translate(-209.267 0.007)"
                pathTransform4="translate(-313.905 -78.471)"
                pathTransform5="translate(-418.541 -156.948)"
                pathFill={
                  color
                  ? color
                  : COLOR.COLOR_GRAY_TYPE3
                }
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
            tabBarIcon: ({ color }) => (
              <Icon
                svgType={4}
                width="17"
                height="20.376"
                viewBox="0 0 17 20.376"
                pathD1={SVGPATH.ICON_PERSON_PATH1}
                pathD2={SVGPATH.ICON_PERSON_PATH2}
                pathTransform1="translate(-83.568)"
                pathTransform2="translate(0 -237.474)"
                pathFill={
                  color
                  ? color
                  : COLOR.COLOR_GRAY_TYPE3
                }
              />
            ),
          }}
        />
      </Tab.Navigator>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.containerMainTabMenu,
          { transform: [{ translateX: - (targetWidth / 2) }] }
        ]}
        onLayout={ getTargetWidth }
        onPress={ onPressShow }>
        <Icon
          svgType={1}
          width="28"
          height="28"
          viewBox="0 0 28 28"
          pathD1={SVGPATH.ICON_PLUS_CIRCLE}
          pathFill={COLOR.COLOR_GRAY_TYPE3}
        />
      </TouchableOpacity>
      <MainTabMenu
        isShow={ mainTabMenu }
        navigation={ props.navigation }
      />
      <Overlay
        isShow={ overlay }
      />
    </View>
  );
};

export default MainNavBar;
