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
import { setMyProjectsDetail } from "store/MyProjectsDetailSlice";
import { setCueA, setCueB, setCueC, setCueD, setCueE } from "store/CueButtonsSlice";
import { inactiveTrackListModalFlag } from "store/TrackListModalFlagSlice";
import { inactiveEditProjectModalFlag } from "store/EditProjectModalFlagSlice";

// Styles
import styles from "./HorizontalButtonList.scss";

interface Props {
  navigation: any;
}

const HorizontalButtonList = (props: Props) => {
  const dispatch = useDispatch();
  const centerModalSubmitTextState = useSelector((state) => state.centerModal.submitButtonText);
  const myProjectsItems = useSelector((state) => state.myProjectsItems.myProjectsItems);
  const myProjectsDetail = useSelector((state) => state.myProjectsDetail);
  const myProjectsModalFlag = useSelector((state) => state.myProjectsModalFlag.modalFlag);
  const trackListModalFlag = useSelector((state) => state.trackListModalFlag.modalFlag);
  const editProjectModalFlag = useSelector((state) => state.editProjectModalFlag.modalFlag);
  const trackListItems = useSelector((state) => state.trackListItems.trackListItems);
  const trackListDetail = useSelector((state) => state.trackListDetail);
  const { uid }: any = firebaseAuth.currentUser;

  // Unmountしたときにデータの中身をリセット
  const resetMyProjectsDetail = {
    projectTitle: "",
    lyric: "",
    trackDataPath: "",
    trackTitle: "",
    artistName: "",
    artWorkPath: "",
    cueButtons: [
      { flag: false, name: "", position: 0 },
      { flag: false, name: "", position: 0 },
      { flag: false, name: "", position: 0 },
      { flag: false, name: "", position: 0 },
      { flag: false, name: "", position: 0 },
    ],
  };

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
          console.log(items.trackTitle);
          console.log(items.trackTitle === trackListDetail.trackTitle);
          if (items.trackTitle === trackListDetail.trackTitle) {
            await updateDoc(docRef, {
              myProjectsData: arrayRemove({
                projectTitle: items.projectTitle,
                lyric: items.lyric,
                trackDataPath: items.trackDataPath,
                trackTitle: items.trackTitle,
                artistName: items.artistName,
                artWorkPath: items.artWorkPath,
              }),
            });

            await updateDoc(docRef, {
              myProjectsData: arrayUnion({
                projectTitle: items.projectTitle,
                lyric: items.lyric,
                trackDataPath: items.trackDataPath,
                trackTitle: "",
                artistName: items.artistName,
                artWorkPath: items.artWorkPath,
              }),
            });
          }
        });
      }

      // EditProjectからのモーダル表示の処理
      if (editProjectModalFlag) {
        console.log("editProjectModalFlag!");
        await updateDoc(docRef, {
          myProjectsData: arrayRemove({ ...myProjectsDetail }),
        });
        await updateDoc(docRef, {
          myProjectsData: arrayUnion({ ...myProjectsDetail }),
        });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(hideOverlay());
      dispatch(activeHidden());
      dispatch(hideCenterModal());
      if (myProjectsModalFlag) {
        dispatch(inactiveMyProjectsModalFlag());
        console.log("delete project data");
      }
      if (trackListModalFlag) {
        dispatch(inactiveTrackListModalFlag());
        console.log("delete track data");
      }
      if (editProjectModalFlag) {
        dispatch(inactiveEditProjectModalFlag());
        dispatch(setMyProjectsDetail(resetMyProjectsDetail));
        dispatch(setCueA([{ flag: false }, { name: "" }, { position: 0 }]));
        dispatch(setCueB([{ flag: false }, { name: "" }, { position: 0 }]));
        dispatch(setCueC([{ flag: false }, { name: "" }, { position: 0 }]));
        dispatch(setCueD([{ flag: false }, { name: "" }, { position: 0 }]));
        dispatch(setCueE([{ flag: false }, { name: "" }, { position: 0 }]));
        props.navigation.navigate("MainTabBar");
      }
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
