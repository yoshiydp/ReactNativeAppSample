import React, { useEffect, useRef, useState } from 'react';
import { View, Text} from 'react-native';

// Components
import SocialIcon from 'components/molecules/SocialIcon';

// Interfaces
import { svgType1, svgType2, svgType3, svgType4, svgType5 } from 'interfaces/svgInterface';

// Styles
import styles from './MyProjectsItem.scss';

const MyProjectsItem = () => {

  useEffect(() => {
  }, []);

  return (
    <View style={ styles.container }>
      <View style={ styles.artwork }></View>
      <View style={ styles.textWrap }>
        <Text style={ styles.title }>Project Title</Text>
        <Text style={ styles.text }>リリックが表示されます。リリックが表示されます…</Text>
        <Text style={ styles.text }>Track Title / Artist Name</Text>
      </View>
    </View>
  );
};

export default MyProjectsItem;
