import React, { useRef, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import TrackPlayer, { Capability, Event } from "react-native-track-player";
import { useProgress } from "react-native-track-player/lib/hooks";
// import Slider from "@react-native-community/slider";
import { Slider, Text, Icon } from "@rneui/themed";

// Components
import SvgIcon from "components/atoms/Icon";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";

// Styles
import styles from "./VolumeSeekBar.scss";

const VolumeSeekBar = () => {
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const { position, duration } = useProgress(250);

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

  useEffect(() => {
    setUpTrackPlayer();
    setSliderValue;
    return () => {
      // TrackPlayer.destroy();
    };
  }, []);

  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      // await TrackPlayer.add(tracks);
    } catch (e) {
      console.log(e);
    }
  };

  const slidingStarted = () => {
    setIsSeeking(true);
  };

  // Seekbar setting
  const slidingCompleted = async (value: number) => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };

  const playStart = async () => {
    await TrackPlayer.play();
  };

  return (
    <View style={styles["container"]}>
      {/* <Slider
        style={styles.progressBar}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        thumbSize={15}
        minimumTrackTintColor={COLOR.COLOR_GREEN_BASE}
        maximumTrackTintColor={COLOR.COLOR_GRAY_TYPE3}
        onSlidingStart={slidingStarted}
        onSlidingComplete={slidingCompleted}
      /> */}
      <Slider
        value={sliderValue}
        onValueChange={setSliderValue}
        maximumValue={1}
        minimumValue={0}
        minimumTrackTintColor={COLOR.COLOR_GRAY_TYPE1}
        maximumTrackTintColor={COLOR.COLOR_GRAY_TYPE3}
        step={0}
        allowTouchTrack
        onSlidingStart={slidingStarted}
        onSlidingComplete={slidingCompleted}
        trackStyle={styles["track-style"]}
        thumbStyle={styles["thumb-style"]}
        thumbProps={{
          children: (
            <Icon
              size={6}
              reverse
              containerStyle={styles["icon-thumb-style"]}
              color={COLOR.COLOR_GRAY_TYPE1}
            />
          ),
        }}
      />
      <View style={styles["seek-time-wrap"]}></View>
      <SvgIcon
        svgType={1}
        width="8"
        height="11.248"
        viewBox="0 0 8 11.248"
        gTransform="translate(0 -14.318)"
        pathD1={SVGPATH.ICON_SPEAKER_LOW}
        pathFill={COLOR.COLOR_GRAY_TYPE1}
        containerStyle={styles["icon-speaker-low-style"]}
      />
      <SvgIcon
        svgType={1}
        width="16"
        height="12.711"
        viewBox="0 0 16 12.711"
        gTransform="translate(0 -9.565)"
        pathD1={SVGPATH.ICON_SPEAKER}
        pathFill={COLOR.COLOR_GRAY_TYPE1}
        containerStyle={styles["icon-speaker-style"]}
      />
    </View>
  );
};

export default VolumeSeekBar;
