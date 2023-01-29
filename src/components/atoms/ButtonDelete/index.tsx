import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

// Interfaces
import { ButtonType } from 'interfaces/buttonInterface';

// Styles
import styles from './ButtonDelete.scss';

const ButtonDelete = (props: ButtonType) => {
  return (
    <TouchableOpacity
      activeOpacity={ 1 }
      style={ styles.container }
      onPress={ props.onPressEvent }>
      <View style={ styles.minus }></View>
    </TouchableOpacity>
  );
};

export default ButtonDelete;
