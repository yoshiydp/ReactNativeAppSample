import React, { useEffect, useState } from "react";
import { View } from "react-native";

// Components
import UserTextField from "components/molecules/UserTextField";
import ErrorText from "components/atoms/ErrorText";

// Interfaces
import { FormControlsType } from "interfaces/formControlsInterface";

// Styles
import styles from "./UserFormControls.scss";

interface Props {
  formControlItems: Array<FormControlsType>;
}

const UserFormControls = (props: Props) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    props.formControlItems.map((item, index) => {
      !item.value ? setDisabled(true) : setDisabled(false);
    });
  }, [props.formControlItems, disabled]);

  return (
    <>
      {props.formControlItems.map((item, index) => (
        <View style={styles.formControlItem} key={index}>
          <UserTextField
            label={item.label}
            placeholder={item.placeholder}
            onChangeText={item.onChangeText}
            value={item.value}
            secureText={item.secureText}
            required={item.required}
            notes={item.notes}
            editable={item.editable}
            selectTextOnFocus={item.selectTextOnFocus}
            errorText={item.errorText}
          />
          {item.errorText && <ErrorText text={item.errorText} />}
        </View>
      ))}
    </>
  );
};

export default UserFormControls;
