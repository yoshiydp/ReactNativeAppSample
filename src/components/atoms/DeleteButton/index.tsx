import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

// Styles
import styles from './DeleteButton.scss';

interface Props {
  onPressEvent?: () => void;
}

const DeleteButton = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={ 1 }
      style={ styles.container }
      onPress={ props.onPressEvent }>
      <View style={ styles.minus }></View>
    </TouchableOpacity>
  );
};

export default DeleteButton;
