import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";
import { hideModalProjectSettings } from "store/ModalProjectSettingsSlice";

// Components
import ModalControlHeader from "components/organisms/Modal/ModalControlHeader";

// Styles
import styles from "./ModalProjectSettings.scss";

interface Props {
  navigation: any;
}

const ModalProjectSettings = (props: Props) => {
  const dispatch = useDispatch();
  const modalProjectSettings = useSelector(
    (state) => state.modalProjectSettings.modalProjectSettings,
  );
  const [targetWidth, setTargetWidth] = useState<number>(0);

  const getTargetWidth = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
  };

  const modalClose = () => {
    dispatch(hideModalProjectSettings());
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={modalProjectSettings}
      onRequestClose={modalClose}
    >
      <View style={styles.container}>
        <ScrollView></ScrollView>
        <View
          style={[styles["swipe-border"], { transform: [{ translateX: -(targetWidth / 2) }] }]}
          onLayout={getTargetWidth}
        ></View>
      </View>
    </Modal>
  );
};

export default ModalProjectSettings;
