import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';

// Styles
import styles from './TextField.scss';

// Constants
import * as COLOR from 'constants/color';

interface Props {
  label?: string;
  placeholder: string;
  onChangeText?: (value: string) => void;
  value: string;
  secureText?: boolean;
  required?: boolean;
}

const TextField = (props: Props) => {
  const [value, valueHandler] = useState(props.value ? props.value : '');

  useEffect(() => {
    valueHandler(props.value ? props.value : '');
  }, [props.value]);

  const onChangeText = (event: any) => {
    valueHandler(event);

    if (props.onChangeText) {
      props.onChangeText(event);
      console.log(event);
    }
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.labelWrap }>
        <Text style={ styles.label }>
          { props.label }
        </Text>
        { props.required &&
          <Text style={ styles.required }>*</Text>
        }
      </View>
      <TextInput
        style={ styles.input }
        placeholder={ props.placeholder }
        placeholderTextColor={ COLOR.COLOR_BLUE_NAVY }
        onChangeText={ onChangeText }
        value={ props.value }
        secureTextEntry={ props.secureText }
        autoCapitalize="none"
      />
    </View>
  );
};

export default TextField;
