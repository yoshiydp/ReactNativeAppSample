import React, { useEffect, useRef, useState } from 'react';
import { View, Text} from 'react-native';

// Components
import SocialIcon from 'components/molecules/SocialIcon';

// Interfaces
import { svgType1, svgType2, svgType3, svgType4, svgType5 } from 'interfaces/svgInterface';

// Styles
import styles from './ProjectItems.scss';

interface OnPressEvent {
  onPressEvent?: () => void;
}

interface Props {
  title: string;
  socialIconItems: Array<svgType1 & svgType2 & svgType3 & svgType4 & svgType5 & OnPressEvent>;
}

const ProjectItems = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <View style={ styles.container }>
      
    </View>
  );
};

export default ProjectItems;
