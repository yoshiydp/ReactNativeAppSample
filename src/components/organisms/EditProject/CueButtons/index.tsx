import React, { useState, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";

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
  const doubleTapCueARef = useRef(null);
  const doubleTapCueBRef = useRef(null);
  const doubleTapCueCRef = useRef(null);
  const doubleTapCueDRef = useRef(null);
  const doubleTapCueERef = useRef(null);

  const onPressActiveCueA = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueA(true);
    }
  };

  const onDoubleTapResetCueA = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueA(false);
    }
  };

  const onLongPressCueA = () => {
    console.log("onLongPressCueA!");
  };

  const onPressActiveCueB = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueB(true);
    }
  };

  const onDoubleTapResetCueB = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueB(false);
    }
  };

  const onLongPressCueB = () => {
    console.log("onLongPressCueB!");
  };

  const onPressActiveCueC = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueC(true);
    }
  };

  const onDoubleTapResetCueC = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueC(false);
    }
  };

  const onLongPressCueC = () => {
    console.log("onLongPressCueC!");
  };

  const onPressActiveCueD = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueD(true);
    }
  };

  const onDoubleTapResetCueD = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueD(false);
    }
  };

  const onLongPressCueD = () => {
    console.log("onLongPressCueD!");
  };

  const onPressActiveCueE = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueE(true);
    }
  };

  const onDoubleTapResetCueE = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueE(false);
    }
  };

  const onLongPressCueE = () => {
    console.log("onLongPressCueE!");
  };

  return (
    <View style={styles["container"]}>
      <TapGestureHandler onHandlerStateChange={onPressActiveCueA} waitFor={doubleTapCueARef}>
        <TapGestureHandler
          ref={doubleTapCueARef}
          onHandlerStateChange={onDoubleTapResetCueA}
          numberOfTaps={2}
        >
          <Pressable
            onLongPress={onLongPressCueA}
            style={cueA ? styles["buttonItem--firstActive"] : styles["buttonItem--first"]}
          >
            <Text style={styles["text"]}>Cue A</Text>
          </Pressable>
        </TapGestureHandler>
      </TapGestureHandler>
      <TapGestureHandler onHandlerStateChange={onPressActiveCueB} waitFor={doubleTapCueBRef}>
        <TapGestureHandler
          ref={doubleTapCueBRef}
          onHandlerStateChange={onDoubleTapResetCueB}
          numberOfTaps={2}
        >
          <Pressable
            onLongPress={onLongPressCueB}
            style={cueB ? styles["buttonItem--active"] : styles["buttonItem"]}
          >
            <Text style={styles["text"]}>Cue B</Text>
          </Pressable>
        </TapGestureHandler>
      </TapGestureHandler>
      <TapGestureHandler onHandlerStateChange={onPressActiveCueC} waitFor={doubleTapCueCRef}>
        <TapGestureHandler
          ref={doubleTapCueCRef}
          onHandlerStateChange={onDoubleTapResetCueC}
          numberOfTaps={2}
        >
          <Pressable
            onLongPress={onLongPressCueC}
            style={cueC ? styles["buttonItem--active"] : styles["buttonItem"]}
          >
            <Text style={styles["text"]}>Cue C</Text>
          </Pressable>
        </TapGestureHandler>
      </TapGestureHandler>
      <TapGestureHandler onHandlerStateChange={onPressActiveCueD} waitFor={doubleTapCueDRef}>
        <TapGestureHandler
          ref={doubleTapCueDRef}
          onHandlerStateChange={onDoubleTapResetCueD}
          numberOfTaps={2}
        >
          <Pressable
            onLongPress={onLongPressCueD}
            style={cueD ? styles["buttonItem--active"] : styles["buttonItem"]}
          >
            <Text style={styles["text"]}>Cue D</Text>
          </Pressable>
        </TapGestureHandler>
      </TapGestureHandler>
      <TapGestureHandler onHandlerStateChange={onPressActiveCueE} waitFor={doubleTapCueERef}>
        <TapGestureHandler
          ref={doubleTapCueERef}
          onHandlerStateChange={onDoubleTapResetCueE}
          numberOfTaps={2}
        >
          <Pressable
            onLongPress={onLongPressCueE}
            style={cueE ? styles["buttonItem--active"] : styles["buttonItem"]}
          >
            <Text style={styles["text"]}>Cue E</Text>
          </Pressable>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default CueButtons;
