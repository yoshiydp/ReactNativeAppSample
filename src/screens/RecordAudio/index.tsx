import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// Components
import HeaderTitle from '../../components/organisms/HeaderTitle';

// Constants
import * as TEXT from '../../constants/text';

// Styles
import styles from './RecordAudio.scss';

const RecordAudio = () => {

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <HeaderTitle
        title={TEXT.TITLE_RECORD_AUDIO}
      />
    </View>
  );
};

export default RecordAudio;
