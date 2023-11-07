import React, { useState } from "react";
import { View } from "react-native";
import TrackPlayer, { State, usePlaybackState } from "react-native-track-player";
import { useDispatch } from "react-redux";
import { firebaseAuth, db } from "src/config/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Store
import { useSelector } from "store/index";
import { hideCenterModal } from "store/CenterModalSlice";
import { hideOverlay, activeHidden } from "store/OverlaySlice";
import { inactiveMyProjectsModalFlag } from "store/MyProjectsModalFlagSlice";
import { setMyProjectsDetail } from "store/MyProjectsDetailSlice";
import { setCueA, setCueB, setCueC, setCueD, setCueE } from "store/CueButtonsSlice";
import { inactiveTrackListModalFlag } from "store/TrackListModalFlagSlice";
import { inactiveEditProjectModalFlag } from "store/EditProjectModalFlagSlice";
import { hideModalProjectSettings } from "store/ModalProjectSettingsSlice";
import { setProjectSettingsArtWorkPath, setProjectSettingsTitle } from "store/ProjectSettingsSlice";
import { inactiveProjectSettingsModalFlag } from "store/ProjectSettingsModalFlagSlice";
import { hideCenterModalProjectSettings } from "store/CenterModalProjectSettingsSlice";
import { hideLoadingFullScreen } from "store/LoadingFullScreenSlice";

// Components
import ButtonPlain from "components/atoms/ButtonPlain";

// Interfaces
import { SetCueActivityType } from "interfaces/cueButtonsInterface";

// Styles
import styles from "./HorizontalButtonList.scss";

interface Props {
  navigation: any;
}

const HorizontalButtonList = (props: Props) => {
  const dispatch = useDispatch();
  const playbackState = usePlaybackState();
  const centerModalSubmitTextState = useSelector((state) => state.centerModal.submitButtonText);
  const myProjectsItems = useSelector((state) => state.myProjectsItems.myProjectsItems);
  const myProjectsDetail = useSelector((state) => state.myProjectsDetail);
  const myProjectsModalFlag = useSelector((state) => state.myProjectsModalFlag.modalFlag);
  const trackListModalFlag = useSelector((state) => state.trackListModalFlag.modalFlag);
  const editProjectModalFlag = useSelector((state) => state.editProjectModalFlag.modalFlag);
  const trackListItems = useSelector((state) => state.trackListItems.trackListItems);
  const trackListDetail = useSelector((state) => state.trackListDetail);
  const textEditorValue = useSelector((state) => state.textEditor.value);
  const projectSettingsTitle = useSelector((state) => state.projectSettings.projectTitle);
  const projectSettingsArtWorkPath = useSelector((state) => state.projectSettings.artWorkPath);
  const projectSettingsTrackDataPath = useSelector((state) => state.projectSettings.trackDataPath);
  const cueButtons = useSelector((state) => state.myProjectsDetail.cueButtons);
  const cueA = useSelector((state) => state.cueButtons.cueA);
  const cueB = useSelector((state) => state.cueButtons.cueB);
  const cueC = useSelector((state) => state.cueButtons.cueC);
  const cueD = useSelector((state) => state.cueButtons.cueD);
  const cueE = useSelector((state) => state.cueButtons.cueE);
  const trackDataFile = useSelector((state) => state.newProject.trackDataFile);
  const trackListDetailTitle = useSelector((state) => state.trackListDetail.trackTitle);
  const projectSettingsModalFlag = useSelector((state) => state.projectSettingsModalFlag.modalFlag);
  const modalProjectSettingsProjectTitle = useSelector(
    (state) => state.modalProjectSettings.modalProjectSettingsProjectTitle
  );
  const artWork = useSelector((state) => state.newProject.artWork);
  const trackListDetailDataPath = useSelector((state) => state.trackListDetail.trackDataPath);
  const modalProjectSettingsArtWorkPath = useSelector(
    (state) => state.modalProjectSettings.modalProjectSettingsArtWorkPath
  );
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isPlayerInitialized, setIsPlayerInitialized] = useState<boolean | undefined>(false);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [start, setStart] = useState<boolean>(true);
  const [pause, setPause] = useState<boolean>(false);
  const [cueActivity, setCueActivity] = useState<SetCueActivityType>({ flag: false, name: "" });
  const { uid }: any = firebaseAuth.currentUser;
  if (!uid) return;
  const docRef = doc(db, "users", uid);
  const storage = getStorage();

  type SetTrackDataType = {
    url: string;
    title: string;
  };

  // トラックデータの情報を格納
  let setTrackData: SetTrackDataType[] = [];

  // 初期レンダリング時のプロジェクトデータ
  const initialMyProjectData = {
    projectTitle: myProjectsDetail.projectTitle,
    lyric: myProjectsDetail.lyric,
    trackDataPath: myProjectsDetail.trackDataPath,
    trackTitle: myProjectsDetail.trackTitle,
    artistName: "",
    artWorkPath: myProjectsDetail.artWorkPath,
    cueButtons: myProjectsDetail.cueButtons,
  };

  // TextEditorで再編集されたプロジェクトデータ
  const setTextValueMyProjectData = {
    projectTitle: myProjectsDetail.projectTitle,
    lyric: textEditorValue,
    trackDataPath: myProjectsDetail.trackDataPath,
    trackTitle: myProjectsDetail.trackTitle,
    artistName: "",
    artWorkPath: myProjectsDetail.artWorkPath,
    cueButtons: myProjectsDetail.cueButtons,
  };

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

  const fileUpload = async (
    fileUri: string,
    fileName: string,
    fileType: string,
    directory: string
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

  const controlPause = async () => {
    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
      console.log("controlPause!");
      setStart(true);
      setPause(false);
    }
  };

  // ModalProjectSettingsの編集を保存する
  const saveProjectSettings = async () => {
    // プロジェクトタイトルが未入力の場合は以下を実行不可とする
    if (!modalProjectSettingsProjectTitle) return;

    let artWorkDownloadUrl;
    let trackDataDownloadUrl;

    try {
      dispatch(hideCenterModalProjectSettings());
      // artWorkのアップロード
      if (artWork.length) {
        await fileUpload(artWork[0]?.uri, artWork[0]?.fileName, artWork[0]?.type, "/artworks/");
        await getDownloadURL(ref(storage, uid + "/artworks/" + artWork[0]?.fileName))
          .then((url) => {
            artWorkDownloadUrl = url;
            console.log("artWorkDownloadUrl: " + artWorkDownloadUrl);
            dispatch(setProjectSettingsArtWorkPath(artWorkDownloadUrl));
            console.log("modalProjectSettingsArtWorkPath: ", modalProjectSettingsArtWorkPath);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      // trackDataFileのアップロード
      if (trackDataFile.length) {
        await fileUpload(
          trackDataFile[0]?.uri,
          trackDataFile[0]?.name,
          trackDataFile[0]?.type,
          "/track_data_files/"
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
          trackListData: arrayRemove({
            trackDataPath: myProjectsDetail.trackDataPath,
            trackTitle: myProjectsDetail.trackTitle,
            artistName: "",
            artWorkPath: myProjectsDetail.artWorkPath,
            linkedMyProjects: [{ projectTitle: myProjectsDetail.projectTitle }],
          }),
        });
        await updateDoc(doc(db, "users", uid), {
          trackListData: arrayUnion({
            trackDataPath: trackDataDownloadUrl
              ? trackDataDownloadUrl
              : myProjectsDetail.trackDataPath,
            trackTitle: trackDataFile.length ? trackDataFile[0]?.name : myProjectsDetail.trackTitle,
            artistName: "",
            artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : myProjectsDetail.artWorkPath,
            linkedMyProjects: [
              {
                projectTitle: modalProjectSettingsProjectTitle.length
                  ? modalProjectSettingsProjectTitle
                  : myProjectsDetail.projectTitle,
              },
            ],
          }),
        });
      }

      // トラックデータをリアルタイムで差し替え
      if (trackDataFile.length || trackListDetailTitle.length) {
        controlPause();
        setIsPlayerInitialized(false);

        setTrackData = [
          {
            url: trackDataDownloadUrl
              ? trackDataDownloadUrl
              : trackListDetailDataPath
              ? trackListDetailDataPath
              : "",
            title: trackDataFile.length
              ? trackDataFile[0]?.name
              : trackListDetailTitle.length
              ? trackListDetailTitle
              : "",
          },
        ];

        await TrackPlayer.reset();
        await TrackPlayer.add(setTrackData);
        await TrackPlayer.seekTo(0);
      }

      // アートワーク or
      // 新規トラックデータをアップロード or
      // トラックリスト内のデータを設定した場合にupdateDocを実行
      if (
        artWork.length ||
        modalProjectSettingsProjectTitle.length ||
        trackDataFile.length ||
        trackListDetailTitle.length
      ) {
        // 編集前の現在のプロジェクトデータを削除
        updateDoc(docRef, {
          myProjectsData: arrayRemove({ ...myProjectsDetail }),
        });

        // 編集後のプロジェクトデータを追加
        updateDoc(docRef, {
          myProjectsData: arrayUnion({
            projectTitle: modalProjectSettingsProjectTitle,
            lyric: textEditorValue,
            trackDataPath: trackDataDownloadUrl
              ? trackDataDownloadUrl
              : trackListDetailDataPath
              ? trackListDetailDataPath
              : myProjectsDetail.trackDataPath,
            trackTitle: trackDataFile.length
              ? trackDataFile[0]?.name
              : trackListDetailTitle.length
              ? trackListDetailTitle
              : myProjectsDetail.trackTitle,
            artistName: "",
            artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : myProjectsDetail.artWorkPath,
            cueButtons: [
              {
                flag:
                  trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[0].flag,
                name:
                  trackDataFile.length || trackListDetailTitle.length
                    ? "Cue A"
                    : cueButtons[0].name,
                position:
                  trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[0].position,
              },
              {
                flag:
                  trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[1].flag,
                name:
                  trackDataFile.length || trackListDetailTitle.length
                    ? "Cue B"
                    : cueButtons[1].name,
                position:
                  trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[1].position,
              },
              {
                flag:
                  trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[2].flag,
                name:
                  trackDataFile.length || trackListDetailTitle.length
                    ? "Cue C"
                    : cueButtons[2].name,
                position:
                  trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[2].position,
              },
              {
                flag:
                  trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[3].flag,
                name:
                  trackDataFile.length || trackListDetailTitle.length
                    ? "Cue D"
                    : cueButtons[3].name,
                position:
                  trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[3].position,
              },
              {
                flag:
                  trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[4].flag,
                name:
                  trackDataFile.length || trackListDetailTitle.length
                    ? "Cue E"
                    : cueButtons[4].name,
                position:
                  trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[4].position,
              },
            ],
          }),
        });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      if (projectSettingsModalFlag) {
        dispatch(
          setMyProjectsDetail({
            projectTitle: modalProjectSettingsProjectTitle,
            lyric: textEditorValue,
            trackDataPath: trackDataDownloadUrl
              ? trackDataDownloadUrl
              : trackListDetailDataPath
              ? trackListDetailDataPath
              : myProjectsDetail.trackDataPath,
            trackTitle: trackDataFile.length
              ? trackDataFile[0]?.name
              : trackListDetailTitle.length
              ? trackListDetailTitle
              : myProjectsDetail.trackTitle,
            artistName: "",
            artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : myProjectsDetail.artWorkPath,
            cueButtons: [
              {
                flag:
                  trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[0].flag,
                name:
                  trackDataFile.length || trackListDetailTitle.length
                    ? "Cue A"
                    : cueButtons[0].name,
                position:
                  trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[0].position,
              },
              {
                flag:
                  trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[1].flag,
                name:
                  trackDataFile.length || trackListDetailTitle.length
                    ? "Cue B"
                    : cueButtons[1].name,
                position:
                  trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[1].position,
              },
              {
                flag:
                  trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[2].flag,
                name:
                  trackDataFile.length || trackListDetailTitle.length
                    ? "Cue C"
                    : cueButtons[2].name,
                position:
                  trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[2].position,
              },
              {
                flag:
                  trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[3].flag,
                name:
                  trackDataFile.length || trackListDetailTitle.length
                    ? "Cue D"
                    : cueButtons[3].name,
                position:
                  trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[3].position,
              },
              {
                flag:
                  trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[4].flag,
                name:
                  trackDataFile.length || trackListDetailTitle.length
                    ? "Cue E"
                    : cueButtons[4].name,
                position:
                  trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[4].position,
              },
            ],
          })
        );
        dispatch(hideLoadingFullScreen());
        dispatch(inactiveProjectSettingsModalFlag());
        dispatch(hideModalProjectSettings());
        dispatch(hideOverlay());
        dispatch(setProjectSettingsTitle(modalProjectSettingsProjectTitle));
      }
    }
  };

  const onPressSubmit = async () => {
    try {
      if (!uid) return;
      const docRef = doc(db, "users", uid);
      setDisabled(true);

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
      if (editProjectModalFlag && !projectSettingsModalFlag) {
        console.log("editProjectModalFlag!");
        await updateDoc(docRef, {
          myProjectsData: arrayRemove({ ...initialMyProjectData }),
        });
        await updateDoc(docRef, {
          myProjectsData: arrayUnion({ ...setTextValueMyProjectData }),
        });
      }

      // ProjectSettingsModalからのモーダル表示の処理
      if (!editProjectModalFlag && projectSettingsModalFlag) {
        console.log("projectSettingsModalFlag!");
        await saveProjectSettings();
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
      setDisabled(false);
    }
  };

  const onPressCancel = () => {
    dispatch(hideOverlay());
    dispatch(activeHidden());
    dispatch(hideCenterModal());
    if (myProjectsModalFlag) dispatch(inactiveMyProjectsModalFlag());
    if (trackListModalFlag) dispatch(inactiveTrackListModalFlag());
    if (projectSettingsModalFlag) {
      dispatch(hideCenterModalProjectSettings());
      dispatch(hideLoadingFullScreen());
      dispatch(inactiveProjectSettingsModalFlag());
    }
  };

  const buttonYesStyle = styles.buttonYes;

  const buttonCancelStyle = styles.buttonCancel;

  return (
    <View style={styles.container}>
      <View style={styles.border}></View>
      <View style={styles.item}>
        <ButtonPlain
          styles={buttonYesStyle}
          onPressEvent={onPressSubmit}
          disabled={disabled}
          text={centerModalSubmitTextState}
        />
      </View>
      <View style={styles.item}>
        <ButtonPlain
          styles={buttonCancelStyle}
          onPressEvent={onPressCancel}
          disabled={disabled}
          text="Cancel"
        />
      </View>
    </View>
  );
};

export default HorizontalButtonList;
