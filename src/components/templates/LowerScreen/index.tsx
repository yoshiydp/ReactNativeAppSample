import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

// Components
import LowerTitleHeader from "components/molecules/LowerTitleHeader";
import CreateForm from "components/templates/CreateForm";
import AuthForm from "components/templates/AuthForm";

// Interfaces
import { FormControlsType } from "interfaces/formControlsInterface";
import { ControlButtonsType } from "interfaces/controlButtonInterface";

// Constants
import * as TEXT from "constants/text";

// Styles
import styles from "./LowerScreen.scss";

interface Props {
  navigation: any;
  title: string;
  formControlItems?: Array<FormControlsType> | any;
  controlButtonItems?: Array<ControlButtonsType> | any;
  buttonText: string;
  onPressSubmitEvent: () => void;
}

const LowerScreen = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <LowerTitleHeader title={props.title} navigation={props.navigation} />
      <ScrollView>
        {props.title === TEXT.TITLE_NEW_PROJECT ? (
          <CreateForm
            formControlItems={props.formControlItems}
            controlButtonItems={props.controlButtonItems}
            buttonText={props.buttonText}
            submitEvent={props.onPressSubmitEvent}
          />
        ) : props.title === TEXT.TITLE_PASSWORD_RESET ? (
          <AuthForm
            formControlItems={props.formControlItems}
            buttonText={props.buttonText}
            submitEvent={props.onPressSubmitEvent}
          />
        ) : (
          ""
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LowerScreen;
