import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

// Components
import HeaderTitle from '../../components/organisms/HeaderTitle';
import MainTabBar from '../../components/organisms/MainTabBar';

// Constants
import * as TEXT from '../../constants/text';

// Styles
import styles from './TrackList.scss';

interface Props {
  navigation: any;
}

const TrackList = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderTitle
          title={TEXT.TITLE_TRACK_LIST}
        />
        {/* <View style={styles.block}></View> */}
      </ScrollView>
      <MainTabBar />
    </View>
  );
};

export default TrackList;
