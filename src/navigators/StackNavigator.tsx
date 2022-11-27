import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Main Screens
import LoadingScreen from '@src/screens/Loading';
import LoginScreen from '@src/screens/Login';
import SignUpScreen from '@src/screens/SignUp';

// Lower Screens
import NewProjectScreen from '@src/screens/MyProjects/NewProject';
import EditProjectScreen from '@src/screens/MyProjects/EditProject';
import RecordingScreen from '@src/screens/MyProjects/Recording';
import NewTrackScreen from '@src/screens/TrackList/NewTrack';
import EditTrackScreen from '@src/screens/TrackList/EditTrack';
import EditMyAccountScreen from '@src/screens/MyAccount/EditMyAccount';
import PasswordResetScreen from '@src/screens/SignUp/PasswordReset';

// Components
import MainTabBar from '@src/components/organisms/MainTabBar';

const Stack = createStackNavigator();

const StackNavigator = () => {

  return (
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
  );
};

export default StackNavigator;
