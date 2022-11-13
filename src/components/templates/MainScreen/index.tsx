import React, { useEffect, useState } from 'react';
import { View, Button, ScrollView, Modal, Text, Pressable, Alert } from 'react-native';
// import { Overlay } from '@rneui/themed';

// Components
import HeaderTitle from '../../organisms/HeaderTitle';

// Styles
import styles from './MainScreen.scss';

interface Props {
  navigation: any;
  title: string;
}

const MainScreen = (props: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={ styles.container }>
      <HeaderTitle
        title={ props.title }
      />
      <ScrollView>
        <Button title="NewProject" onPress={() => props.navigation.navigate('NewProject')} />
        <Button title="EditProject" onPress={() => props.navigation.navigate('EditProject')} />
        <Button title="Recording" onPress={() => props.navigation.navigate('Recording')} />
        <Button title="NewTrack" onPress={() => props.navigation.navigate('NewTrack')} />
        <Button title="EditTrack" onPress={() => props.navigation.navigate('EditTrack')} />
        <Button title="EditMyAccount" onPress={() => props.navigation.navigate('EditMyAccount')} />
        <Button title="PasswordReset" onPress={() => props.navigation.navigate('PasswordReset')} />
        {/* <View style={styles.block }></View> */}
      </ScrollView>
      {/* <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        style={styles.overlay}>
        <Text style={styles.textPrimary}>Hello!</Text>
        <Text style={styles.textSecondary}>
          Welcome to React Native Elements
        </Text>
      </Overlay> */}
    </View>
  );
};

export default MainScreen;
