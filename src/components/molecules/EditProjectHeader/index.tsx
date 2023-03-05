import React, { useEffect, useState } from "react";
import { Animated, View, TouchableOpacity } from "react-native";

// Components
import Icon from "components/atoms/Icon";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";

// Styles
import styles from "./EditProjectHeader.scss";

interface Props {
  onPressHomeButton: () => void;
  onPressMenuButton: () => void;
}

const EditProjectHeader = (props: Props) => {
  return (
    <Animated.View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles["home-button"]}
        onPress={props.onPressHomeButton}
      >
        <Icon
          svgType={4}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          pathD1={SVGPATH.ICON_HOME}
          pathTransform1="translate(-0.004 0.001)"
          pathFill={COLOR.COLOR_GRAY_TYPE1}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles["menu-button"]}
        onPress={props.onPressMenuButton}
      >
        <Icon
          svgType={4}
          width="20"
          height="14.444"
          viewBox="0 0 20 14.444"
          pathD1={SVGPATH.ICON_HAMBURGER_PATH1}
          pathD2={SVGPATH.ICON_HAMBURGER_PATH2}
          pathD3={SVGPATH.ICON_HAMBURGER_PATH3}
          pathTransform1="translate(0 -116.279)"
          pathTransform3="translate(0 -232.554)"
          pathFill={COLOR.COLOR_GRAY_TYPE1}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default EditProjectHeader;
