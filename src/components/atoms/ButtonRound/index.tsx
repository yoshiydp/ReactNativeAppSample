import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Interfaces
import { ButtonType } from 'interfaces/buttonInterface';

// Styles
import styles from './ButtonRound.scss';

const ButtonRound = (props: ButtonType) => {
  return (
    <TouchableOpacity
      activeOpacity={ 1 }
      style={
        props.disabled
        ? styles.containerDisabled
        : styles.containerGreen
      }
      onPress={ props.onPressEvent }
      disabled={ props.disabled }>
      <Text style={ styles.textGreen }>
        { props.text }
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonRound;
