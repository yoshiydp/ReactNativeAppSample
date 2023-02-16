import React, { useEffect } from "react";
import { Modal, Text, Pressable, View } from "react-native";
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";
import { hideModalPageSheet } from "store/ModalPageSheetSlice";

// Styles
import styles from "./ModalPageSheet.scss";

const ModalPageSheet = () => {
  const dispatch = useDispatch();
  const modalPageSheet = useSelector((state) => state.modalPageSheet.modalPageSheet);

  useEffect(() => {
    console.log("modalPageSheet: " + modalPageSheet);
  }, [modalPageSheet]);

  const onPressClose = () => {
    dispatch(hideModalPageSheet());
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={modalPageSheet}
      onRequestClose={onPressClose}
    >
      <View style={styles.container}>
        <View>
          <Text>Hello World!</Text>
          <Pressable onPress={onPressClose}>
            <Text>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPageSheet;
