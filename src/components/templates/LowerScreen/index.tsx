import React, { useEffect, useState } from 'react';
import { View, ScrollView, Button } from 'react-native';

// Components
import LowerTitleHeader from 'components/molecules/LowerTitleHeader';

// Styles
import styles from './LowerScreen.scss';

interface Props {
  navigation: any;
  title: string;
}

const LowerScreen = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <View style={ styles.container }>
      <LowerTitleHeader
        title={ props.title }
        navigation={ props.navigation }
      />
      <ScrollView>
      </ScrollView>
    </View>
  );
};

export default LowerScreen;
