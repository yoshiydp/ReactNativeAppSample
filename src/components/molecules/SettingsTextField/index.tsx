import React from "react";
import { View, Pressable, Text, TextInput } from "react-native";
import { useDispatch } from "react-redux";

// Store
import { setModalProjectSettingsTitle } from "store/ModalProjectSettingsSlice";

// Styles
import styles from "./SettingsTextField.scss";

// Interfaces
import { SettingsTextFieldType } from "interfaces/formControlsInterface";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";

// Components
import Icon from "components/atoms/Icon";

type Props = SettingsTextFieldType;

const SettingsTextField = (props: Props) => {
  const dispatch = useDispatch();

  const onChangeText = (event: any) => {
    if (props.onChangeText) {
      props.onChangeText(event);
      dispatch(setModalProjectSettingsTitle(event));
      console.log(event);
    }
  };

  return (
    <View style={props.errorText ? styles["container--error"] : styles.container}>
      <View style={styles.label_wrap}>
        <Text style={styles.label}>{props.label}</Text>
        {props.required && <Text style={styles.required}>*</Text>}
        {props.notes && <Text style={styles.notes}>{props.notes}</Text>}
      </View>
      <TextInput
        style={props.editable || props.trackEditable ? styles.input : styles["input--disabled"]}
        placeholder={props.placeholder}
        placeholderTextColor={COLOR.COLOR_GRAY_TYPE3}
        onChangeText={onChangeText}
        value={props.value}
        secureTextEntry={props.secureText}
        autoCapitalize="none"
        editable={props.editable}
        selectTextOnFocus={props.selectTextOnFocus}
      />
      {!(props.editable || props.trackEditable) && (
        <Pressable onPress={props.onPressEditable} style={styles.button_edit}>
          <Icon
            svgType={9}
            width="16"
            height="16.63"
            viewBox="0 0 16 16.63"
            parentGTransform="translate(-6.014 -6.031)"
            childGTransform1="translate(6.966 6.771)"
            childGTransform2="translate(6.015 16.772)"
            childGTransform3="translate(10.449 10.391)"
            childGTransform4="translate(6.014 20.392)"
            childGTransform5="translate(14.847 8.581)"
            childGTransform6="translate(16.588 6.031)"
            pathD1={SVGPATH.ICON_PENCIL_PATH1}
            pathD2={SVGPATH.ICON_PENCIL_PATH2}
            pathD3={SVGPATH.ICON_PENCIL_PATH3}
            pathD4={SVGPATH.ICON_PENCIL_PATH4}
            pathD5={SVGPATH.ICON_PENCIL_PATH5}
            pathD6={SVGPATH.ICON_PENCIL_PATH6}
            pathTransform1="translate(-9.105 -8.343)"
            pathTransform2="translate(-6.015 -39.597)"
            pathTransform3="translate(-20.418 -19.657)"
            pathTransform4="translate(-6.014 -50.91)"
            pathTransform5="translate(-34.702 -14)"
            pathTransform6="translate(-40.357 -6.031)"
            pathFill={COLOR.COLOR_BLUE_NAVY}
          />
        </Pressable>
      )}
      {!(props.editable || props.trackEditable) && <View style={styles.uneditable_cover}></View>}
    </View>
  );
};

export default SettingsTextField;
