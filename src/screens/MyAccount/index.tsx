import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

// Components
import HeaderTitle from '../../components/organisms/HeaderTitle';

// Constants
import * as TEXT from '../../constants/text';

// Styles
import styles from './MyAccount.scss';

const MyAccount = () => {

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <HeaderTitle
        title={TEXT.TITLE_MY_ACCOUNT}
      />
      <ScrollView>
        {/* <Button title="RecordAudio" onPress={() => props.navigation.navigate('RecordAudio')} /> */}
        {/* <View style={styles.block}></View> */}
      </ScrollView>
    </View>
  );
};

export default MyAccount;
