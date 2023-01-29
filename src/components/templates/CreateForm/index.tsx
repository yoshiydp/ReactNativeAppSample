import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';

// Components
import FormControls from 'components/organisms/FormControls';
import ButtonRound from 'components/atoms/ButtonRound';
import ButtonSquare from 'components/atoms/ButtonSquare';

// Interfaces
import { FormControlsType } from 'interfaces/formControlsInterface';

// Styles
import styles from './CreateForm.scss';

interface Props {
  formControlItems: Array<FormControlsType>;
  submitText: string;
  submitEvent?: () => void;
}

const CreateForm = (props: Props) => {
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
        <ButtonRound
          text={ props.submitText }
          onPressEvent={ props.submitEvent }
          disabled={ disabled }
        />
      </View>
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

export default CreateForm;
