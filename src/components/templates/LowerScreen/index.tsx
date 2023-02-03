import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

// Store
import { hideOverlay } from 'store/OverlaySlice';
import { hideMainTabMenu } from 'store/MainTabMenuSlice';

// Components
import LowerTitleHeader from 'components/molecules/LowerTitleHeader';
import CreateForm from 'components/templates/CreateForm';

// Interfaces
import { FormControlsType } from 'interfaces/formControlsInterface';
import { ControlButtonsType } from 'interfaces/controlButtonInterface';

// Styles
import styles from './LowerScreen.scss';

interface Props {
  navigation: any;
  title: string;
  formControlItems: Array<FormControlsType>;
  controlButtonItems: Array<ControlButtonsType>;
  buttonText: string;
  onPressSubmitEvent: () => void;
}

const LowerScreen = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideOverlay());
    dispatch(hideMainTabMenu());
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
          controlButtonItems={ props.controlButtonItems }
          buttonText={ props.buttonText }
          submitEvent={ props.onPressSubmitEvent }
        />
      </ScrollView>
    </View>
  );
};

export default LowerScreen;
