import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useProgress } from "react-native-track-player";
import { Slider, Icon } from "@rneui/themed";

// Store
import { useSelector } from "store/index";

// Components
import CuePoint from "components/molecules/CuePoint";

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
  const cueA = useSelector((state) => state.cueButtons.cueA);
  const cueB = useSelector((state) => state.cueButtons.cueB);
  const cueC = useSelector((state) => state.cueButtons.cueC);
  const cueD = useSelector((state) => state.cueButtons.cueD);
  const cueE = useSelector((state) => state.cueButtons.cueE);

  useEffect(() => {
    console.log(
      cueA[2].position,
      cueB[2].position,
      cueC[2].position,
      cueD[2].position,
      cueE[2].position
    );
  }, []);

  return (
    <View style={styles.container}>
      {cueA[0].flag && cueA[2].position != 0 && (
        <CuePoint name={cueA[1].name} position={cueA[2].position} />
      )}
      {cueB[0].flag && cueB[2].position != 0 && (
        <CuePoint name={cueB[1].name} position={cueB[2].position} />
      )}
      {cueC[0].flag && cueC[2].position != 0 && (
        <CuePoint name={cueC[1].name} position={cueC[2].position} />
      )}
      {cueD[0].flag && cueD[2].position != 0 && (
        <CuePoint name={cueD[1].name} position={cueD[2].position} />
      )}
      {cueE[0].flag && cueE[2].position != 0 && (
        <CuePoint name={cueE[1].name} position={cueE[2].position} />
      )}
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
