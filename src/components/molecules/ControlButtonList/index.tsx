import React from "react";
import { View } from "react-native";

// Components
import ButtonRound from "components/atoms/ButtonRound";

// Interfaces
import { ControlButtonsType } from "interfaces/controlButtonInterface";

// Styles
import styles from "./ControlButtonList.scss";

interface Props {
  controlButtonItems: ControlButtonsType[];
}

const ControlButtonList = (props: Props) => {
  return (
    <View style={styles.container}>
      {props.controlButtonItems &&
        props.controlButtonItems.map((item, index) => (
          <View style={index != 0 ? styles.itemMargin : ""} key={index}>
            <ButtonRound text={item.buttonText} onPressEvent={item.onPressEvent} />
          </View>
        ))}
    </View>
  );
};

export default ControlButtonList;
