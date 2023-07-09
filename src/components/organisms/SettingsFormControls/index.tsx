import React, { useEffect, useState } from "react";
import { View } from "react-native";

// Components
import SettingsTextField from "components/molecules/SettingsTextField";
import ErrorText from "components/atoms/ErrorText";

// Interfaces
import { SettingsFormControlsType } from "interfaces/formControlsInterface";

// Styles
import styles from "./SettingsFormControls.scss";

interface Props {
  formControlItems: SettingsFormControlsType[];
}

const SettingsFormControls = (props: Props) => {
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
          <SettingsTextField
            label={item.label}
            placeholder={item.placeholder}
            onChangeText={item.onChangeText}
            value={item.value}
            secureText={item.secureText}
            required={item.required}
            notes={item.notes}
            editable={item.editable}
            onPressEditable={item.onPressEditable}
            selectTextOnFocus={item.selectTextOnFocus}
            trackEditable={item.trackEditable}
            errorText={item.errorText}
          />
          {item.errorText && <ErrorText text={item.errorText} />}
        </View>
      ))}
    </>
  );
};

export default SettingsFormControls;
