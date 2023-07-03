import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";

// Styles
import styles from "./UserTextField.scss";

// Interfaces
import { TextFieldType } from "interfaces/formControlsInterface";

// Constants
import * as COLOR from "constants/color";

interface Props extends TextFieldType {
  errorText?: string;
}

const UserTextField = (props: Props) => {
  const [value, valueHandler] = useState(props.value ? props.value : "");

  useEffect(() => {
    valueHandler(props.value ? props.value : "");
  }, [props.value]);

  const onChangeText = (event: any) => {
    valueHandler(event);

    if (props.onChangeText) {
      props.onChangeText(event);
      console.log(event);
    }
  };

  return (
    <View style={props.errorText ? styles.containerError : styles.container}>
      <View style={styles.labelWrap}>
        <Text style={styles.label}>{props.label}</Text>
        {props.required && <Text style={styles.required}>*</Text>}
        {props.notes && <Text style={styles.notes}>{props.notes}</Text>}
      </View>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor={COLOR.COLOR_BLUE_NAVY}
        onChangeText={onChangeText}
        value={props.value}
        secureTextEntry={props.secureText}
        autoCapitalize="none"
        editable={props.editable}
        selectTextOnFocus={props.selectTextOnFocus}
      />
    </View>
  );
};

export default UserTextField;
