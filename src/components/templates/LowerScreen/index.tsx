import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

// Components
import LowerTitleHeader from 'components/molecules/LowerTitleHeader';
import AuthForm from 'src/components/templates/AuthForm';
import CreateForm from 'src/components/templates/CreateForm';

// Constants
import * as TEXT from 'constants/text';

// Styles
import styles from './LowerScreen.scss';

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
  navigation: any;
  title: string;
  inputFieldItems: Array<InputField>;
  submitText: string;
  onPressSubmitEvent: () => void;
}

const LowerScreen = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <View style={ styles.container }>
      <LowerTitleHeader
        title={ props.title }
        navigation={ props.navigation }
      />
      <ScrollView>
        <AuthForm
          inputFieldItems={ props.inputFieldItems }
          submitText={ TEXT.BUTTON_SIGN_UP }
          submitEvent={ props.onPressSubmitEvent }
        />
      </ScrollView>
    </View>
  );
};

export default LowerScreen;
