import React, { useState } from "react";
import { Modal, ScrollView, View, Text, KeyboardAvoidingView } from "react-native";
import { useDispatch } from "react-redux";
import TrackPlayer, { useTrackPlayerEvents, Event } from "react-native-track-player";

// Store
import { useSelector } from "store/index";
import { hideModalProjectSettings } from "store/ModalProjectSettingsSlice";
import { hideOverlay, activeHidden } from "store/OverlaySlice";

// Components
import ModalTitleHeader from "components/organisms/Modal/ModalTitleHeader";
import SettingsFormControls from "components/organisms/SettingsFormControls";
import ControlSetArtwork from "components/molecules/ControlSetArtwork";
import ControlButtonList from "components/molecules/ControlButtonList";
import ButtonSquare from "components/atoms/ButtonSquare";
import LoadingFullScreen from "components/molecules/Loading/LoadingFullScreen";

// Interfaces
import { SettingsFormControlsType } from "interfaces/formControlsInterface";
import { ControlButtonsType } from "interfaces/controlButtonInterface";

// Styles
import styles from "./ModalProjectSettings.scss";

interface Props {
  modalTitle: string;
  modalDescription: string;
  formControlItems: SettingsFormControlsType[];
  controlButtonItems: ControlButtonsType[];
  buttonText: string;
  submitEvent?: () => void;
}

const ModalProjectSettings = (props: Props) => {
  const dispatch = useDispatch();
  const artWork = useSelector((state) => state.newProject.artWork);
  const modalProjectSettings = useSelector(
    (state) => state.modalProjectSettings.modalProjectSettings
  );
  const modalProjectSettingsProjectTitle = useSelector(
    (state) => state.modalProjectSettings.modalProjectSettingsProjectTitle
  );
  const trackDataFile = useSelector((state) => state.newProject.trackDataFile);
  const trackListDetailTitle = useSelector((state) => state.trackListDetail.trackTitle);
  const loadingFullScreen = useSelector((state) => state.loadingFullScreen.loadingFullScreen);
  const [targetWidth, setTargetWidth] = useState<number>(0);

  const getTargetWidth = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
  };

  const disabledFlag = () => {
    if (
      modalProjectSettingsProjectTitle.length &&
      (props.formControlItems[0].editable ||
        artWork.length ||
        trackDataFile.length ||
        trackListDetailTitle.length)
    ) {
      return false;
    } else {
      return true;
    }
  };

  const modalClose = () => {
    dispatch(hideModalProjectSettings());
    dispatch(hideOverlay());
    dispatch(activeHidden());
  };

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
            {props.formControlItems[1].trackEditable && (
              <View style={styles.control_button_wrap}>
                <ControlButtonList controlButtonItems={props.controlButtonItems} />
              </View>
            )}
            <View style={styles.submit_button_wrap}>
              <ButtonSquare
                text={props.buttonText}
                onPressEvent={props.submitEvent}
                disabled={disabledFlag()}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View
          style={[styles.swipe_border, { transform: [{ translateX: -(targetWidth / 2) }] }]}
          onLayout={getTargetWidth}
        ></View>
      </View>
      <LoadingFullScreen isShow={loadingFullScreen} />
    </Modal>
  );
};

export default ModalProjectSettings;
