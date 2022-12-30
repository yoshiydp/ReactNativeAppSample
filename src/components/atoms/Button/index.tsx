import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Styles
import styles from './Button.scss';

interface Props {
  text: string;
  onPressEvent?: () => void;
}

const Button = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={ 1 }
      style={ styles.container }
      onPress={ props.onPressEvent }>
      <Text style={ styles.text }>
        { props.text }
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
