import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";

// Store
import { useSelector } from "store/index";
import { hideModalPageSheet } from "store/ModalPageSheetSlice";
import {
  inactiveModalProjectSettingsSelectTrackList,
  showModalProjectSettings,
} from "store/ModalProjectSettingsSlice";

// Components
import ModalControlHeader from "components/organisms/Modal/ModalControlHeader";
import TrackList from "src/components/organisms/TrackList/TrackList";

// Interfaces
import { TrackListDetailType } from "interfaces/trackListInterface";

// Styles
import styles from "./ModalPageSheet.scss";

interface Props {
  navigation?: any;
  trackListDataItems: TrackListDetailType[];
}

const ModalPageSheet = (props: Props) => {
  const dispatch = useDispatch();
  const modalPageSheet = useSelector((state) => state.modalPageSheet.modalPageSheet);
  const modalProjectSettingsFlagSelectTrackList = useSelector(
    (state) => state.modalProjectSettings.modalProjectSettingsFlagSelectTrackList
  );
  const [targetWidth, setTargetWidth] = useState<number>(0);

  const getTargetWidth = (object: any) => {
    setTargetWidth(object.nativeEvent.layout.width);
  };

  const modalClose = () => {
    dispatch(hideModalPageSheet());

    // ProjectSettingsのTrackListが場合は以下を実行不可とする
    if (!modalProjectSettingsFlagSelectTrackList) return;
    dispatch(inactiveModalProjectSettingsSelectTrackList());
    dispatch(showModalProjectSettings());
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
          <TrackList
            trackListDataItems={props.trackListDataItems}
            navigation={props.navigation}
            containerStyle={styles.containerScrollView}
          />
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
