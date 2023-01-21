import React, { useEffect, useRef, useState } from 'react';
import { View, Text} from 'react-native';

// Components
import SocialIcon from 'components/molecules/SocialIcon';

// Interfaces
import { svgType1, svgType2, svgType3, svgType4, svgType5 } from 'interfaces/svgInterface';

// Styles
import styles from './MyProjectsItem.scss';

interface Props {
  projectTitle: string;
  lyric: string;
  trackTitle: string;
  artistName: string;
  artWork: string;
}

const MyProjectsItem = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <View style={ styles.container }>
      <View style={ styles.artwork }></View>
      <View style={ styles.textWrap }>
        <Text style={ styles.title }>
          { props.projectTitle }
        </Text>
        <Text style={ styles.text }>
          { props.lyric }
        </Text>
        <Text style={ styles.text }>
          { props.trackTitle } / { props.artistName }
        </Text>
      </View>
    </View>
  );
};

export default MyProjectsItem;
