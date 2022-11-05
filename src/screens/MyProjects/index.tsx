import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

// Components
import HeaderTitle from '../../components/organisms/HeaderTitle';

// Constants
import * as TEXT from '../../constants/text';

// Styles
import styles from './MyProjects.scss';

interface Props {
  navigation: any;
}

const MyProjects = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <HeaderTitle
        title={TEXT.TITLE_MY_PROJECTS}
      />
      <ScrollView>
        {/* <Button title="RecordAudio" onPress={() => props.navigation.navigate('RecordAudio')} /> */}
        <View style={styles.block}></View>
      </ScrollView>
    </View>
  );
};

export default MyProjects;
