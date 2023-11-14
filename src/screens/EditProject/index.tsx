import React, { useState, useEffect } from "react";
import { SafeAreaView, Animated, View, ScrollView, Text } from "react-native";
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  AppKilledPlaybackBehavior,
} from "react-native-track-player";
import DocumentPicker from "react-native-document-picker";
import { useDispatch } from "react-redux";
import { firebaseAuth, db } from "src/config/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Store
import { useSelector } from "store/index";
import { setCueA, setCueB, setCueC, setCueD, setCueE } from "store/CueButtonsSlice";
import { setMyProjectsDetail } from "store/MyProjectsDetailSlice";
import { showCenterModal, setCenterModalTitle } from "store/CenterModalSlice";
import { showOverlay, hideOverlay, activeHidden, inactiveHidden } from "store/OverlaySlice";
import {
  showModalProjectSettings,
  hideModalProjectSettings,
  setModalProjectSettingsArtWorkPath,
  setModalProjectSettingsTitle,
  activeModalProjectSettingsSelectTrackList,
} from "store/ModalProjectSettingsSlice";
import { activeEditProjectModalFlag } from "store/EditProjectModalFlagSlice";
import { showModalPageSheet } from "store/ModalPageSheetSlice";
import {
  showEditCueNameTextField,
  hideEditCueNameTextField,
} from "store/EditCueNameTextFieldSlice";
import { setProjectSettingsArtWorkPath, setProjectSettingsTitle } from "store/ProjectSettingsSlice";
import { setTrackDataFile } from "store/NewProjectSlice";
import { setTrackListDetail } from "store/TrackListDetailSlice";
import { setTrackListItems } from "store/TrackListItemsSlice";
import {
  showLoadingFullScreen,
  hideLoadingFullScreen,
  setLoadingFullScreenMessage,
} from "store/LoadingFullScreenSlice";
import {
  showCenterModalProjectSettings,
  setCenterModalProjectSettingsMessage,
  setCenterModalProjectSettingsTrackTitle,
  setCenterModalProjectSettingsNotes,
} from "store/CenterModalProjectSettingsSlice";
import { activeProjectSettingsModalFlag } from "store/ProjectSettingsModalFlagSlice";

// Components
import TextEditor from "components/organisms/TextEditor";
import TimeSeekBar from "components/organisms/TimeSeekBar";
import CueButtons from "components/organisms/EditProject/CueButtons";
import CueControlPlayer from "components/organisms/EditProject/CueControlPlayer";
import VolumeSeekBar from "components/organisms/EditProject/VolumeSeekBar";
import CenterModal from "components/organisms/Modal/CenterModal";
import ModalProjectSettings from "components/organisms/Modal/ModalProjectSettings";
import EditCueNameTextField from "components/molecules/EditCueNameTextField";
import EditProjectHeader from "components/molecules/EditProjectHeader";
import Overlay from "components/atoms/Overlay";
import ModalPageSheet from "components/organisms/Modal/ModalPageSheet";

// Constants
import * as TEXT from "constants/text";

// Interfaces
import { SetCueActivityType } from "interfaces/cueButtonsInterface";

// Validators
import { validateProjectTitle } from "src/validators/ProjectSettingsValidator";

// Styles
import styles from "./EditProject.scss";

interface Props {
  navigation: any;
}

const EditProject = (props: Props) => {
  const dispatch = useDispatch();
  const overlay = useSelector((state) => state.overlay.overlay);
  const myProjectsDetail = useSelector((state) => state.myProjectsDetail);
  const textEditorValue = useSelector((state) => state.textEditor.value);
  const cueButtons = useSelector((state) => state.myProjectsDetail.cueButtons);
  const editCueNameTextField = useSelector(
    (state) => state.editCueNameTextField.editCueNameTextField
  );
  const centerModal = useSelector((state) => state.centerModal.centerModal);
  const cueA = useSelector((state) => state.cueButtons.cueA);
  const cueB = useSelector((state) => state.cueButtons.cueB);
  const cueC = useSelector((state) => state.cueButtons.cueC);
  const cueD = useSelector((state) => state.cueButtons.cueD);
  const cueE = useSelector((state) => state.cueButtons.cueE);
  const trackDataFile = useSelector((state) => state.newProject.trackDataFile);
  const trackListItems = useSelector((state) => state.trackListItems.trackListItems);
  const trackListDetailTitle = useSelector((state) => state.trackListDetail.trackTitle);
  const trackListDetailDataPath = useSelector((state) => state.trackListDetail.trackDataPath);
  const modalProjectSettingsArtWorkPath = useSelector(
    (state) => state.modalProjectSettings.modalProjectSettingsArtWorkPath
  );
  const modalProjectSettingsProjectTitle = useSelector(
    (state) => state.modalProjectSettings.modalProjectSettingsProjectTitle
  );
  const artWork = useSelector((state) => state.newProject.artWork);
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();
  const [isPlayerInitialized, setIsPlayerInitialized] = useState<boolean | undefined>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [start, setStart] = useState<boolean>(true);
  const [pause, setPause] = useState<boolean>(false);
  const [cueActivity, setCueActivity] = useState<SetCueActivityType>({ flag: false, name: "" });
  const [cueType, setCueType] = useState<string>("");
  const [trackRepeat, setTrackRepeat] = useState<boolean>(false);
  const [cueName, setCueName] = useState<string>("");
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [formEditable, setFormEditable] = useState<boolean>(false);
  const [trackEditable, setTrackEditable] = useState<boolean>(false);
  const [errorProjectTitle, setErrorProjectTitle] = useState<string>("");
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

  // CueAの名前を保存する時のプロジェクトデータ
  const saveCueAProjectData = {
    projectTitle: myProjectsDetail.projectTitle,
    lyric: textEditorValue,
    trackDataPath: myProjectsDetail.trackDataPath ? myProjectsDetail.trackDataPath : "",
    trackTitle: myProjectsDetail.trackTitle,
    artistName: "",
    artWorkPath: myProjectsDetail.artWorkPath ? myProjectsDetail.artWorkPath : "",
    cueButtons: [
      {
        flag: cueA[0].flag ? cueA[0].flag : cueButtons[0].flag,
        name: cueType === "A" ? cueName : cueButtons[0].name,
        position:
          cueA[2].position && cueA[2].position > 0 ? cueA[2].position : cueButtons[0].position,
      },
      {
        flag: cueB[0].flag ? cueB[0].flag : cueButtons[1].flag,
        name: cueButtons[1].name,
        position: cueButtons[1].position,
      },
      {
        flag: cueC[0].flag ? cueC[0].flag : cueButtons[2].flag,
        name: cueButtons[2].name,
        position: cueButtons[2].position,
      },
      {
        flag: cueD[0].flag ? cueD[0].flag : cueButtons[3].flag,
        name: cueButtons[3].name,
        position: cueButtons[3].position,
      },
      {
        flag: cueE[0].flag ? cueE[0].flag : cueButtons[4].flag,
        name: cueButtons[4].name,
        position: cueButtons[4].position,
      },
    ],
  };

  // CueBの名前を保存する時のプロジェクトデータ
  const saveCueBProjectData = {
    projectTitle: myProjectsDetail.projectTitle,
    lyric: textEditorValue,
    trackDataPath: myProjectsDetail.trackDataPath ? myProjectsDetail.trackDataPath : "",
    trackTitle: myProjectsDetail.trackTitle,
    artistName: "",
    artWorkPath: myProjectsDetail.artWorkPath ? myProjectsDetail.artWorkPath : "",
    cueButtons: [
      {
        flag: cueA[0].flag ? cueA[0].flag : cueButtons[0].flag,
        name: cueButtons[0].name,
        position: cueButtons[0].position,
      },
      {
        flag: cueB[0].flag ? cueB[0].flag : cueButtons[1].flag,
        name: cueType === "B" ? cueName : cueButtons[1].name,
        position:
          cueB[2].position && cueB[2].position > 0 ? cueB[2].position : cueButtons[1].position,
      },
      {
        flag: cueC[0].flag ? cueC[0].flag : cueButtons[2].flag,
        name: cueButtons[2].name,
        position: cueButtons[2].position,
      },
      {
        flag: cueD[0].flag ? cueD[0].flag : cueButtons[3].flag,
        name: cueButtons[3].name,
        position: cueButtons[3].position,
      },
      {
        flag: cueE[0].flag ? cueE[0].flag : cueButtons[4].flag,
        name: cueButtons[4].name,
        position: cueButtons[4].position,
      },
    ],
  };

  // CueCの名前を保存する時のプロジェクトデータ
  const saveCueCProjectData = {
    projectTitle: myProjectsDetail.projectTitle,
    lyric: textEditorValue,
    trackDataPath: myProjectsDetail.trackDataPath ? myProjectsDetail.trackDataPath : "",
    trackTitle: myProjectsDetail.trackTitle,
    artistName: "",
    artWorkPath: myProjectsDetail.artWorkPath ? myProjectsDetail.artWorkPath : "",
    cueButtons: [
      {
        flag: cueA[0].flag ? cueA[0].flag : cueButtons[0].flag,
        name: cueButtons[0].name,
        position: cueButtons[0].position,
      },
      {
        flag: cueB[0].flag ? cueB[0].flag : cueButtons[1].flag,
        name: cueButtons[1].name,
        position: cueButtons[1].position,
      },
      {
        flag: cueC[0].flag ? cueC[0].flag : cueButtons[2].flag,
        name: cueType === "C" ? cueName : cueButtons[2].name,
        position:
          cueC[2].position && cueC[2].position > 0 ? cueC[2].position : cueButtons[2].position,
      },
      {
        flag: cueD[0].flag ? cueD[0].flag : cueButtons[3].flag,
        name: cueButtons[3].name,
        position: cueButtons[3].position,
      },
      {
        flag: cueE[0].flag ? cueE[0].flag : cueButtons[4].flag,
        name: cueButtons[4].name,
        position: cueButtons[4].position,
      },
    ],
  };

  // CueDの名前を保存する時のプロジェクトデータ
  const saveCueDProjectData = {
    projectTitle: myProjectsDetail.projectTitle,
    lyric: textEditorValue,
    trackDataPath: myProjectsDetail.trackDataPath ? myProjectsDetail.trackDataPath : "",
    trackTitle: myProjectsDetail.trackTitle,
    artistName: "",
    artWorkPath: myProjectsDetail.artWorkPath ? myProjectsDetail.artWorkPath : "",
    cueButtons: [
      {
        flag: cueA[0].flag ? cueA[0].flag : cueButtons[0].flag,
        name: cueButtons[0].name,
        position: cueButtons[0].position,
      },
      {
        flag: cueB[0].flag ? cueB[0].flag : cueButtons[1].flag,
        name: cueButtons[1].name,
        position: cueButtons[1].position,
      },
      {
        flag: cueC[0].flag ? cueC[0].flag : cueButtons[2].flag,
        name: cueButtons[2].name,
        position: cueButtons[2].position,
      },
      {
        flag: cueD[0].flag ? cueD[0].flag : cueButtons[3].flag,
        name: cueType === "D" ? cueName : cueButtons[3].name,
        position:
          cueD[2].position && cueD[2].position > 0 ? cueD[2].position : cueButtons[3].position,
      },
      {
        flag: cueE[0].flag ? cueE[0].flag : cueButtons[4].flag,
        name: cueButtons[4].name,
        position: cueButtons[4].position,
      },
    ],
  };

  // CueEの名前を保存する時のプロジェクトデータ
  const saveCueEProjectData = {
    projectTitle: myProjectsDetail.projectTitle,
    lyric: textEditorValue,
    trackDataPath: myProjectsDetail.trackDataPath ? myProjectsDetail.trackDataPath : "",
    trackTitle: myProjectsDetail.trackTitle,
    artistName: "",
    artWorkPath: myProjectsDetail.artWorkPath ? myProjectsDetail.artWorkPath : "",
    cueButtons: [
      {
        flag: cueA[0].flag ? cueA[0].flag : cueButtons[0].flag,
        name: cueButtons[0].name,
        position: cueButtons[0].position,
      },
      {
        flag: cueB[0].flag ? cueB[0].flag : cueButtons[1].flag,
        name: cueButtons[1].name,
        position: cueButtons[1].position,
      },
      {
        flag: cueC[0].flag ? cueC[0].flag : cueButtons[2].flag,
        name: cueButtons[2].name,
        position: cueButtons[2].position,
      },
      {
        flag: cueD[0].flag ? cueD[0].flag : cueButtons[3].flag,
        name: cueButtons[3].name,
        position: cueButtons[3].position,
      },
      {
        flag: cueE[0].flag ? cueE[0].flag : cueButtons[4].flag,
        name: cueType === "E" ? cueName : cueButtons[4].name,
        position:
          cueE[2].position && cueE[2].position > 0 ? cueE[2].position : cueButtons[4].position,
      },
    ],
  };

  // Unmountしたときにデータの中身をリセット
  const resetProjectDetail = {
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

  // シークタイムを設定
  const minSeekTime = new Date(position * 1000).toISOString().substr(14, 5);
  const maxSeekTime = new Date((duration - position) * 1000).toISOString().substr(14, 5);

  // 現在のリピートモードを取得するための変数
  let getCurrentRepeatMode;

  // ModalProjectSettingsを開いたときにトラックデータをリセットするためのオブジェクト
  const resetTrackData = {
    trackDataPath: "",
    trackTitle: "",
    artistName: "",
    artWorkPath: "",
    linkedMyProjects: [],
  };

  const setUpTrackPlayer = async () => {
    setTrackData = [
      {
        url: myProjectsDetail.trackDataPath,
        title: myProjectsDetail.trackTitle,
      },
    ];

    try {
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SeekTo,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
        notificationCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.reset();
      await TrackPlayer.add(setTrackData);
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const playStart = async () => {
    if (playbackState === State.Paused || playbackState === State.Ready) {
      await TrackPlayer.play();
      setStart(false);
      setPause(true);
    }
  };

  const controlStart = () => {
    playStart();
  };

  const controlPause = async () => {
    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
      console.log("controlPause!");
      setStart(true);
      setPause(false);
    }
  };

  const onPressGoBackHome = () => {
    console.log("onPressGoBackHome!");
    dispatch(showOverlay());
    dispatch(inactiveHidden());
    dispatch(showCenterModal());
    dispatch(setCenterModalTitle(TEXT.MODAL_TITLE_SAVE_PROJECT));
    dispatch(activeEditProjectModalFlag());
    controlPause();
  };

  const onPressOpenMenu = () => {
    console.log("onPressOpenMenu!");
    dispatch(showModalProjectSettings());
    dispatch(showOverlay());
    dispatch(inactiveHidden());
    dispatch(setModalProjectSettingsArtWorkPath(myProjectsDetail.artWorkPath));
    dispatch(setModalProjectSettingsTitle(myProjectsDetail.projectTitle));
    dispatch(setTrackDataFile([]));
    dispatch(setTrackListDetail(resetTrackData));
    setFormEditable(false);
    setTrackEditable(false);
  };

  const onValueChange = (value: number) => {
    setSliderValue(value);
  };

  const onSlidingStart = async () => {
    await TrackPlayer.pause();
  };

  const onSlidingCompleted = async (value: number) => {
    await TrackPlayer.seekTo(value);
    playStart();
  };

  const activateCue = async (cueType: string, cueName: string) => {
    if (cueType === "A" && cueName) {
      const getPositionA = await TrackPlayer.getPosition();
      console.log(cueType, cueName, getPositionA);
      dispatch(setCueA([{ flag: true }, { name: cueName }, { position: getPositionA }]));
    }

    if (cueType === "B" && cueName) {
      const getPositionB = await TrackPlayer.getPosition();
      console.log(cueType, cueName, getPositionB);
      dispatch(setCueB([{ flag: true }, { name: cueName }, { position: getPositionB }]));
    }

    if (cueType === "C" && cueName) {
      const getPositionC = await TrackPlayer.getPosition();
      console.log(cueType, cueName, getPositionC);
      dispatch(setCueC([{ flag: true }, { name: cueName }, { position: getPositionC }]));
    }

    if (cueType === "D" && cueName) {
      const getPositionD = await TrackPlayer.getPosition();
      console.log(cueType, cueName, getPositionD);
      dispatch(setCueD([{ flag: true }, { name: cueName }, { position: getPositionD }]));
    }

    if (cueType === "E" && cueName) {
      const getPositionE = await TrackPlayer.getPosition();
      console.log(cueType, cueName, getPositionE);
      dispatch(setCueE([{ flag: true }, { name: cueName }, { position: getPositionE }]));
    }

    // Cueのアクティビティをセット
    setCueActivity({ flag: true, name: cueName });
  };

  const playbackCue = async (cueType: string, cueName: string) => {
    if (cueType === "A" && cueName && cueA[2].position) {
      await TrackPlayer.seekTo(cueA[2].position);
    }

    if (cueType === "B" && cueName && cueB[2].position) {
      await TrackPlayer.seekTo(cueB[2].position);
    }

    if (cueType === "C" && cueName && cueC[2].position) {
      await TrackPlayer.seekTo(cueC[2].position);
    }

    if (cueType === "D" && cueName && cueD[2].position) {
      await TrackPlayer.seekTo(cueD[2].position);
    }

    if (cueType === "E" && cueName && cueE[2].position) {
      await TrackPlayer.seekTo(cueE[2].position);
    }

    // Cueのアクティビティをセット
    setCueActivity({ flag: true, name: cueName });
  };

  const inactivateCue = async (cueType: string, cueName: string) => {
    if (cueType === "A" && cueName) {
      console.log(cueType, cueName);
      dispatch(setCueA([{ flag: false }, { name: "" }, { position: 0 }]));
      getCurrentRepeatMode = await TrackPlayer.getRepeatMode();
      if (getCurrentRepeatMode === 1) {
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        setTrackRepeat(false);
        console.log("repeat off");
      }
    }

    if (cueType === "B" && cueName) {
      console.log(cueType, cueName);
      dispatch(setCueB([{ flag: false }, { name: "" }, { position: 0 }]));
    }

    if (cueType === "C" && cueName) {
      console.log(cueType, cueName);
      dispatch(setCueC([{ flag: false }, { name: "" }, { position: 0 }]));
    }

    if (cueType === "D" && cueName) {
      console.log(cueType, cueName);
      dispatch(setCueD([{ flag: false }, { name: "" }, { position: 0 }]));
    }

    if (cueType === "E" && cueName) {
      console.log(cueType, cueName);
      dispatch(setCueE([{ flag: false }, { name: "" }, { position: 0 }]));
    }

    // Cueのアクティビティをリセット
    setCueActivity({ flag: false, name: "" });
  };

  // CueNameを編集する
  const editCueName = (cueType: string, flag: boolean, name: string) => {
    // cueTypeとflagとnameがない場合はreturn
    if (!(cueType && flag && name)) return;
    dispatch(showOverlay());
    dispatch(inactiveHidden());
    dispatch(showEditCueNameTextField());
    console.log(cueType, flag, name);
    setCueType(cueType);
    setCueName(name);
  };

  // CueNameの編集を保存する
  const saveCueName = async (cueType: string) => {
    try {
      // 編集前の現在のプロジェクトデータを削除
      await updateDoc(docRef, {
        myProjectsData: arrayRemove({ ...myProjectsDetail }),
      });

      if (cueType === "A") {
        dispatch(setCueA([{ flag: true }, { name: cueName }, { position: cueA[2].position }]));
        await updateDoc(docRef, {
          myProjectsData: arrayUnion({ ...saveCueAProjectData }),
        });
      }

      if (cueType === "B") {
        dispatch(setCueB([{ flag: true }, { name: cueName }, { position: cueB[2].position }]));
        await updateDoc(docRef, {
          myProjectsData: arrayUnion({ ...saveCueBProjectData }),
        });
      }

      if (cueType === "C") {
        dispatch(setCueC([{ flag: true }, { name: cueName }, { position: cueC[2].position }]));
        await updateDoc(docRef, {
          myProjectsData: arrayUnion({ ...saveCueCProjectData }),
        });
      }

      if (cueType === "D") {
        dispatch(setCueD([{ flag: true }, { name: cueName }, { position: cueD[2].position }]));
        await updateDoc(docRef, {
          myProjectsData: arrayUnion({ ...saveCueDProjectData }),
        });
      }

      if (cueType === "E") {
        dispatch(setCueE([{ flag: true }, { name: cueName }, { position: cueE[2].position }]));
        await updateDoc(docRef, {
          myProjectsData: arrayUnion({ ...saveCueEProjectData }),
        });
      }

      setCueActivity({ flag: true, name: cueName });
    } catch (error: any) {
      console.log(error);
    } finally {
      // 保存したプロジェクトデータをstoreに保存
      if (cueType === "A") {
        dispatch(setMyProjectsDetail(saveCueAProjectData));
      }
      if (cueType === "B") {
        dispatch(setMyProjectsDetail(saveCueBProjectData));
      }
      if (cueType === "C") {
        dispatch(setMyProjectsDetail(saveCueCProjectData));
      }
      if (cueType === "D") {
        dispatch(setMyProjectsDetail(saveCueDProjectData));
      }
      if (cueType === "E") {
        dispatch(setMyProjectsDetail(saveCueEProjectData));
      }
      dispatch(hideOverlay());
      dispatch(activeHidden());
      dispatch(hideEditCueNameTextField());
    }
  };

  const controlTrackRepeat = async () => {
    getCurrentRepeatMode = await TrackPlayer.getRepeatMode();
    if (getCurrentRepeatMode === 0) {
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
      setTrackRepeat(true);
      console.log("repeat on");
    }
    if (getCurrentRepeatMode === 1) {
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      setTrackRepeat(false);
      console.log("repeat off");
    }
  };

  const controlCueRepeat = () => {
    console.log("controlCueRepeat!");
  };

  const controlAllCueReset = () => {
    dispatch(setCueA([{ flag: false }, { name: "" }, { position: 0 }]));
    dispatch(setCueB([{ flag: false }, { name: "" }, { position: 0 }]));
    dispatch(setCueC([{ flag: false }, { name: "" }, { position: 0 }]));
    dispatch(setCueD([{ flag: false }, { name: "" }, { position: 0 }]));
    dispatch(setCueE([{ flag: false }, { name: "" }, { position: 0 }]));
    setCueActivity({ flag: false, name: "" });
  };

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

  const playerReset = async () => {
    const tracks = await TrackPlayer.getCurrentTrack();
    if (tracks) {
      await TrackPlayer.remove(tracks);
    }
    setIsPlayerInitialized(false);
  };

  useEffect(() => {
    const playerInitialized = async () => {
      const isInit = await setUpTrackPlayer();
      setIsPlayerInitialized(isInit);
      await TrackPlayer.seekTo(0);
    };
    playerInitialized();
    getTrackListData();
    return () => {
      dispatch(setMyProjectsDetail(resetProjectDetail));
      playerReset();
    };
  }, []);

  const trackPlayerEvents = [
    Event.PlaybackState,
    Event.PlaybackQueueEnded,
    Event.PlaybackError,
    Event.PlaybackTrackChanged,
  ];

  const cueActivityEvent = (targetCue: any) => {
    targetCue.find((item: any) => {
      if (item.name === cueActivity.name) {
        console.log(item.name, cueActivity.name, targetCue[2].position);
        if (targetCue[2].position) {
          TrackPlayer.seekTo(targetCue[2].position);
          TrackPlayer.play();
          setStart(false);
          setPause(true);
        }
      }
    });
  };

  useTrackPlayerEvents(trackPlayerEvents, async (event) => {
    // RepeatMode.Trackを設定していない場合の処理
    if (
      event.type === Event.PlaybackQueueEnded &&
      !cueA[0].flag &&
      !cueB[0].flag &&
      !cueC[0].flag &&
      !cueD[0].flag &&
      !cueE[0].flag
    ) {
      setStart(true);
      setPause(false);
      await TrackPlayer.seekTo(0);
    }

    // RepeatMode.Trackを設定していた場合の処理
    if (
      event.type === Event.PlaybackState &&
      maxSeekTime === "00:00" &&
      (cueA[0].flag || cueB[0].flag || cueC[0].flag || cueD[0].flag || cueE[0].flag)
    ) {
      getCurrentRepeatMode = await TrackPlayer.getRepeatMode();
      console.log("getCurrentRepeatMode: ", getCurrentRepeatMode);
      if (getCurrentRepeatMode === 1) {
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        setTrackRepeat(false);
        console.log("repeat off");
      }
      cueActivityEvent(cueA);
      cueActivityEvent(cueB);
      cueActivityEvent(cueC);
      cueActivityEvent(cueD);
      cueActivityEvent(cueE);
    }
  });

  const settingsFormEditable = () => {
    setFormEditable(true);
  };

  const settingsTrackEditable = () => {
    setTrackEditable(true);
  };

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

  const selectTrackList = () => {
    dispatch(hideModalProjectSettings());
    dispatch(showModalPageSheet());
    dispatch(activeModalProjectSettingsSelectTrackList());
  };

  // テキストフォームリスト
  const formControlItems = [
    {
      label: TEXT.LABEL_INPUT_PROJECT_TITLE,
      placeholder: TEXT.PLACEHOLDER_PROJECT_TITLE,
      onChangeText: setProjectTitle,
      value: modalProjectSettingsProjectTitle,
      required: true,
      errorText: errorProjectTitle,
      editable: formEditable,
      onPressEditable: settingsFormEditable,
    },
    {
      label: TEXT.LABEL_INPUT_TRACK_DATA,
      placeholder: TEXT.PLACEHOLDER_NO_TRACK,
      value: trackDataFile.length
        ? trackDataFile[0]?.name
        : trackListDetailTitle.length
        ? trackListDetailTitle
        : myProjectsDetail.trackTitle,
      required: true,
      notes: TEXT.LABEL_NOTES_TRACK_DATA,
      editable: false,
      selectTextOnFocus: false,
      trackEditable,
      onPressEditable: settingsTrackEditable,
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

  const saveProjectSettings = async () => {
    console.log("ModalProjectSettings");
    setErrorProjectTitle("");
    validateProjectTitle(modalProjectSettingsProjectTitle, setErrorProjectTitle);

    // プロジェクトタイトルが未入力の場合は以下を実行不可とする
    if (!modalProjectSettingsProjectTitle) return;

    let artWorkDownloadUrl;
    let trackDataDownloadUrl;

    try {
      dispatch(setLoadingFullScreenMessage(TEXT.LOADING_MESSAGE_MODAL_PROJECT_SETTINGS));

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
          trackListData: arrayUnion({
            trackDataPath: trackDataDownloadUrl ? trackDataDownloadUrl : "",
            trackTitle: trackDataFile[0]?.name,
            artistName: "",
            artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : "",
            linkedMyProjects: [{ projectTitle }],
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
        await updateDoc(docRef, {
          myProjectsData: arrayRemove({ ...myProjectsDetail }),
        });

        // 編集後のプロジェクトデータを追加
        await updateDoc(docRef, {
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

      // 変更前のtrackListDataを削除
      console.log("trackListData arrayRemove");
      await updateDoc(docRef, {
        trackListData: arrayRemove({
          trackDataPath: myProjectsDetail.trackDataPath,
          trackTitle: myProjectsDetail.trackTitle,
          artistName: "",
          artWorkPath: myProjectsDetail.artWorkPath,
          linkedMyProjects: [
            {
              projectTitle: myProjectsDetail.projectTitle,
            },
          ],
        }),
      });

      // trackDataFileもしくはtrackListDetailTitleを変更したときにtrackListDataを新規追加
      if (trackDataFile.length || trackListDetailTitle.length) {
        console.log("trackDataFile.length || trackListDetailTitle.length updateDoc");
        // プロジェクトからトラックデータが移行された場合に、変更前のトラックデータにprojectTitleをnullにした場合のtrackListDataを新規追加
        await updateDoc(docRef, {
          trackListData: arrayUnion({
            trackDataPath: myProjectsDetail.trackDataPath,
            trackTitle: myProjectsDetail.trackTitle,
            artistName: "",
            artWorkPath: myProjectsDetail.artWorkPath,
            linkedMyProjects: [
              {
                projectTitle: "",
              },
            ],
          }),
        });

        await updateDoc(docRef, {
          trackListData: arrayUnion({
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
            linkedMyProjects: [
              {
                projectTitle: modalProjectSettingsProjectTitle.length
                  ? modalProjectSettingsProjectTitle
                  : myProjectsDetail.projectTitle
                  ? myProjectsDetail.projectTitle
                  : "",
              },
            ],
          }),
        });
      }

      // アートワークもしくはプロジェクトタイトルのみ変更した場合の処理
      if (
        (artWork.length || modalProjectSettingsProjectTitle.length) &&
        !trackDataFile.length &&
        !trackListDetailTitle.length
      ) {
        console.log("only artWork projectTitle updateDoc");
        await updateDoc(docRef, {
          trackListData: arrayUnion({
            trackDataPath: myProjectsDetail.trackDataPath,
            trackTitle: myProjectsDetail.trackTitle,
            artistName: "",
            artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : myProjectsDetail.artWorkPath,
            linkedMyProjects: [
              {
                projectTitle: modalProjectSettingsProjectTitle.length
                  ? modalProjectSettingsProjectTitle
                  : myProjectsDetail.projectTitle
                  ? myProjectsDetail.projectTitle
                  : "",
              },
            ],
          }),
        });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
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
                trackDataFile.length || trackListDetailTitle.length ? "Cue A" : cueButtons[0].name,
              position:
                trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[0].position,
            },
            {
              flag:
                trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[1].flag,
              name:
                trackDataFile.length || trackListDetailTitle.length ? "Cue B" : cueButtons[1].name,
              position:
                trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[1].position,
            },
            {
              flag:
                trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[2].flag,
              name:
                trackDataFile.length || trackListDetailTitle.length ? "Cue C" : cueButtons[2].name,
              position:
                trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[2].position,
            },
            {
              flag:
                trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[3].flag,
              name:
                trackDataFile.length || trackListDetailTitle.length ? "Cue D" : cueButtons[3].name,
              position:
                trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[3].position,
            },
            {
              flag:
                trackDataFile.length || trackListDetailTitle.length ? false : cueButtons[4].flag,
              name:
                trackDataFile.length || trackListDetailTitle.length ? "Cue E" : cueButtons[4].name,
              position:
                trackDataFile.length || trackListDetailTitle.length ? 0 : cueButtons[4].position,
            },
          ],
        })
      );
      // 新しいトラックがアップロードされた場合に実行
      if (trackDataFile.length) {
        controlAllCueReset();
      }
      dispatch(hideModalProjectSettings());
      dispatch(hideOverlay());
      dispatch(setProjectSettingsTitle(modalProjectSettingsProjectTitle));
      dispatch(hideLoadingFullScreen());
    }
  };

  const activeCenterModalProjectSettings = () => {
    dispatch(showCenterModalProjectSettings());
    dispatch(activeProjectSettingsModalFlag());
    dispatch(setCenterModalProjectSettingsMessage(TEXT.CENTER_MODAL_MESSAGE_PROJECT_SETTINGS));
    dispatch(setCenterModalProjectSettingsTrackTitle(trackDataFile[0]?.name));
    dispatch(setCenterModalProjectSettingsNotes(TEXT.MODAL_DESC_OVERWRITE_TRACK_DATA_NOTE));
  };

  // ModalProjectSettingsの編集を保存する
  const projectSettingsSavingHandler = () => {
    dispatch(showLoadingFullScreen());
    dispatch(setLoadingFullScreenMessage(TEXT.LOADING_MESSAGE_MODAL_PROJECT_SETTINGS));
    if (trackListItems.length) {
      // トラックデータの中にすでに同じ名前のファイルが存在するかどうか
      const result = trackListItems.some((item) => {
        return item.trackTitle === trackDataFile[0]?.name;
      });

      if (result) {
        activeCenterModalProjectSettings();
      } else {
        saveProjectSettings();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <EditProjectHeader
          onPressHomeButton={onPressGoBackHome}
          onPressMenuButton={onPressOpenMenu}
        />
        <ScrollView>
          <TextEditor projectTitle={myProjectsDetail.projectTitle} lyric={myProjectsDetail.lyric} />
          <TimeSeekBar
            minSeekTime={minSeekTime}
            maxSeekTime={maxSeekTime}
            onValueChange={onValueChange}
            onSlidingStart={onSlidingStart}
            onSlidingCompleted={onSlidingCompleted}
          />
          <View style={styles.cue_buttons_wrap}>
            <CueButtons
              onPressActivateCue={activateCue}
              onPressPlaybackCue={playbackCue}
              onPressInactivateCue={inactivateCue}
              onLongPressEvent={editCueName}
            />
          </View>
          <View style={styles.cue_control_player_wrap}>
            <CueControlPlayer
              start={start}
              pause={pause}
              cueActivity={cueActivity}
              trackRepeat={trackRepeat}
              onPressStart={controlStart}
              onPressPause={controlPause}
              onPressTrackRepeat={controlTrackRepeat}
              onPressCueRepeat={controlCueRepeat}
              onPressAllCueReset={controlAllCueReset}
            />
          </View>
          <VolumeSeekBar />
        </ScrollView>
      </View>
      <Overlay isShow={overlay} />
      <EditCueNameTextField
        isShow={editCueNameTextField}
        value={cueName}
        cueType={cueType}
        onChangeText={(event) => setCueName(event)}
        onPressSave={saveCueName}
      />
      <ModalPageSheet trackListDataItems={trackListItems} />
      <ModalProjectSettings
        modalTitle={TEXT.MODAL_TITLE_PROJECT_SETTINGS}
        modalDescription={TEXT.MODAL_DESC_PROJECT_SETTINGS}
        formControlItems={formControlItems}
        controlButtonItems={controlButtonItems}
        buttonText={TEXT.BUTTON_SAVE_PROJECT}
        submitEvent={projectSettingsSavingHandler}
      />
      <CenterModal isShow={centerModal} navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default EditProject;
