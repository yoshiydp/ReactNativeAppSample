import React, { useState, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import TrackPlayer, { Capability, Event } from "react-native-track-player";
import { useProgress } from "react-native-track-player/lib/hooks";
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";
import { setMyProjectsDetail } from "store/MyProjectsDetailSlice";

// Components
import Icon from "components/atoms/Icon";

// Interfaces
import { MyProjectsDetailType } from "interfaces/myProjectsInterface";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";

// Styles
import styles from "./CueControlPlayer.scss";

interface Props {
  trackDataPath: string;
}

const CueControlPlayer = (props: Props) => {
  const dispatch = useDispatch();
  const myProjectsDetail = useSelector((state) => state.myProjectsDetail);
  const [start, setStart] = useState<boolean>(true);
  const [pause, setPause] = useState<boolean>(false);

  TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
      Capability.SeekTo,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });

  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(props.trackDataPath);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setUpTrackPlayer();
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  const onPressPlayStart = async () => {
    console.log("onPressStart!");
    setStart(false);
    setPause(true);
    await TrackPlayer.play();
  };

  const onPressPause = () => {
    console.log("onPressPause!");
    setStart(true);
    setPause(false);
  };

  const onPressRepeat = () => {
    console.log("onPressRepeat!");
  };

  const onPressAllCueReset = () => {
    console.log("onPressAllCueReset!");
  };

  return (
    <View style={styles["container"]}>
      <Pressable style={styles["repeat-button"]} onPress={onPressRepeat}>
        <Text style={styles["repeat-button__text"]}>Cue A</Text>
        <Icon
          svgType={1}
          width="24"
          height="27.469"
          viewBox="0 0 24 27.469"
          gTransform="translate(-28.829 0)"
          pathD1={SVGPATH.ICON_REPEAT_PATH1}
          pathTransform1="translate(-290.911)"
          pathD2={SVGPATH.ICON_REPEAT_PATH2}
          pathTransform2="translate(-0.659 -58.753)"
          pathD3={SVGPATH.ICON_REPEAT_PATH3}
          pathTransform3="translate(-0.001 -213.844)"
          pathD4={SVGPATH.ICON_REPEAT_PATH4}
          pathTransform4="translate(0 -286.352)"
          pathFill={COLOR.COLOR_WHITE_BASE}
          containerStyle={styles["icon-repeat"]}
        />
      </Pressable>
      <View>
        {start && (
          <Pressable style={styles["play-button"]} onPress={onPressPlayStart}>
            <Icon
              svgType={1}
              width="17"
              height="18.867"
              viewBox="0 0 17 18.867"
              gTransform="translate(-8.107 0)"
              pathD1={SVGPATH.ICON_PLAY_EDIT_PROJECT}
              pathTransform1="translate(0 0)"
              pathFill={COLOR.COLOR_WHITE_BASE}
              containerStyle={styles["icon-start"]}
            />
          </Pressable>
        )}
        {pause && (
          <Pressable style={styles["play-button"]} onPress={onPressPause}>
            <Icon
              svgType={8}
              width="18"
              height="20.118"
              viewBox="0 0 18 20.118"
              gTransform="translate(-8.107 0)"
              rectWidth="7.412"
              rectHeight="20.118"
              rectRx="1"
              rectTransform1="translate(7 5)"
              rectTransform2="translate(17.588 5)"
              pathFill={COLOR.COLOR_WHITE_BASE}
              containerStyle={styles["icon-pause"]}
            />
          </Pressable>
        )}
      </View>
      <Pressable style={styles["cue-reset-button"]} onPress={onPressAllCueReset}>
        <Text style={styles["cue-reset-button__text"]}>All Cue Reset</Text>
      </Pressable>
    </View>
  );
};

export default CueControlPlayer;
