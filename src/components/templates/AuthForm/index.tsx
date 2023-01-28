import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';

// Components
import FormControls from 'src/components/organisms/FormControls';
import Button from 'src/components/atoms/Button';

// Styles
import styles from './AuthForm.scss';

interface InputField {
  label: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  value: string;
  secureText?: boolean;
  required?: boolean;
  errorText?: string;
}

interface Props {
  inputFieldItems: Array<InputField>;
  submitText: string;
  submitEvent?: () => void;
}

const AuthForm = (props: Props) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    props.inputFieldItems.map((item, index) => {
      (!item.value) ? setDisabled(true) : setDisabled(false);
    });
  }, [props.inputFieldItems, disabled]);

  return (
    <KeyboardAvoidingView style={ styles.container }>
      <FormControls
        inputFieldItems={ props.inputFieldItems }
      />
      <View style={ styles.submitButtonWrap }>
        <Button
          text={ props.submitText }
          onPressEvent={ props.submitEvent }
          disabled={ disabled }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;
