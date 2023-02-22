import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { firebaseAuth, db } from "src/config/firebase";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";

// Store
import { useSelector } from "store/index";
import { hideCenterModal } from "store/CenterModalSlice";
import { hideOverlay, activeHidden } from "store/OverlaySlice";
import { inactiveMyProjectsModalFlag } from "store/MyProjectsModalFlagSlice";

// Styles
import styles from "./HorizontalButtonList.scss";

const HorizontalButtonList = () => {
  const dispatch = useDispatch();
  const centerModalSubmitTextState = useSelector((state) => state.centerModal.submitButtonText);
  const myProjectsState = useSelector((state) => state.myProjectsDetail);
  const myProjectsModalFlag = useSelector((state) => state.myProjectsModalFlag.modalFlag);
  const trackListItems = useSelector((state) => state.trackListItems.trackListItems);

  const { uid }: any = firebaseAuth.currentUser;

  const onPressSubmit = async () => {
    try {
      if (!uid) return;
      const docRef = doc(db, "users", uid);

      // MyProjectsからのモーダル表示の処理
      if (myProjectsModalFlag) {
        // 対象のプロジェクトデータの削除
        await updateDoc(docRef, {
          myProjectsData: arrayRemove({ ...myProjectsState }),
        });

        // 削除するプロジェクトに紐づいているトラックデータのlinkedMyProjectsを更新
        trackListItems.filter(async (items: any, index: number) => {
          await items.linkedMyProjects.some(async (linkedMyProjects: any) => {
            if (linkedMyProjects.projectTitle === myProjectsState.projectTitle) {
              console.log(index);
              await updateDoc(docRef, {
                trackListData: arrayRemove({
                  trackDataPath: items.trackDataPath,
                  trackTitle: items.trackTitle,
                  artistName: items.artistName,
                  artWorkPath: items.artWorkPath,
                  linkedMyProjects: [{ projectTitle: myProjectsState.projectTitle }],
                }),
              });

              await updateDoc(docRef, {
                trackListData: arrayUnion({
                  trackDataPath: items.trackDataPath,
                  trackTitle: items.trackTitle,
                  artistName: items.artistName,
                  artWorkPath: items.artWorkPath,
                  linkedMyProjects: [{ projectTitle: "" }],
                }),
              });
            }
          });
        });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(hideOverlay());
      dispatch(activeHidden());
      dispatch(hideCenterModal());
      dispatch(inactiveMyProjectsModalFlag());
      console.log("delete data");
    }
  };

  const onPressCancel = () => {
    dispatch(hideOverlay());
    dispatch(activeHidden());
    dispatch(hideCenterModal());
    dispatch(inactiveMyProjectsModalFlag());
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
