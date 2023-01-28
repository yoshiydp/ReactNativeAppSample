import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// Components
import TextField from 'src/components/molecules/TextField';
import ErrorText from 'src/components/atoms/ErrorText';

// Styles
import styles from './FormControls.scss';

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
}

const FormControls = (props: Props) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    props.inputFieldItems.map((item, index) => {
      (!item.value) ? setDisabled(true) : setDisabled(false);
    });
  }, [props.inputFieldItems, disabled]);

  return (
    <>
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
    </>
  );
};

export default FormControls;
