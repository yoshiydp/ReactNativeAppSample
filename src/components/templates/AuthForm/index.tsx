import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';

// Components
import FormControls from 'components/organisms/FormControls';
import ButtonSquare from 'components/atoms/ButtonSquare';

// Interfaces
import { FormControlsType } from 'interfaces/formControlsInterface';

// Styles
import styles from './AuthForm.scss';

interface Props {
  formControlItems: Array<FormControlsType>;
  submitText: string;
  submitEvent?: () => void;
}

const AuthForm = (props: Props) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    props.formControlItems.map((item, index) => {
      (!item.value) ? setDisabled(true) : setDisabled(false);
    });
  }, [props.formControlItems, disabled]);

  return (
    <KeyboardAvoidingView style={ styles.container }>
      <FormControls
        formControlItems={ props.formControlItems }
      />
      <View style={ styles.submitButtonWrap }>
        <ButtonSquare
          text={ props.submitText }
          onPressEvent={ props.submitEvent }
          disabled={ disabled }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;
