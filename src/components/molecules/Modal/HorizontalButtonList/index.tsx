import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { firebaseAuth, db, storage } from "src/config/firebase";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

// Store
import { useSelector } from "store/index";
import { hideCenterModal } from "store/CenterModalSlice";
import { hideOverlay, activeHidden } from "store/OverlaySlice";
import { inactiveMyProjectsModalFlag } from "store/MyProjectsModalFlagSlice";
import { inactiveTrackListModalFlag } from "store/TrackListModalFlagSlice";

// Styles
import styles from "./HorizontalButtonList.scss";

const HorizontalButtonList = () => {
  const dispatch = useDispatch();
  const centerModalSubmitTextState = useSelector((state) => state.centerModal.submitButtonText);
  const myProjectsItems = useSelector((state) => state.myProjectsItems.myProjectsItems);
  const myProjectsDetail = useSelector((state) => state.myProjectsDetail);
  const myProjectsModalFlag = useSelector((state) => state.myProjectsModalFlag.modalFlag);
  const trackListModalFlag = useSelector((state) => state.trackListModalFlag.modalFlag);
  const trackListItems = useSelector((state) => state.trackListItems.trackListItems);
  const trackListDetail = useSelector((state) => state.trackListDetail);

  const { uid }: any = firebaseAuth.currentUser;

  const onPressSubmit = async () => {
    try {
      if (!uid) return;
      const docRef = doc(db, "users", uid);

      // MyProjectsからのモーダル表示の処理
      if (myProjectsModalFlag) {
        // 対象のプロジェクトデータの削除
        await updateDoc(docRef, {
          myProjectsData: arrayRemove({ ...myProjectsDetail }),
        });

        // 削除するプロジェクトに紐づいているトラックデータのlinkedMyProjectsを更新
        trackListItems.filter(async (items: any, index: number) => {
          await items.linkedMyProjects.some(async (linkedMyProjects: any) => {
            if (linkedMyProjects.projectTitle === myProjectsDetail.projectTitle) {
              await updateDoc(docRef, {
                trackListData: arrayRemove({
                  trackDataPath: items.trackDataPath,
                  trackTitle: items.trackTitle,
                  artistName: items.artistName,
                  artWorkPath: items.artWorkPath,
                  linkedMyProjects: [{ projectTitle: myProjectsDetail.projectTitle }],
                }),
              });

              await updateDoc(docRef, {
                trackListData: arrayUnion({
                  trackDataPath: items.trackDataPath,
                  trackTitle: items.trackTitle,
                  artistName: items.artistName,
                  artWorkPath: items.artWorkPath,
                  linkedMyProjects: [],
                }),
              });
            }
          });
        });
      }

      // TrackListからのモーダル表示の処理
      if (trackListModalFlag) {
        const trackDataRef = ref(storage, uid + "/track_data_files/" + trackListDetail.trackTitle);
        // 対象のトラックデータを削除
        await deleteObject(trackDataRef);

        // 対象のTrackListItemの削除
        await updateDoc(docRef, {
          trackListData: arrayRemove({ ...trackListDetail }),
        });

        // 削除するトラックデータに紐づいているプロジェクトデータを更新
        myProjectsItems.filter(async (items: any, index: number) => {
          // console.log(items);
          await items.trackTitle.some(async (item: string) => {
            console.log(item);
            // if (linkedMyProjects.projectTitle === myProjectsDetail.projectTitle) {
            //   await updateDoc(docRef, {
            //     trackListData: arrayRemove({
            //       trackDataPath: items.trackDataPath,
            //       trackTitle: items.trackTitle,
            //       artistName: items.artistName,
            //       artWorkPath: items.artWorkPath,
            //       linkedMyProjects: [{ projectTitle: myProjectsDetail.projectTitle }],
            //     }),
            //   });

            //   await updateDoc(docRef, {
            //     trackListData: arrayUnion({
            //       trackDataPath: items.trackDataPath,
            //       trackTitle: items.trackTitle,
            //       artistName: items.artistName,
            //       artWorkPath: items.artWorkPath,
            //       linkedMyProjects: [],
            //     }),
            //   });
            // }
          });
        });
        // myProjectsItems.some(async (item: any) => {
        //   console.log(item.trackTitle);
        // if (item.trackTitle === trackListDetail.trackTitle) {
        //   console.log(item.trackTitle === trackListDetail.trackTitle);
        //   await updateDoc(docRef, {
        //     myProjectsData: arrayRemove({
        //       projectTitle: item.projectTitle,
        //       lyric: item.lyric,
        //       trackDataPath: item.trackDataPath,
        //       trackTitle: item.trackTitle,
        //       artistName: item.artistName,
        //       artWorkPath: item.artWorkPath,
        //     }),
        //   });

        //   await updateDoc(docRef, {
        //     myProjectsData: arrayUnion({
        //       projectTitle: item.projectTitle,
        //       lyric: item.lyric,
        //       trackDataPath: item.trackDataPath,
        //       trackTitle: "",
        //       artistName: item.artistName,
        //       artWorkPath: item.artWorkPath,
        //     }),
        //   });
        // }
        // });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(hideOverlay());
      dispatch(activeHidden());
      dispatch(hideCenterModal());
      if (myProjectsModalFlag) dispatch(inactiveMyProjectsModalFlag());
      if (trackListModalFlag) dispatch(inactiveTrackListModalFlag());
      console.log("delete data");
    }
  };

  const onPressCancel = () => {
    dispatch(hideOverlay());
    dispatch(activeHidden());
    dispatch(hideCenterModal());
    if (myProjectsModalFlag) dispatch(inactiveMyProjectsModalFlag());
    if (trackListModalFlag) dispatch(inactiveTrackListModalFlag());
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
