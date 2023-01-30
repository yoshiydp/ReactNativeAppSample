import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';

// Components
import FormControls from 'components/organisms/FormControls';
import ControlButtonList from 'components/molecules/ControlButtonList';
import ButtonSquare from 'components/atoms/ButtonSquare';

// Interfaces
import { FormControlsType } from 'interfaces/formControlsInterface';
import { ControlButtonsType } from 'interfaces/controlButtonInterface';

// Styles
import styles from './CreateForm.scss';

interface Props {
  formControlItems: Array<FormControlsType>;
  controlButtonItems: Array<ControlButtonsType>;
  buttonText: string;
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
      <View style={ styles.controlButtonWrap }>
        <ControlButtonList
          controlButtonItems={ props.controlButtonItems }
        />
      </View>
      <View style={ styles.submitButtonWrap }>
        <ButtonSquare
          text={ props.buttonText }
          onPressEvent={ props.submitEvent }
          disabled={ disabled }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateForm;
