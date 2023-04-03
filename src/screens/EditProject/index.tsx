import React, { useEffect, useState } from "react";
import { Animated, View, ScrollView, Text } from "react-native";
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";
import {
  showCenterModal,
  setCenterModalTitle,
  setCenterModalDataTitle,
  setCenterModalNotes,
  setCenterModalSubmitButtonText,
} from "store/CenterModalSlice";
import { showOverlay, hideOverlay, activeHidden, inactiveHidden } from "store/OverlaySlice";
import { showModalProjectSettings } from "store/ModalProjectSettingsSlice";
import { activeEditProjectModalFlag } from "store/EditProjectModalFlagSlice";
import {
  showEditCueNameTextField,
  hideEditCueNameTextField,
  setCueName,
} from "store/EditCueNameTextFieldSlice";

// Components
import EditCueNameTextField from "components/molecules/EditCueNameTextField";
import TextEditor from "components/organisms/TextEditor";
import TimeSeekBar from "components/organisms/TimeSeekBar";
import CueButtons from "components/organisms/EditProject/CueButtons";
import CueControlPlayer from "components/organisms/EditProject/CueControlPlayer";
import VolumeSeekBar from "components/organisms/EditProject/VolumeSeekBar";
import CenterModal from "components/organisms/CenterModal";
import ModalProjectSettings from "components/organisms/Modal/ModalProjectSettings";
import EditProjectHeader from "components/molecules/EditProjectHeader";
import Overlay from "components/atoms/Overlay";

// Constants
import * as TEXT from "constants/text";

// Styles
import styles from "./EditProject.scss";

interface Props {
  navigation: any;
  route: any;
}

const EditProject = (props: Props) => {
  const dispatch = useDispatch();
  const overlay = useSelector((state) => state.overlay.overlay);
  const activeHiddenState = useSelector((state) => state.overlay.inactiveHidden);
  const editCueNameTextField = useSelector(
    (state) => state.editCueNameTextField.editCueNameTextField,
  );
  const centerModal = useSelector((state) => state.centerModal.centerModal);
  const { projectTitle, lyric, trackDataPath, trackTitle, artistName, artWorkPath } =
    props.route.params;

  const onPressGoBackHome = () => {
    console.log("onPressGoBackHome!");
    dispatch(showOverlay());
    dispatch(inactiveHidden());
    dispatch(showCenterModal());
    dispatch(setCenterModalTitle(TEXT.MODAL_TITLE_SAVE_PROJECT));
    dispatch(activeEditProjectModalFlag());
  };

  const onPressOpenMenu = () => {
    console.log("onPressOpenMenu!");
    dispatch(showModalProjectSettings());
  };

  const editCueName = (flag: boolean, name: string) => {
    dispatch(showOverlay());
    dispatch(inactiveHidden());
    dispatch(showEditCueNameTextField());
    console.log(flag, name);

    // flagとnameがない場合はreturn
    if (!(flag && name)) return;

    if (flag) dispatch(setCueName(name));
  };

  const saveCueName = () => {
    dispatch(hideOverlay());
    dispatch(activeHidden());
    dispatch(setCueName(""));
    dispatch(hideEditCueNameTextField());
  };

  return (
    <View style={styles["container"]}>
      <View>
        <EditProjectHeader
          onPressHomeButton={onPressGoBackHome}
          onPressMenuButton={onPressOpenMenu}
        />
        <Text>{trackDataPath}</Text>
        <Text>{trackTitle}</Text>
        <Text>{artistName}</Text>
        <Text>{artWorkPath}</Text>
        <TextEditor projectTitle={projectTitle} lyric={lyric} />
        <TimeSeekBar />
        <View style={styles["cue-buttons-wrap"]}>
          <CueButtons onLongPressEvent={editCueName} />
        </View>
        <View style={styles["cue-control-player-wrap"]}>
          <CueControlPlayer />
        </View>
        <VolumeSeekBar />
      </View>
      <Overlay isShow={overlay} />
      <EditCueNameTextField isShow={editCueNameTextField} onPressSave={saveCueName} />
      <ModalProjectSettings />
      <CenterModal isShow={centerModal} navigation={props.navigation} />
    </View>
  );
};

export default EditProject;
