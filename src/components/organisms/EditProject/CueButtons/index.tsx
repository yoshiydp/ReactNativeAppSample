import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

// Constants
import * as COLOR from "constants/color";

// Styles
import styles from "./CueButtons.scss";

const CueButtons = () => {
  const [cueA, setCueA] = useState<boolean>(false);
  const [cueB, setCueB] = useState<boolean>(false);
  const [cueC, setCueC] = useState<boolean>(false);
  const [cueD, setCueD] = useState<boolean>(false);
  const [cueE, setCueE] = useState<boolean>(false);

  const onPressActiveCueA = () => {
    console.log("onPressActiveCueA!");
    setCueA(true);
  };

  const onLongPressResetCueA = () => {
    console.log("onLongPressResetCueA!");
    setCueA(false);
  };

  const onPressActiveCueB = () => {
    console.log("onPressActiveCueB!");
    setCueB(true);
  };

  const onLongPressResetCueB = () => {
    console.log("onLongPressResetCueB!");
    setCueB(false);
  };

  const onPressActiveCueC = () => {
    console.log("onPressActiveCueC!");
    setCueC(true);
  };

  const onLongPressResetCueC = () => {
    console.log("onLongPressResetCueC!");
    setCueC(false);
  };

  const onPressActiveCueD = () => {
    console.log("onPressActiveCueD!");
    setCueD(true);
  };

  const onLongPressResetCueD = () => {
    console.log("onLongPressResetCueD!");
    setCueD(false);
  };

  const onPressActiveCueE = () => {
    console.log("onPressActiveCueE!");
    setCueE(true);
  };

  const onLongPressResetCueE = () => {
    console.log("onLongPressResetCueE!");
    setCueE(false);
  };

  return (
    <View style={styles["container"]}>
      <Pressable
        style={cueA ? styles["buttonItem--firstActive"] : styles["buttonItem--first"]}
        onPress={onPressActiveCueA}
        onLongPress={onLongPressResetCueA}
      >
        <Text style={styles["text"]}>Cue A</Text>
      </Pressable>
      <Pressable
        style={cueB ? styles["buttonItem--active"] : styles["buttonItem"]}
        onPress={onPressActiveCueB}
        onLongPress={onLongPressResetCueB}
      >
        <Text style={styles["text"]}>Cue B</Text>
      </Pressable>
      <Pressable
        style={cueC ? styles["buttonItem--active"] : styles["buttonItem"]}
        onPress={onPressActiveCueC}
        onLongPress={onLongPressResetCueC}
      >
        <Text style={styles["text"]}>Cue C</Text>
      </Pressable>
      <Pressable
        style={cueD ? styles["buttonItem--active"] : styles["buttonItem"]}
        onPress={onPressActiveCueD}
        onLongPress={onLongPressResetCueD}
      >
        <Text style={styles["text"]}>Cue D</Text>
      </Pressable>
      <Pressable
        style={cueE ? styles["buttonItem--active"] : styles["buttonItem"]}
        onPress={onPressActiveCueE}
        onLongPress={onLongPressResetCueE}
      >
        <Text style={styles["text"]}>Cue E</Text>
      </Pressable>
    </View>
  );
};

export default CueButtons;
