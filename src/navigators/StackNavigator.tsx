import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Main Screens
import LoadingScreen from '../screens/Loading';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';

// Lower Screens
import NewProjectScreen from '../screens/MyProjects/NewProject';
import NewTrackScreen from '../screens/TrackList/NewTrack';
import EditTrackScreen from '../screens/TrackList/EditTrack';
import EditMyAccountScreen from '../screens/MyAccount/EditMyAccount';
import PasswordResetScreen from '../screens/SignUp/PasswordReset';

// Components
import MainTabBar from '../components/organisms/MainTabBar';

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
