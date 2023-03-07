import React, { useRef, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import TrackPlayer, { Capability, Event } from "react-native-track-player";
import { useProgress } from "react-native-track-player/lib/hooks";
// import Slider from "@react-native-community/slider";
import { Slider, Text, Icon } from "@rneui/themed";

// Constants
import * as COLOR from "constants/color";

// Styles
import styles from "./SeekBar.scss";

const SeekBar = () => {
  const [displayNone, setDisplayNone] = useState(false);
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
        minimumTrackTintColor={COLOR.COLOR_GREEN_BASE}
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
              containerStyle={styles["icon-style"]}
              color={COLOR.COLOR_GREEN_BASE}
            />
          ),
        }}
      />
      <View style={styles["seek-time-wrap"]}>
        <Text style={styles["seek-time"]}>
          {new Date(position * 1000).toISOString().substr(14, 5)}
        </Text>
        <Text style={styles["seek-time"]}>
          {new Date((duration - position) * 1000).toISOString().substr(14, 5)}
        </Text>
      </View>
    </View>
  );
};

export default SeekBar;
