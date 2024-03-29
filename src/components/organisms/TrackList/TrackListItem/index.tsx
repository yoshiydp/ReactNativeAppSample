import React, { useEffect, useRef } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { useDispatch } from "react-redux";
import { firebaseAuth, db } from "src/config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Swipeable from "react-native-gesture-handler/Swipeable";

// Store
import { useSelector } from "store/index";
import {
  showCenterModal,
  setCenterModalTitle,
  setCenterModalDataTitle,
  setCenterModalNoteTrackListDetail,
  setCenterModalSubmitButtonText,
} from "store/CenterModalSlice";
import { setTrackListDetail } from "store/TrackListDetailSlice";
import { activeTrackListModalFlag } from "store/TrackListModalFlagSlice";
import { showOverlay, inactiveHidden } from "store/OverlaySlice";
import { hideModalPageSheet } from "store/ModalPageSheetSlice";
import { setTrackDataFile } from "store/NewProjectSlice";
import {
  inactiveModalProjectSettingsSelectTrackList,
  showModalProjectSettings,
} from "store/ModalProjectSettingsSlice";

// Components
import ButtonDelete from "components/atoms/ButtonDelete";
import Icon from "components/atoms/Icon";

// Interfaces
import { TrackListDetailType } from "interfaces/trackListInterface";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";
import * as TEXT from "constants/text";

// Styles
import styles from "./TrackListItem.scss";

interface Props extends TrackListDetailType {
  navigation: any;
}

const TrackListItem = (props: Props) => {
  const swipeable = useRef<Swipeable>(null);
  const dispatch = useDispatch();
  const activeHiddenState = useSelector((state) => state.overlay.inactiveHidden);
  const activeModalPageSheet = useSelector((state) => state.modalPageSheet.modalPageSheet);
  const modalProjectSettingsFlagSelectTrackList = useSelector(
    (state) => state.modalProjectSettings.modalProjectSettingsFlagSelectTrackList
  );
  const { uid }: any = firebaseAuth.currentUser;
  if (!uid) return;
  const docRef = doc(db, "users", uid);

  const setTrackData = {
    trackDataPath: props.trackDataPath,
    trackTitle: props.trackTitle,
    artistName: props.artistName,
    artWorkPath: props.artWorkPath,
    linkedMyProjects: props.linkedMyProjects,
  };

  useEffect(() => {
    onSnapshot(docRef, () => {
      swipeable.current?.close();
    });
  }, [activeHiddenState]);

  const actionsOff = () => {
    return "";
  };

  const selectTrack = () => {
    dispatch(hideModalPageSheet());
    dispatch(setTrackDataFile([]));
    dispatch(setTrackListDetail(setTrackData));
    console.log(setTrackData);
    console.log("hideModalPageSheet close");

    // ProjectSettingsのTrackListが場合は以下を実行不可とする
    if (!modalProjectSettingsFlagSelectTrackList) return;
    dispatch(inactiveModalProjectSettingsSelectTrackList());
    dispatch(showModalProjectSettings());
  };

  const navigateEditTrack = async () => {
    await props.navigation.navigate("EditTrack");
  };

  const onPressRightSwipeActions = () => {
    swipeable.current?.openRight();
  };

  const textExtensionSubstring = (value: string, count = 100) => {
    const textReplace = value.replace(/.mp3/g, "").replace(/.wav/g, "");
    return textReplace.substring(0, count);
  };

  const onPressDeleteTrack = () => {
    dispatch(showOverlay());
    dispatch(inactiveHidden());
    dispatch(showCenterModal());
    dispatch(setCenterModalTitle(TEXT.MODAL_TITLE_DELETE_TRACK));
    dispatch(
      setCenterModalDataTitle(
        setTrackData.trackTitle.length > 20
          ? textExtensionSubstring(setTrackData.trackTitle, 20)
          : textExtensionSubstring(setTrackData.trackTitle)
      )
    );
    dispatch(setCenterModalNoteTrackListDetail(TEXT.MODAL_DESC_DELETE_TRACK_NOTE));
    dispatch(setCenterModalSubmitButtonText);
    dispatch(setTrackListDetail(setTrackData));
    dispatch(activeTrackListModalFlag());
  };

  const textSubstring = (value: string, count = 100) => {
    return value.substring(0, count) + "...";
  };

  const renderRightActions = () => {
    return <ButtonDelete onPressEvent={onPressDeleteTrack} />;
  };

  return (
    <Swipeable
      ref={swipeable}
      renderRightActions={activeModalPageSheet ? actionsOff : renderRightActions}
      rightThreshold={44}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={activeModalPageSheet ? selectTrack : navigateEditTrack}
        activeOpacity={1}
      >
        <View style={styles.artwork}>
          <Image
            style={styles.image}
            source={
              props.artWorkPath
                ? { uri: props.artWorkPath }
                : require("src/assets/images/common/no-artwork-small.jpg")
            }
          />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>
            {props.trackTitle.length > 20
              ? textExtensionSubstring(props.trackTitle, 20)
              : textExtensionSubstring(props.trackTitle)}{" "}
            /{props.artistName.length > 15 ? textSubstring(props.artistName, 15) : props.artistName}
          </Text>
          <Text style={styles.text}>{textSubstring(props.trackTitle, 30)}</Text>
          {props.linkedMyProjects.length > 0 && (
            <View style={styles.linkedProjects}>
              <Icon
                svgType={7}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                parentGTransform="translate(0.993 1.001)"
                childGTransform="translate(-0.993 -1)"
                grandchildGTransform="translate(0 0)"
                pathD1={SVGPATH.ICON_LINKED_PROJECTS_PATH1}
                pathD2={SVGPATH.ICON_LINKED_PROJECTS_PATH2}
                pathTransform1="translate(0.993 -172.815)"
                pathTransform2="translate(-185.461 1)"
                pathFill={COLOR.COLOR_GREEN_BASE}
                containerStyle={styles.iconLinkedMyProjects}
              />
              {props.linkedMyProjects.map((item, index) => (
                <Text style={styles.linkedProjectsText} key={index}>
                  {item.projectTitle}
                </Text>
              ))}
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.ellipsisButton}
          onPress={onPressRightSwipeActions}
          activeOpacity={1}
        >
          <Icon
            svgType={6}
            width="5"
            height="21"
            viewBox="0 0 5 21"
            parentGTransform="translate(-357 -118)"
            childGTransform="translate(698 -206) rotate(90)"
            coordinate="2.5"
            radius="2.5"
            pathTransform1="translate(324 336)"
            pathTransform2="translate(332 336)"
            pathTransform3="translate(340 336)"
            pathFill={COLOR.COLOR_GRAY_TYPE3}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default TrackListItem;
