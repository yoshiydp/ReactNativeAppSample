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
// import { useProgress } from "react-native-track-player/lib/hooks";
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";
import { setMyProjectsDetail } from "store/MyProjectsDetailSlice";
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
import EditProjectPlayer from "components/templates/EditProjectPlayer";
import EditCueNameTextField from "components/molecules/EditCueNameTextField";
import TextEditor from "components/organisms/TextEditor";
import TimeSeekBar from "components/organisms/TimeSeekBar";
import CueButtons from "components/organisms/EditProject/CueButtons";
import CueControlPlayer from "components/organisms/EditProject/CueControlPlayer";
import VolumeSeekBar from "components/organisms/EditProject/VolumeSeekBar";
import CenterModal from "components/organisms/CenterModal";
import ModalProjectSettings from "components/organisms/Modal/ModalProjectSettings";
import EditProjectHeader from "components/molecules/EditProjectHeader";
import Overlay from "components/atoms/Overlay";

// Constants
import * as TEXT from "constants/text";

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
    (state) => state.editCueNameTextField.editCueNameTextField,
  );
  const centerModal = useSelector((state) => state.centerModal.centerModal);
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();

  const [sliderValue, setSliderValue] = useState<number>(0);
  const [start, setStart] = useState<boolean>(true);
  const [pause, setPause] = useState<boolean>(false);

  // トラックデータの情報を格納
  const setTrackData = [
    {
      url: myProjectsDetail.trackDataPath,
      title: myProjectsDetail.trackTitle,
    },
  ];

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

  useEffect(() => {
    TrackPlayer.setupPlayer({
      waitForBuffer: true,
    });
    setUpTrackPlayer();
    return () => {
      TrackPlayer.reset();
    };
  }, []);

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

  const controlStart = async () => {
    if (playbackState === State.Paused || playbackState === State.Ready) {
      await TrackPlayer.play();
      console.log("controlStart!");
      setStart(false);
      setPause(true);
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

  const controlRepeat = () => {
    console.log("controlRepeat!");
  };

  const controlAllCueReset = () => {
    console.log("controlAllCueReset!");
  };

  const onValueChange = (value: number) => {
    setSliderValue(value);
  };

  const onSlidingStart = async () => {
    await TrackPlayer.pause();
  };

  const onSlidingCompleted = async (value: number) => {
    await TrackPlayer.play();
    await TrackPlayer.seekTo(value);
  };

  return (
    <View style={styles["container"]}>
      <View>
        <EditProjectHeader
          onPressHomeButton={onPressGoBackHome}
          onPressMenuButton={onPressOpenMenu}
        />
        <TextEditor projectTitle={myProjectsDetail.projectTitle} lyric={myProjectsDetail.lyric} />
        <TimeSeekBar
          minSeekTime={new Date(position * 1000).toISOString().substr(14, 5)}
          maxSeekTime={new Date((duration - position) * 1000).toISOString().substr(14, 5)}
          onValueChange={onValueChange}
          onSlidingStart={onSlidingStart}
          onSlidingCompleted={onSlidingCompleted}
        />
        <View style={styles["cue-buttons-wrap"]}>
          <CueButtons onLongPressEvent={editCueName} />
        </View>
        <View style={styles["cue-control-player-wrap"]}>
          <CueControlPlayer
            start={start}
            pause={pause}
            onPressStart={controlStart}
            onPressPause={controlPause}
            onPressRepeat={controlRepeat}
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
