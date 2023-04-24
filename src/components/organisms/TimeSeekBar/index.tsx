import React from "react";
import { View } from "react-native";
import { useProgress } from "react-native-track-player";
import { Slider, Text, Icon } from "@rneui/themed";

// Constants
import * as COLOR from "constants/color";

// Styles
import styles from "./TimeSeekBar.scss";

interface Props {
  minSeekTime: string;
  maxSeekTime: string;
  onValueChange: (value: number) => void;
  onSlidingStart: () => void;
  onSlidingCompleted: (value: number) => void;
  setCueA: [{ flag: boolean }, { name: string }, { position: number }];
  setCueB: [{ flag: boolean }, { name: string }, { position: number }];
  setCueC: [{ flag: boolean }, { name: string }, { position: number }];
  setCueD: [{ flag: boolean }, { name: string }, { position: number }];
  setCueE: [{ flag: boolean }, { name: string }, { position: number }];
}

const TimeSeekBar = (props: Props) => {
  const progress = useProgress();

  return (
    <View style={styles["container"]}>
      <Slider
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        minimumTrackTintColor={COLOR.COLOR_GREEN_BASE}
        maximumTrackTintColor={COLOR.COLOR_GRAY_TYPE3}
        onValueChange={(value: number) => {
          props.onValueChange(value);
        }}
        onSlidingStart={props.onSlidingStart}
        onSlidingComplete={(value: number) => {
          props.onSlidingCompleted(value);
        }}
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
        <Text style={styles["seek-time"]}>{props.minSeekTime}</Text>
        <Text style={styles["seek-time"]}>{props.maxSeekTime}</Text>
      </View>
    </View>
  );
};

export default TimeSeekBar;
