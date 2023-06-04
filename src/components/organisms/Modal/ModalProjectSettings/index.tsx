import React, { useState, useEffect } from "react";
import { Modal, ScrollView, View, Text, KeyboardAvoidingView } from "react-native";
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";
import { hideModalProjectSettings } from "store/ModalProjectSettingsSlice";
import { setProjectSettingsTitle } from "store/ProjectSettingsSlice";

// Components
import ModalTitleHeader from "components/organisms/Modal/ModalTitleHeader";
import SettingsFormControls from "components/organisms/SettingsFormControls";
import ControlSetArtwork from "components/molecules/ControlSetArtwork";
import ControlButtonList from "components/molecules/ControlButtonList";
import ButtonSquare from "components/atoms/ButtonSquare";

// Interfaces
import { FormControlsType } from "interfaces/formControlsInterface";
import { ControlButtonsType } from "interfaces/controlButtonInterface";

// Styles
import styles from "./ModalProjectSettings.scss";

interface Props {
  modalTitle: string;
  modalDescription: string;
  formControlItems: Array<FormControlsType>;
  controlButtonItems: Array<ControlButtonsType>;
  buttonText: string;
  submitEvent?: () => void;
}

const ModalProjectSettings = (props: Props) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState<boolean>(false);
  const modalProjectSettings = useSelector(
    (state) => state.modalProjectSettings.modalProjectSettings
  );
  const myProjectsDetail = useSelector((state) => state.myProjectsDetail);
  const [targetWidth, setTargetWidth] = useState<number>(0);

  const getTargetWidth = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
  };

  const modalClose = () => {
    dispatch(hideModalProjectSettings());
  };

  useEffect(() => {
    props.formControlItems.map((item, index) => {
      !item.value ? setDisabled(true) : setDisabled(false);
    });
  }, [props.formControlItems, disabled]);

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={modalProjectSettings}
      onRequestClose={modalClose}
    >
      <View style={styles.container}>
        <ModalTitleHeader title={props.modalTitle} onPressClose={modalClose} />
        <ScrollView style={styles.container_scroll_view}>
          <Text style={styles.description}>{props.modalDescription}</Text>
          <KeyboardAvoidingView style={styles.container_settings_form}>
            <ControlSetArtwork />
            <SettingsFormControls formControlItems={props.formControlItems} />
            <View style={styles.control_button_wrap}>
              <ControlButtonList controlButtonItems={props.controlButtonItems} />
            </View>
            <View style={styles.submit_button_wrap}>
              <ButtonSquare
                text={props.buttonText}
                onPressEvent={props.submitEvent}
                disabled={disabled}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View
          style={[styles.swipe_border, { transform: [{ translateX: -(targetWidth / 2) }] }]}
          onLayout={getTargetWidth}
        ></View>
      </View>
    </Modal>
  );
};

export default ModalProjectSettings;
