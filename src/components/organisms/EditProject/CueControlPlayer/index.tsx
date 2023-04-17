import React from "react";
import { Pressable, Text, View } from "react-native";

// Components
import Icon from "components/atoms/Icon";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";

// Styles
import styles from "./CueControlPlayer.scss";

interface Props {
  start: boolean;
  pause: boolean;
  onPressStart: () => void;
  onPressPause: () => void;
  onPressRepeat: () => void;
  onPressAllCueReset: () => void;
}

const CueControlPlayer = (props: Props) => {
  return (
    <View style={styles["container"]}>
      <Pressable style={styles["repeat-button"]} onPress={props.onPressRepeat}>
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
        {props.start && (
          <Pressable style={styles["play-button"]} onPress={props.onPressStart}>
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
        {props.pause && (
          <Pressable style={styles["play-button"]} onPress={props.onPressPause}>
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
      <Pressable style={styles["cue-reset-button"]} onPress={props.onPressAllCueReset}>
        <Text style={styles["cue-reset-button__text"]}>All Cue Reset</Text>
      </Pressable>
    </View>
  );
};

export default CueControlPlayer;
