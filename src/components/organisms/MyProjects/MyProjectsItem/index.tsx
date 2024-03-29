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
  setCenterModalNotes,
  setCenterModalSubmitButtonText,
} from "store/CenterModalSlice";
import { setMyProjectsDetail } from "store/MyProjectsDetailSlice";
import { setTextValue } from "store/TextEditorSlice";
import { setCueA, setCueB, setCueC, setCueD, setCueE } from "store/CueButtonsSlice";
import { activeMyProjectsModalFlag } from "store/MyProjectsModalFlagSlice";
import { showOverlay, inactiveHidden } from "store/OverlaySlice";

// Components
import ButtonDelete from "components/atoms/ButtonDelete";
import Icon from "components/atoms/Icon";

// Interfaces
import { MyProjectsDetailType } from "interfaces/myProjectsInterface";

// Constants
import * as COLOR from "constants/color";
import * as TEXT from "constants/text";

// Styles
import styles from "./MyProjectsItem.scss";

interface Props extends MyProjectsDetailType {
  navigation: any;
}

const MyProjectsItem = (props: Props) => {
  const swipeable = useRef<Swipeable>(null);
  const dispatch = useDispatch();
  const activeHiddenState = useSelector((state) => state.overlay.inactiveHidden);
  const cueA = useSelector((state) => state.cueButtons.cueA);
  const cueB = useSelector((state) => state.cueButtons.cueB);
  const cueC = useSelector((state) => state.cueButtons.cueC);
  const cueD = useSelector((state) => state.cueButtons.cueD);
  const cueE = useSelector((state) => state.cueButtons.cueE);
  const { uid }: any = firebaseAuth.currentUser;
  if (!uid) return;
  const docRef = doc(db, "users", uid);

  const setProjectData = {
    projectTitle: props.projectTitle,
    lyric: props.lyric,
    trackDataPath: props.trackDataPath,
    trackTitle: props.trackTitle,
    artistName: props.artistName,
    artWorkPath: props.artWorkPath,
    cueButtons: props.cueButtons,
  };

  useEffect(() => {
    onSnapshot(docRef, () => {
      swipeable.current?.close();
    });
  }, [activeHiddenState]);

  const navigateEditProject = async () => {
    dispatch(setMyProjectsDetail(setProjectData));
    dispatch(setTextValue(setProjectData.lyric));
    dispatch(
      setCueA([
        { flag: props.cueButtons[0].flag },
        { name: props.cueButtons[0].name },
        { position: props.cueButtons[0].position },
      ])
    );
    dispatch(
      setCueB([
        { flag: props.cueButtons[1].flag },
        { name: props.cueButtons[1].name },
        { position: props.cueButtons[1].position },
      ])
    );
    dispatch(
      setCueC([
        { flag: props.cueButtons[2].flag },
        { name: props.cueButtons[2].name },
        { position: props.cueButtons[2].position },
      ])
    );
    dispatch(
      setCueD([
        { flag: props.cueButtons[3].flag },
        { name: props.cueButtons[3].name },
        { position: props.cueButtons[3].position },
      ])
    );
    dispatch(
      setCueE([
        { flag: props.cueButtons[4].flag },
        { name: props.cueButtons[4].name },
        { position: props.cueButtons[4].position },
      ])
    );
    await props.navigation.navigate("EditProject");
  };

  const onPressRightSwipeActions = () => {
    swipeable.current?.openRight();
  };

  const onPressDeleteProject = () => {
    dispatch(showOverlay());
    dispatch(inactiveHidden());
    dispatch(showCenterModal());
    dispatch(setCenterModalTitle(TEXT.MODAL_TITLE_DELETE_PROJECT));
    dispatch(setCenterModalDataTitle(setProjectData.projectTitle));
    dispatch(setCenterModalNotes(TEXT.MODAL_DESC_DELETE_NOTE));
    dispatch(setCenterModalSubmitButtonText);
    dispatch(setMyProjectsDetail(setProjectData));
    dispatch(activeMyProjectsModalFlag());
  };

  const textSubstring = (value: string, count: number) => {
    return value.substring(0, count) + "...";
  };

  const renderRightActions = () => {
    return <ButtonDelete onPressEvent={onPressDeleteProject} />;
  };

  return (
    <Swipeable ref={swipeable} renderRightActions={renderRightActions} rightThreshold={44}>
      <TouchableOpacity style={styles.container} onPress={navigateEditProject} activeOpacity={1}>
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
            {props.projectTitle.length > 30
              ? textSubstring(props.projectTitle, 30)
              : props.projectTitle}
          </Text>
          <Text style={styles.text}>
            {props.lyric ? textSubstring(props.lyric, 25) : "No lyric"}
          </Text>
          <Text style={styles.text}>
            {props.trackTitle ? textSubstring(props.trackTitle, 15) : "Not Track data"} /{" "}
            {props.artistName && props.artistName}
          </Text>
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

export default MyProjectsItem;
