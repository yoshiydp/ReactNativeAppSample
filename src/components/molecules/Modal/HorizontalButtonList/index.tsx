import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { firebaseAuth, db } from "src/config/firebase";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

// Store
import { useSelector } from "store/index";
import { hideCenterModal } from "store/CenterModalSlice";
import { hideOverlay, activeHidden } from "store/OverlaySlice";

// Styles
import styles from "./HorizontalButtonList.scss";

const HorizontalButtonList = () => {
  const dispatch = useDispatch();
  const centerModalSubmitTextState = useSelector((state) => state.centerModal.submitButtonText);
  const myProjectsState = useSelector((state) => state.myProjectsDetail);

  const onPressSubmit = async () => {
    try {
      const { uid }: any = firebaseAuth.currentUser;
      if (!uid) return;
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, {
        myProjectsData: arrayRemove({ ...myProjectsState }),
      }).then(() => {
        dispatch(hideOverlay());
        dispatch(activeHidden());
        dispatch(hideCenterModal());
        console.log("delete data");
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const onPressCancel = () => {
    dispatch(hideOverlay());
    dispatch(activeHidden());
    dispatch(hideCenterModal());
  };

  return (
    <View style={styles.container}>
      <View style={styles.border}></View>
      <View style={styles.item}>
        <TouchableOpacity onPress={onPressSubmit}>
          <Text style={styles.buttonYes}>{centerModalSubmitTextState}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity onPress={onPressCancel}>
          <Text style={styles.buttonCancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HorizontalButtonList;
