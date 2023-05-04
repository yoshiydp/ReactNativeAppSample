import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DocumentPicker from "react-native-document-picker";
import { firebaseAuth, db } from "src/config/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Store
import { useSelector } from "store/index";
import {
  showLoadingFullScreen,
  hideLoadingFullScreen,
  setLoadingFullScreenMessage,
} from "store/LoadingFullScreenSlice";
import { hideOverlay } from "store/OverlaySlice";
import { hideMainTabMenu } from "store/MainTabMenuSlice";
import { showModalPageSheet } from "store/ModalPageSheetSlice";
import { setMyProjectsDetail } from "store/MyProjectsDetailSlice";
import { setArtWork, setTrackDataFile } from "store/NewProjectSlice";
import { setTrackListDetail } from "store/TrackListDetailSlice";
import { setTrackListItems } from "store/TrackListItemsSlice";

// Components
import LoadingFullScreen from "components/molecules/Loading/LoadingFullScreen";
import LowerScreen from "components/templates/LowerScreen";
import ModalPageSheet from "components/organisms/Modal/ModalPageSheet";

// Constants
import * as TEXT from "constants/text";

// Validators
import { validateProjectTitle } from "src/validators/NewProjectValidator";

interface Props {
  navigation: any;
}

const NewProject = (props: Props) => {
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [errorProjectTitle, setErrorProjectTitle] = useState<string>("");
  const dispatch = useDispatch();
  const artWork = useSelector((state) => state.newProject.artWork);
  const trackDataFile = useSelector((state) => state.newProject.trackDataFile);
  const trackListItems = useSelector((state) => state.trackListItems.trackListItems);
  const trackListDetailTitle = useSelector((state) => state.trackListDetail.trackTitle);
  const trackListDetailDataPath = useSelector((state) => state.trackListDetail.trackDataPath);
  const loadingFullScreen = useSelector((state) => state.loadingFullScreen.loadingFullScreen);
  const { uid }: any = firebaseAuth.currentUser;
  if (!uid) return;
  const docRef = doc(db, "users", uid);
  const storage = getStorage();

  const getTrackListData = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const trackListData = docSnap.data().trackListData;
      const sorted = trackListData.sort((a: any, b: any) => {
        a = a.trackTitle.toString().toLowerCase();
        b = b.trackTitle.toString().toLowerCase();
        return a > b ? 1 : b > a ? -1 : 0;
      });
      dispatch(setTrackListItems(sorted));
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getTrackListData();
    dispatch(hideOverlay());
    dispatch(hideMainTabMenu());
  }, [projectTitle, artWork, trackDataFile]);

  useEffect(() => {
    return () => {
      dispatch(setArtWork([]));
      dispatch(setTrackDataFile([]));
      dispatch(setTrackListDetail(resetTrackData));
    };
  }, []);

  const selectTrackDataFile = async () => {
    try {
      const results: any = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.audio],
      });
      dispatch(setTrackDataFile(results));
    } catch (error) {
      console.log(error);
    }
  };

  const selectTrackList = async () => {
    dispatch(showModalPageSheet());
  };

  const fileUpload = async (
    fileUri: string,
    fileName: string,
    fileType: string,
    directory: string,
  ) => {
    if (!uid) return;
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", fileUri, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, uid + directory + fileName);
    const metadata = {
      name: fileName,
      contentType: fileType,
    };

    try {
      await uploadBytesResumable(storageRef, blob, metadata);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const createProject = async () => {
    setErrorProjectTitle("");
    validateProjectTitle(projectTitle, setErrorProjectTitle);

    // プロジェクトタイトルが未入力の場合は以下を実行不可とする
    if (!projectTitle) return;

    let artWorkDownloadUrl;
    let trackDataDownloadUrl;

    try {
      dispatch(showLoadingFullScreen());
      dispatch(setLoadingFullScreenMessage(TEXT.LOADING_MESSAGE_CREATE_PROJECT));

      // artWorkのアップロード
      if (artWork.length) {
        await fileUpload(artWork[0]?.uri, artWork[0]?.fileName, artWork[0]?.type, "/artworks/");
        await getDownloadURL(ref(storage, uid + "/artworks/" + artWork[0]?.fileName))
          .then((url) => {
            artWorkDownloadUrl = url;
            console.log("artWorkDownloadUrl: " + artWorkDownloadUrl);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      // trackDataFileのアップロード
      if (trackDataFile.length > 0) {
        await fileUpload(
          trackDataFile[0]?.uri,
          trackDataFile[0]?.name,
          trackDataFile[0]?.type,
          "/track_data_files/",
        );

        await getDownloadURL(ref(storage, uid + "/track_data_files/" + trackDataFile[0]?.name))
          .then((url) => {
            trackDataDownloadUrl = url;
            console.log("trackDataDownloadUrl: " + trackDataDownloadUrl);
          })
          .catch((error) => {
            console.log(error);
          });

        await updateDoc(doc(db, "users", uid), {
          myProjectsData: arrayUnion({
            projectTitle: projectTitle,
            lyric: "",
            trackDataPath: trackDataDownloadUrl ? trackDataDownloadUrl : "",
            trackTitle: trackDataFile[0]?.name,
            artistName: "",
            artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : "",
            cueButtons: [
              { flag: false, name: "Cue A", position: 0 },
              { flag: false, name: "Cue B", position: 0 },
              { flag: false, name: "Cue C", position: 0 },
              { flag: false, name: "Cue D", position: 0 },
              { flag: false, name: "Cue E", position: 0 },
            ],
          }),
        });

        await updateDoc(doc(db, "users", uid), {
          trackListData: arrayUnion({
            trackDataPath: trackDataDownloadUrl ? trackDataDownloadUrl : "",
            trackTitle: trackDataFile[0]?.name,
            artistName: "",
            artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : "",
            linkedMyProjects: [{ projectTitle: projectTitle }],
          }),
        });
      }

      // トラックリストから選択した場合のアップロード
      if (trackDataFile.length === 0 && trackListDetailTitle && trackListDetailDataPath) {
        await updateDoc(doc(db, "users", uid), {
          myProjectsData: arrayUnion({
            projectTitle: projectTitle,
            lyric: "",
            trackDataPath: trackListDetailDataPath ? trackListDetailDataPath : "",
            trackTitle: trackListDetailTitle,
            artistName: "",
            artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : "",
            cueButtons: [
              { flag: false, name: "Cue A", position: 0 },
              { flag: false, name: "Cue B", position: 0 },
              { flag: false, name: "Cue C", position: 0 },
              { flag: false, name: "Cue D", position: 0 },
              { flag: false, name: "Cue E", position: 0 },
            ],
          }),
        });

        await updateDoc(doc(db, "users", uid), {
          trackListData: arrayRemove({
            trackDataPath: trackListDetailDataPath,
            trackTitle: trackListDetailTitle,
            artistName: "",
            artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : "",
            linkedMyProjects: [],
          }),
        });

        await updateDoc(doc(db, "users", uid), {
          trackListData: arrayUnion({
            trackDataPath: trackListDetailDataPath,
            trackTitle: trackListDetailTitle,
            artistName: "",
            artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : "",
            linkedMyProjects: [{ projectTitle: projectTitle }],
          }),
        });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(hideLoadingFullScreen());

      // trackDataFileのアップロードの場合のstoreへの保存
      if (trackDataFile.length > 0) {
        const setNewProjectUploadTrackData = {
          projectTitle: projectTitle,
          lyric: "",
          trackDataPath: trackDataDownloadUrl ? trackDataDownloadUrl : "",
          trackTitle: trackDataFile[0]?.name,
          artistName: "",
          artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : "",
          cueButtons: [
            { flag: false, name: "Cue A", position: 0 },
            { flag: false, name: "Cue B", position: 0 },
            { flag: false, name: "Cue C", position: 0 },
            { flag: false, name: "Cue D", position: 0 },
            { flag: false, name: "Cue E", position: 0 },
          ],
        };
        dispatch(setMyProjectsDetail(setNewProjectUploadTrackData));
      }

      // トラックリストから選択した場合のアップロードのstoreへの保存
      if (trackDataFile.length === 0 && trackListDetailTitle && trackListDetailDataPath) {
        const setNewProjectSelectTrackListData = {
          projectTitle: projectTitle,
          lyric: "",
          trackDataPath: trackListDetailDataPath ? trackListDetailDataPath : "",
          trackTitle: trackListDetailTitle,
          artistName: "",
          artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : "",
          cueButtons: [
            { flag: false, name: "Cue A", position: 0 },
            { flag: false, name: "Cue B", position: 0 },
            { flag: false, name: "Cue C", position: 0 },
            { flag: false, name: "Cue D", position: 0 },
            { flag: false, name: "Cue E", position: 0 },
          ],
        };
        dispatch(setMyProjectsDetail(setNewProjectSelectTrackListData));
      }
      await props.navigation.navigate("EditProject");
    }
  };

  // テキストフォームリスト
  const formControlItems = [
    {
      label: TEXT.LABEL_INPUT_PROJECT_TITLE,
      placeholder: TEXT.PLACEHOLDER_PROJECT_TITLE,
      onChangeText: setProjectTitle,
      value: projectTitle,
      required: true,
      errorText: errorProjectTitle,
    },
    {
      label: TEXT.LABEL_INPUT_TRACK_DATA,
      placeholder: TEXT.PLACEHOLDER_NO_TRACK,
      value: trackDataFile.length ? trackDataFile[0]?.name : trackListDetailTitle,
      required: true,
      notes: TEXT.LABEL_NOTES_TRACK_DATA,
      editable: false,
      selectTextOnFocus: false,
    },
  ];

  // コントロールボタンリスト
  const controlButtonItems = [
    {
      buttonText: trackDataFile.length ? TEXT.BUTTON_TRACK_CHANGE : TEXT.BUTTON_TRACK_UPLOAD,
      onPressEvent: selectTrackDataFile,
    },
    {
      buttonText: TEXT.BUTTON_TRACK_SELECT,
      onPressEvent: selectTrackList,
    },
  ];

  // Unmountされたときにトラックデータをリセットするためのオブジェクト
  const resetTrackData = {
    trackDataPath: "",
    trackTitle: "",
    artistName: "",
    artWorkPath: "",
    linkedMyProjects: [],
  };

  return (
    <>
      <LowerScreen
        title={TEXT.TITLE_NEW_PROJECT}
        navigation={props.navigation}
        formControlItems={formControlItems}
        controlButtonItems={controlButtonItems}
        buttonText={TEXT.BUTTON_START}
        onPressSubmitEvent={createProject}
      />
      <ModalPageSheet trackListDataItems={trackListItems} />
      <LoadingFullScreen isShow={loadingFullScreen} />
    </>
  );
};

export default NewProject;
