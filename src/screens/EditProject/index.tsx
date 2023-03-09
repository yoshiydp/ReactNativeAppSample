import React, { useEffect, useState } from "react";
import { Animated, View, ScrollView } from "react-native";
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";
import { showOverlay } from "store/OverlaySlice";

// Components
import TextEditor from "components/organisms/TextEditor";
import SeekBar from "components/organisms/SeekBar";
import CueButtons from "components/organisms/EditProject/CueButtons";
import CenterModal from "components/organisms/CenterModal";
import EditProjectHeader from "components/molecules/EditProjectHeader";
import Overlay from "components/atoms/Overlay";

// Styles
import styles from "./EditProject.scss";

interface Props {
  navigation: any;
}

const EditProject = (props: Props) => {
  const dispatch = useDispatch();
  const overlay = useSelector((state) => state.overlay.overlay);
  const centerModal = useSelector((state) => state.centerModal.centerModal);

  const onPressGoBackHome = () => {
    console.log("onPressGoBackHome!");
    dispatch(showOverlay());
    // props.navigation.goBack();
  };

  const onPressOpenMenu = () => {
    console.log("onPressOpenMenu!");
  };

  return (
    <View style={styles["container"]}>
      <View>
        <EditProjectHeader
          onPressHomeButton={onPressGoBackHome}
          onPressMenuButton={onPressOpenMenu}
        />
        <TextEditor projectTitle="Project Title" />
        {/* <SeekBar /> */}
        <CueButtons />
      </View>
      <Overlay isShow={overlay} />
      {/* <CenterModal isShow={centerModal} /> */}
    </View>
  );
};

export default EditProject;
