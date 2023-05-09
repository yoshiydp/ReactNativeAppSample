import React, { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";

// Store
import { useSelector } from "store/index";

// Interfaces
import { OnPressEventType } from "interfaces/cueButtonsInterface";

// Styles
import styles from "./CueButtons.scss";

const CueButtons = (props: OnPressEventType) => {
  const cueButtons = useSelector((state) => state.myProjectsDetail.cueButtons);
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
      props.onPressActivateCue("A", cueButtons[0].name);
    }
  };

  const onDoubleTapResetCueA = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressInactivateCue("A", cueButtons[0].name);
    }
  };

  const onPressActiveCueB = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressActivateCue("B", cueButtons[1].name);
    }
  };

  const onDoubleTapResetCueB = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressInactivateCue("B", cueButtons[1].name);
    }
  };

  const onPressActiveCueC = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressActivateCue("C", cueButtons[2].name);
    }
  };

  const onDoubleTapResetCueC = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressInactivateCue("C", cueButtons[2].name);
    }
  };

  const onPressActiveCueD = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressActivateCue("D", cueButtons[3].name);
    }
  };

  const onDoubleTapResetCueD = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressInactivateCue("D", cueButtons[3].name);
    }
  };

  const onPressActiveCueE = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressActivateCue("E", cueButtons[4].name);
    }
  };

  const onDoubleTapResetCueE = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onPressInactivateCue("E", cueButtons[4].name);
    }
  };

  const notOnLongPress = () => {
    console.log("notOnLongPress");
  };

  return (
    <View style={styles.container}>
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
            <Text style={styles.text}>{cueButtons[0].name}</Text>
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
            style={cueB[0].flag ? styles["buttonItem--active"] : styles.buttonItem}
          >
            <Text style={styles.text}>{cueButtons[1].name}</Text>
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
            style={cueC[0].flag ? styles["buttonItem--active"] : styles.buttonItem}
          >
            <Text style={styles.text}>{cueButtons[2].name}</Text>
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
            style={cueD[0].flag ? styles["buttonItem--active"] : styles.buttonItem}
          >
            <Text style={styles.text}>{cueButtons[3].name}</Text>
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
            style={cueE[0].flag ? styles["buttonItem--active"] : styles.buttonItem}
          >
            <Text style={styles.text}>{cueButtons[4].name}</Text>
          </Pressable>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default CueButtons;
