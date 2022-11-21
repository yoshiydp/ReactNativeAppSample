import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

// Main Screens
import LoadingScreen from '../screens/Loading';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';

// Lower Screens
import NewProjectScreen from '../screens/MyProjects/NewProject';
import EditProjectScreen from '../screens/MyProjects/EditProject';
import RecordingScreen from '../screens/MyProjects/Recording';
import NewTrackScreen from '../screens/TrackList/NewTrack';
import EditTrackScreen from '../screens/TrackList/EditTrack';
import EditMyAccountScreen from '../screens/MyAccount/EditMyAccount';
import PasswordResetScreen from '../screens/SignUp/PasswordReset';

// Components
import MainTabBar from '../components/organisms/MainTabBar';
import Overlay from '../components/atoms/Overlay';

const Stack = createStackNavigator();

import { showOverlay } from '../actions/OverlayAction';

const mapDispatchToProps = {
  dispatchShowOverlay: showOverlay,
};

const connector = connect(undefined, mapDispatchToProps);

type AppProps = {} & ConnectedProps<typeof connector>;

const StackNavigator = (props: AppProps) => {
  const { dispatchShowOverlay } = props;

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="MainTabBar"
          component={ MainTabBar }
        />
        <Stack.Screen
          name="Loading"
          component={ LoadingScreen }
        />
        <Stack.Screen
          name="Login"
          component={ LoginScreen }
        />
        <Stack.Screen
          name="SignUp"
          component={ SignUpScreen }
        />
        <Stack.Screen
          name="NewProject"
          component={ NewProjectScreen }
        />
        <Stack.Screen
          name="EditProject"
          component={ EditProjectScreen }
        />
        <Stack.Screen
          name="Recording"
          component={ RecordingScreen }
        />
        <Stack.Screen
          name="NewTrack"
          component={ NewTrackScreen }
        />
        <Stack.Screen
          name="EditTrack"
          component={ EditTrackScreen }
        />
        <Stack.Screen
          name="EditMyAccount"
          component={ EditMyAccountScreen }
        />
        <Stack.Screen
          name="PasswordReset"
          component={ PasswordResetScreen }
        />
      </Stack.Navigator>
      <Overlay />
    </>
  );
};

export default connector(StackNavigator);
