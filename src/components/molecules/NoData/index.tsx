import React from "react";
import { View, Text } from "react-native";

// Store
import { useSelector } from "store/index";

// Components
import ButtonSquare from "components/atoms/ButtonSquare";

// Styles
import styles from "./NoData.scss";

interface Props {
  text: string;
  buttonText: string;
  onPressEvent?: () => void;
}

const NoData = (props: Props) => {
  const modalPageSheet = useSelector((state) => state.modalPageSheet.modalPageSheet);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
      {!modalPageSheet && (
        <View style={styles.buttonWrap}>
          <ButtonSquare text={props.buttonText} onPressEvent={props.onPressEvent} />
        </View>
      )}
    </View>
  );
};

export default NoData;
