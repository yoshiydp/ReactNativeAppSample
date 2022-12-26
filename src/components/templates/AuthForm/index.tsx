import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';

// Components
import TextField from 'src/components/molecules/TextField';
import Button from 'src/components/atoms/Button';

// Styles
import styles from './AuthForm.scss';

interface InputField {
  label: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  value: string;
  secureText?: boolean;
}

interface Props {
  inputFieldItems: Array<InputField>;
  submitText: string;
  submitEvent?: () => void;
}

const AuthForm = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <KeyboardAvoidingView style={ styles.container }>
      { props.inputFieldItems.map((item, index) => (
        <View style={ styles.inputFieldItem } key={ index }>
          <TextField
            label={item.label}
            placeholder={ item.placeholder }
            onChangeText={ item.onChangeText }
            value={ item.value }
            secureText={ item.secureText }
          />
        </View>
      ))}
      <View style={ styles.buttonWrap }>
        <Button
          text={ props.submitText }
          onPressEvent={ props.submitEvent }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;
