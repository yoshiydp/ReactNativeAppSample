import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../config/firebase";

// Main Screens
import LoadingScreen from 'screens/Loading';
import LoginScreen from 'screens/Login';
import SignUpScreen from 'screens/SignUp';

// Lower Screens
import NewProjectScreen from 'screens/MyProjects/NewProject';
import EditProjectScreen from 'screens/MyProjects/EditProject';
import RecordingScreen from 'screens/MyProjects/Recording';
import NewTrackScreen from 'screens/TrackList/NewTrack';
import EditTrackScreen from 'screens/TrackList/EditTrack';
import EditMyAccountScreen from 'screens/MyAccount/EditMyAccount';
import PasswordResetScreen from 'screens/SignUp/PasswordReset';

// Components
import MainTabBar from 'components/organisms/MainTabBar';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [user, setUser] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser('');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ?
        <Stack.Screen
          name="MainTabBar"
          component={ MainTabBar }
        />
        :
        <>
          <Stack.Screen
            name="Login"
            component={ LoginScreen }
          />
          <Stack.Screen
            name="SignUp"
            component={ SignUpScreen }
          />
        </>
      }
      <Stack.Screen
        name="Loading"
        component={ LoadingScreen }
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
