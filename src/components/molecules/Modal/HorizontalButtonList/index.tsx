import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// Constants
import * as TEXT from 'constants/text';

// Styles
import styles from './HorizontalButtonList.scss';

interface Props {
  message?: string;
}

const HorizontalButtonList = (props: Props) => {

  const onPressYes = () => {
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.border }></View>
      <View style={ styles.item }>
        <TouchableOpacity
          onPress={ onPressYes }>
          <Text style={ styles.buttonYes }>Yes</Text>
        </TouchableOpacity>
      </View>
      <View style={ styles.item }>
        <TouchableOpacity
          onPress={ onPressYes }>
          <Text style={ styles.buttonCancel }>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HorizontalButtonList;
