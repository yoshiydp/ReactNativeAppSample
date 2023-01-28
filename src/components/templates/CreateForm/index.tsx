import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';

// Components
import TextField from 'src/components/molecules/TextField';
import ErrorText from 'src/components/atoms/ErrorText';
import Button from 'src/components/atoms/Button';

// Styles
import styles from './CreateForm.scss';

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

const CreateForm = (props: Props) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    props.inputFieldItems.map((item, index) => {
      (!item.value) ? setDisabled(true) : setDisabled(false);
    });
  }, [props.inputFieldItems, disabled]);

  return (
    <KeyboardAvoidingView style={ styles.container }>
      { props.inputFieldItems.map((item, index) => (
        <View style={ styles.inputFieldItem } key={ index }>
          <TextField
            label={ item.label }
            placeholder={ item.placeholder }
            onChangeText={ item.onChangeText }
            value={ item.value }
            secureText={ item.secureText }
            required={ item.required }
          />
          { item.errorText &&
            <ErrorText
              text={ item.errorText }
            />
          }
        </View>
      ))}
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

export default CreateForm;
