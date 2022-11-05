import 'react-native-gesture-handler';
import React, {type PropsWithChildren, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Screens
import LoadingScreen from './screens/Loading';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';

// Components
import MainTabBar from './components/organisms/MainTabBar';

const App = () => {

  useEffect(() => {
  }, []);

  return (
    <NavigationContainer>
      <MainTabBar />
      {/* <Stack.Navigator
        screenOptions={{ headerShown: false }}>
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
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default App;
