import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Styles
import styles from './Button.scss';

interface Props {
  text: string;
  onPressEvent?: () => void;
  disabled?: boolean;
}

const Button = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={ 1 }
      style={
        props.disabled
        ? styles.containerDisabled
        : styles.container
      }
      onPress={ props.onPressEvent }
      disabled={ props.disabled }>
      <Text style={ styles.text }>
        { props.text }
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
