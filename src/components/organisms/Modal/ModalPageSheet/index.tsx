import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";
import { hideModalPageSheet } from "store/ModalPageSheetSlice";

// Components
import ModalControlHeader from "components/organisms/Modal/ModalControlHeader";
import TrackList from "src/components/organisms/TrackList/TrackList";

// Interfaces
import { TrackListDetailType } from "interfaces/trackListInterface";

// Styles
import styles from "./ModalPageSheet.scss";

interface Props {
  navigation: any;
  trackListDataItems: Array<TrackListDetailType>;
}

const ModalPageSheet = (props: Props) => {
  const dispatch = useDispatch();
  const modalPageSheet = useSelector((state) => state.modalPageSheet.modalPageSheet);
  const [targetWidth, setTargetWidth] = useState<number>(0);

  const getTargetWidth = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
  };

  const modalClose = () => {
    dispatch(hideModalPageSheet());
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={modalPageSheet}
      onRequestClose={modalClose}
    >
      <View style={styles.container}>
        <ModalControlHeader />
        <ScrollView>
          <TrackList trackListDataItems={props.trackListDataItems} navigation={props.navigation} />
        </ScrollView>
        <View
          style={[styles.swipeBorder, { transform: [{ translateX: -(targetWidth / 2) }] }]}
          onLayout={getTargetWidth}
        ></View>
      </View>
    </Modal>
  );
};

export default ModalPageSheet;
