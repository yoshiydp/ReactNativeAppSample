import 'react-native-gesture-handler';
import React, {type PropsWithChildren, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigators/StackNavigator';

const App = () => {

  useEffect(() => {
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
