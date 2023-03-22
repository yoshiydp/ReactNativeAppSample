import React, { useEffect, useState } from "react";

// Components
import LowerScreen from "components/templates/LowerScreen";

// Constants
import * as TEXT from "constants/text";

// Interfaces
import { FormControlsType } from "interfaces/formControlsInterface";

interface Props {
  navigation: any;
}

const PasswordReset = (props: Props) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorNewPassword, setErrorNewPassword] = useState<string>("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>("");

  const passwordReset = async () => {
    console.log("password reset!");
  };

  // テキストフォームリスト
  const formControlItems = [
    {
      label: TEXT.LABEL_INPUT_NEW_PASSWORD,
      placeholder: TEXT.PLACEHOLDER_INPUT_PASSWORD,
      onChangeText: setNewPassword,
      value: newPassword,
      secureText: true,
      required: true,
      errorText: errorNewPassword,
    },
    {
      label: TEXT.LABEL_INPUT_CONFIRM_PASSWORD,
      placeholder: TEXT.PLACEHOLDER_INPUT_PASSWORD,
      onChangeText: setConfirmPassword,
      value: confirmPassword,
      secureText: true,
      required: true,
      errorText: errorConfirmPassword,
    },
  ];

  return (
    <>
      <LowerScreen
        title={TEXT.TITLE_PASSWORD_RESET}
        navigation={props.navigation}
        formControlItems={formControlItems}
        buttonText={TEXT.BUTTON_NEW_PASSWORD_SAVE}
        onPressSubmitEvent={passwordReset}
      />
    </>
  );
};

export default PasswordReset;
