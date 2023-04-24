import React, { useState, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";

// Store
import { useSelector } from "store/index";

// Interfaces
import { CueButtonsNameType, OnPressEventType } from "interfaces/cueButtonsInterface";

// Styles
import styles from "./CueButtons.scss";

interface Props extends CueButtonsNameType, OnPressEventType {}

const CueButtons = (props: Props) => {
  const cueA = useSelector((state) => state.cueButtons.cueA);
  const cueB = useSelector((state) => state.cueButtons.cueB);
  const cueC = useSelector((state) => state.cueButtons.cueC);
  const cueD = useSelector((state) => state.cueButtons.cueD);
  const cueE = useSelector((state) => state.cueButtons.cueE);
  const doubleTapCueARef = useRef(null);
  const doubleTapCueBRef = useRef(null);
  const doubleTapCueCRef = useRef(null);
  const doubleTapCueDRef = useRef(null);
  const doubleTapCueERef = useRef(null);

  const onPressActiveCueA = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressActiveCue("A", props.cueA);
    }
  };

  const onDoubleTapResetCueA = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressInactiveCue("A", props.cueA);
    }
  };

  const onPressActiveCueB = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressActiveCue("B", props.cueB);
    }
  };

  const onDoubleTapResetCueB = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressInactiveCue("B", props.cueB);
    }
  };

  const onPressActiveCueC = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressActiveCue("C", props.cueC);
    }
  };

  const onDoubleTapResetCueC = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressInactiveCue("C", props.cueC);
    }
  };

  const onPressActiveCueD = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressActiveCue("D", props.cueD);
    }
  };

  const onDoubleTapResetCueD = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressInactiveCue("D", props.cueD);
    }
  };

  const onPressActiveCueE = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressActiveCue("E", props.cueE);
    }
  };

  const onDoubleTapResetCueE = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressInactiveCue("E", props.cueE);
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
              cueA[0].flag
                ? () => props.onLongPressEvent(cueA[0].flag, cueA[1].name)
                : notOnLongPress
            }
            style={cueA[0].flag ? styles["buttonItem--firstActive"] : styles["buttonItem--first"]}
          >
            <Text style={styles["text"]}>{props.cueA}</Text>
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
              cueB[0].flag
                ? () => props.onLongPressEvent(cueB[0].flag, cueB[1].name)
                : notOnLongPress
            }
            style={cueB[0].flag ? styles["buttonItem--active"] : styles["buttonItem"]}
          >
            <Text style={styles["text"]}>{props.cueB}</Text>
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
              cueC[0].flag
                ? () => props.onLongPressEvent(cueC[0].flag, cueC[1].name)
                : notOnLongPress
            }
            style={cueC[0].flag ? styles["buttonItem--active"] : styles["buttonItem"]}
          >
            <Text style={styles["text"]}>{props.cueC}</Text>
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
              cueD[0].flag
                ? () => props.onLongPressEvent(cueD[0].flag, cueD[1].name)
                : notOnLongPress
            }
            style={cueD[0].flag ? styles["buttonItem--active"] : styles["buttonItem"]}
          >
            <Text style={styles["text"]}>{props.cueD}</Text>
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
              cueE[0].flag
                ? () => props.onLongPressEvent(cueE[0].flag, cueE[1].name)
                : notOnLongPress
            }
            style={cueE[0].flag ? styles["buttonItem--active"] : styles["buttonItem"]}
          >
            <Text style={styles["text"]}>{props.cueE}</Text>
          </Pressable>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default CueButtons;
