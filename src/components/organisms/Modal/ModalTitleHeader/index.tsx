import React, { useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";

// Components
import Icon from "components/atoms/Icon";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";

// Styles
import styles from "./ModalTitleHeader.scss";

interface Props {
  title: string;
  onPressClose: () => void;
}

const ModalTitleHeader = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles["close-button-wrap"]}>
        <Pressable style={styles["close-button"]} onPress={props.onPressClose}>
          <Icon
            svgType={4}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            pathD1={SVGPATH.ICON_CLOSE}
            pathTransform1="translate(-0.5 -0.5)"
            pathFill={COLOR.COLOR_GRAY_TYPE1}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ModalTitleHeader;
