import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

// Components
import LowerTitleHeader from 'components/molecules/LowerTitleHeader';
import CreateForm from 'components/templates/CreateForm';

// Interfaces
import { FormControlsType } from 'interfaces/formControlsInterface';

// Styles
import styles from './LowerScreen.scss';

interface Props {
  navigation: any;
  title: string;
  formControlItems: Array<FormControlsType>;
  buttonText: string;
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
        <CreateForm
          formControlItems={ props.formControlItems }
          buttonText={ props.buttonText }
          submitEvent={ props.onPressSubmitEvent }
        />
      </ScrollView>
    </View>
  );
};

export default LowerScreen;
