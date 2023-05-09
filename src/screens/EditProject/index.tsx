import React, { useState, useEffect } from "react";
import { Animated, View, ScrollView, Text } from "react-native";
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
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";
import { setCueA, setCueB, setCueC, setCueD, setCueE } from "store/CueButtonsSlice";
import {
  showCenterModal,
  setCenterModalTitle,
  setCenterModalDataTitle,
  setCenterModalNotes,
  setCenterModalSubmitButtonText,
} from "store/CenterModalSlice";
import { showOverlay, hideOverlay, activeHidden, inactiveHidden } from "store/OverlaySlice";
import { showModalProjectSettings } from "store/ModalProjectSettingsSlice";
import { activeEditProjectModalFlag } from "store/EditProjectModalFlagSlice";
import {
  showEditCueNameTextField,
  hideEditCueNameTextField,
  setCueName,
} from "store/EditCueNameTextFieldSlice";

// Components
import TextEditor from "components/organisms/TextEditor";
import TimeSeekBar from "components/organisms/TimeSeekBar";
import CueButtons from "components/organisms/EditProject/CueButtons";
import CueControlPlayer from "components/organisms/EditProject/CueControlPlayer";
import VolumeSeekBar from "components/organisms/EditProject/VolumeSeekBar";
import CenterModal from "components/organisms/CenterModal";
import ModalProjectSettings from "components/organisms/Modal/ModalProjectSettings";
import EditCueNameTextField from "components/molecules/EditCueNameTextField";
import EditProjectHeader from "components/molecules/EditProjectHeader";
import Overlay from "components/atoms/Overlay";

// Constants
import * as TEXT from "constants/text";

// Interfaces
import { SetCueActivityType } from "interfaces/cueButtonsInterface";

// Styles
import styles from "./EditProject.scss";

interface Props {
  navigation: any;
}

const EditProject = (props: Props) => {
  const dispatch = useDispatch();
  const overlay = useSelector((state) => state.overlay.overlay);
  const activeHiddenState = useSelector((state) => state.overlay.inactiveHidden);
  const myProjectsDetail = useSelector((state) => state.myProjectsDetail);
  const editCueNameTextField = useSelector(
    (state) => state.editCueNameTextField.editCueNameTextField
  );
  const centerModal = useSelector((state) => state.centerModal.centerModal);
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [start, setStart] = useState<boolean>(true);
  const [pause, setPause] = useState<boolean>(false);
  const [cueActivity, setCueActivity] = useState<SetCueActivityType>({ flag: false, name: "" });
  const [trackRepeat, setTrackRepeat] = useState<boolean>(false);

  // トラックデータの情報を格納
  const setTrackData = [
    {
      url: myProjectsDetail.trackDataPath,
      title: myProjectsDetail.trackTitle,
    },
  ];

  // シークタイムを設定
  const minSeekTime = new Date(position * 1000).toISOString().substr(14, 5);
  const maxSeekTime = new Date((duration - position) * 1000).toISOString().substr(14, 5);

  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [Capability.Play, Capability.Pause, Capability.SeekTo],
        compactCapabilities: [Capability.Play, Capability.Pause],
        notificationCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add(setTrackData);
    } catch (e) {
      console.log(e);
    }
  };

  const onPressGoBackHome = () => {
    console.log("onPressGoBackHome!");
    dispatch(showOverlay());
    dispatch(inactiveHidden());
    dispatch(showCenterModal());
    dispatch(setCenterModalTitle(TEXT.MODAL_TITLE_SAVE_PROJECT));
    dispatch(activeEditProjectModalFlag());
  };

  const onPressOpenMenu = () => {
    console.log("onPressOpenMenu!");
    dispatch(showModalProjectSettings());
  };

  const onValueChange = (value: number) => {
    setSliderValue(value);
  };

  const onSlidingStart = async () => {
    await TrackPlayer.pause();
  };

  const playStart = async () => {
    if (playbackState === State.Paused || playbackState === State.Ready) {
      await TrackPlayer.play();
      setStart(false);
      setPause(true);
    }
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

  const inactivateCue = (cueType: string, cueName: string) => {
    if (cueType === "A" && cueName) {
      console.log(cueType, cueName);
      dispatch(setCueA([{ flag: false }, { name: "" }, { position: 0 }]));
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

  const editCueName = (flag: boolean, name: string) => {
    dispatch(showOverlay());
    dispatch(inactiveHidden());
    dispatch(showEditCueNameTextField());
    console.log(flag, name);

    // flagとnameがない場合はreturn
    if (!(flag && name)) return;

    if (flag) dispatch(setCueName(name));
  };

  const saveCueName = () => {
    dispatch(hideOverlay());
    dispatch(activeHidden());
    dispatch(setCueName(""));
    dispatch(hideEditCueNameTextField());
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

  const controlTrackRepeat = async () => {
    const getCurrentRepeatMode = await TrackPlayer.getRepeatMode();
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

  useEffect(() => {
    TrackPlayer.setupPlayer({
      waitForBuffer: true,
    });
    setUpTrackPlayer();
    return () => {
      controlPause();
      TrackPlayer.reset();
    };
  }, []);

  const trackPlayerEvents = [Event.PlaybackState, Event.PlaybackQueueEnded, Event.PlaybackError];

  useTrackPlayerEvents(trackPlayerEvents, async (event) => {
    if (event.type === Event.PlaybackQueueEnded) {
      setStart(true);
      setPause(false);
      await TrackPlayer.seekTo(0);
    }
  });

  return (
    <View style={styles.container}>
      <View>
        <EditProjectHeader
          onPressHomeButton={onPressGoBackHome}
          onPressMenuButton={onPressOpenMenu}
        />
        <TextEditor projectTitle={myProjectsDetail.projectTitle} lyric={myProjectsDetail.lyric} />
        <TimeSeekBar
          minSeekTime={minSeekTime}
          maxSeekTime={maxSeekTime}
          onValueChange={onValueChange}
          onSlidingStart={onSlidingStart}
          onSlidingCompleted={onSlidingCompleted}
        />
        <View style={styles["cue-buttons-wrap"]}>
          <CueButtons
            onPressActivateCue={activateCue}
            onPressInactivateCue={inactivateCue}
            onLongPressEvent={editCueName}
          />
        </View>
        <View style={styles["cue-control-player-wrap"]}>
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
      </View>
      <Overlay isShow={overlay} />
      <EditCueNameTextField isShow={editCueNameTextField} onPressSave={saveCueName} />
      <ModalProjectSettings />
      <CenterModal isShow={centerModal} navigation={props.navigation} />
    </View>
  );
};

export default EditProject;
