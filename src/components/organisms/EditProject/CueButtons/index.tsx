import React, { useState, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";

// Styles
import styles from "./CueButtons.scss";

interface Props {
  onLongPressEvent: (flag: boolean, name: string) => void;
}

interface CueTypes {
  flag: boolean;
  name: string;
}

const CueButtons = (props: Props) => {
  const [cueA, setCueA] = useState<CueTypes>({ flag: false, name: "" });
  const [cueB, setCueB] = useState<CueTypes>({ flag: false, name: "" });
  const [cueC, setCueC] = useState<CueTypes>({ flag: false, name: "" });
  const [cueD, setCueD] = useState<CueTypes>({ flag: false, name: "" });
  const [cueE, setCueE] = useState<CueTypes>({ flag: false, name: "" });
  const doubleTapCueARef = useRef(null);
  const doubleTapCueBRef = useRef(null);
  const doubleTapCueCRef = useRef(null);
  const doubleTapCueDRef = useRef(null);
  const doubleTapCueERef = useRef(null);

  const onPressActiveCueA = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueA({ flag: true, name: "cueA" });
    }
  };

  const onDoubleTapResetCueA = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueA({ flag: false, name: "" });
    }
  };

  const onPressActiveCueB = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueB({ flag: true, name: "cueB" });
    }
  };

  const onDoubleTapResetCueB = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueB({ flag: false, name: "" });
    }
  };

  const onPressActiveCueC = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueC({ flag: true, name: "cueC" });
    }
  };

  const onDoubleTapResetCueC = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueC({ flag: false, name: "" });
    }
  };

  const onPressActiveCueD = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueD({ flag: true, name: "cueD" });
    }
  };

  const onDoubleTapResetCueD = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueD({ flag: false, name: "" });
    }
  };

  const onPressActiveCueE = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueE({ flag: true, name: "cueE" });
    }
  };

  const onDoubleTapResetCueE = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCueE({ flag: false, name: "" });
    }
  };

  const notOnLongPress = () => {
    console.log("notOnLongPress");
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
            onLongPress={
              cueA.flag ? () => props.onLongPressEvent(cueA.flag, cueA.name) : notOnLongPress
            }
            style={cueA.flag ? styles["buttonItem--firstActive"] : styles["buttonItem--first"]}
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
            onLongPress={
              cueB.flag ? () => props.onLongPressEvent(cueB.flag, cueB.name) : notOnLongPress
            }
            style={cueB.flag ? styles["buttonItem--active"] : styles["buttonItem"]}
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
            onLongPress={
              cueC.flag ? () => props.onLongPressEvent(cueC.flag, cueC.name) : notOnLongPress
            }
            style={cueC.flag ? styles["buttonItem--active"] : styles["buttonItem"]}
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
            onLongPress={
              cueD.flag ? () => props.onLongPressEvent(cueD.flag, cueD.name) : notOnLongPress
            }
            style={cueD.flag ? styles["buttonItem--active"] : styles["buttonItem"]}
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
            onLongPress={
              cueE.flag ? () => props.onLongPressEvent(cueE.flag, cueE.name) : notOnLongPress
            }
            style={cueE.flag ? styles["buttonItem--active"] : styles["buttonItem"]}
          >
            <Text style={styles["text"]}>Cue E</Text>
          </Pressable>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default CueButtons;
