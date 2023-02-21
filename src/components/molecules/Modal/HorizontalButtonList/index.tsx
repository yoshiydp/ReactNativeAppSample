import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { firebaseAuth, db } from "src/config/firebase";
import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from "firebase/firestore";

// Store
import { useSelector } from "store/index";
import { hideCenterModal } from "store/CenterModalSlice";
import { hideOverlay, activeHidden } from "store/OverlaySlice";
import { setTrackListItems } from "store/TrackListItemsSlice";

// Styles
import styles from "./HorizontalButtonList.scss";

const HorizontalButtonList = () => {
  const dispatch = useDispatch();
  const centerModalSubmitTextState = useSelector((state) => state.centerModal.submitButtonText);
  const myProjectsState = useSelector((state) => state.myProjectsDetail);
  const myProjectsModalFlag = useSelector((state) => state.myProjectsModalFlag.modalFlag);
  const trackListItems = useSelector((state) => state.trackListItems.trackListItems);

  const onPressSubmit = async () => {
    // console.log(myProjectsModalFlag);
    const { uid }: any = firebaseAuth.currentUser;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch(setTrackListItems(docSnap.data()?.trackListData));
    } else {
      console.log("No such document!");
    }

    trackListItems.filter(async (items: any, index: number) => {
      await items.linkedMyProjects.some((linkedMyProjects: any) => {
        if (linkedMyProjects.projectTitle === myProjectsState.projectTitle) {
          console.log(index);
          updateDoc(docRef, {
            trackListData: [
              {
                trackDataPath: items.trackDataPath,
                trackTitle: items.trackTitle,
                artistName: items.artistName,
                artWorkPath: items.artWorkPath,
                linkedMyProjects: [linkedMyProjects ? { projectTitle: "" } : ""],
              },
            ],
          });
        }
      });
    });

    console.log(myProjectsState.projectTitle);

    // try {
    //   const { uid }: any = firebaseAuth.currentUser;
    //   if (!uid) return;
    //   const docRef = doc(db, "users", uid);

    //   if (myProjectsModalFlag) {
    //     await updateDoc(docRef, {
    //       myProjectsData: arrayRemove({ ...myProjectsState }),
    //     }).then(() => {
    //       dispatch(hideOverlay());
    //       dispatch(activeHidden());
    //       dispatch(hideCenterModal());
    //       console.log("delete data");
    //     });
    //   }
    // } catch (error: any) {
    //   console.log(error);
    // }
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
