import React, { useEffect, useState } from "react";
import { Animated, View, ScrollView } from "react-native";
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
import { showOverlay, inactiveHidden } from "store/OverlaySlice";
import { showModalProjectSettings } from "store/ModalProjectSettingsSlice";
import { activeEditProjectModalFlag } from "store/EditProjectModalFlagSlice";

// Components
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
}

const EditProject = (props: Props) => {
  const dispatch = useDispatch();
  const overlay = useSelector((state) => state.overlay.overlay);
  const activeHiddenState = useSelector((state) => state.overlay.inactiveHidden);
  const centerModal = useSelector((state) => state.centerModal.centerModal);

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

  return (
    <View style={styles["container"]}>
      <View>
        <EditProjectHeader
          onPressHomeButton={onPressGoBackHome}
          onPressMenuButton={onPressOpenMenu}
        />
        <TextEditor projectTitle="Project Title" />
        <TimeSeekBar />
        <View style={styles["cue-buttons-wrap"]}>
          <CueButtons />
        </View>
        <View style={styles["cue-control-player-wrap"]}>
          <CueControlPlayer />
        </View>
        <VolumeSeekBar />
      </View>
      <Overlay isShow={overlay} />
      <ModalProjectSettings />
      <CenterModal isShow={centerModal} navigation={props.navigation} />
    </View>
  );
};

export default EditProject;
