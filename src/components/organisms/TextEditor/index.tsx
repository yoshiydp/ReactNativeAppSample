import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import LinearGradient from "react-native-linear-gradient";

// Components
import Icon from "components/atoms/Icon";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";
import * as TEXT from "constants/text";
import * as VALUE from "constants/value";

// Styles
import styles from "./TextEditor.scss";

interface Props {
  projectTitle: string;
}

const TextEditor = (props: Props) => {
  const richText = useRef();
  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState<boolean>(false);
  const [activeEditor, setActiveEditor] = useState<boolean>(false);
  const [disabledEditor, setDisabledEditor] = useState<boolean>(true);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const windowHeight = useWindowDimensions().height;
  const initialContainerHeight = windowHeight / 4;
  const richEditorHeight = windowHeight / 3;
  const containerHeightValue = useRef(new Animated.Value(initialContainerHeight)).current;
  const coverGradientHeightValue = useRef(new Animated.Value(initialContainerHeight)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const richTextHandle = (descriptionText: string) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  const submitContentHandle = () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      // send data to your server!
    }
  };

  const onPressActiveEditor = () => {
    setActiveEditor(true);
    setDisabledEditor(false);
    heightAnimatedFunc(
      containerHeightValue,
      targetHeight + 70 + richEditorHeight,
      VALUE.DURATION_200,
      0,
    );
    heightAnimatedFunc(coverGradientHeightValue, 0, VALUE.DURATION_200, 200);
    opacityAnimatedFunc(0);
  };

  const onPressInactiveEditor = () => {
    setActiveEditor(false);
    setDisabledEditor(true);
    heightAnimatedFunc(containerHeightValue, initialContainerHeight, VALUE.DURATION_200, 0);
    heightAnimatedFunc(coverGradientHeightValue, initialContainerHeight, 0, 0);
    opacityAnimatedFunc(1);
  };

  const heightAnimatedFunc = (object: any, value: number, duration: number, delay: number) => {
    Animated.timing(object, {
      toValue: value,
      duration: duration,
      delay: delay,
      useNativeDriver: false,
    }).start();
  };

  const opacityAnimatedFunc = (value: number) => {
    Animated.timing(opacityValue, {
      toValue: value,
      duration: VALUE.DURATION_200,
      useNativeDriver: false,
    }).start();
  };

  const containerHeightStyle = {
    height: containerHeightValue,
  };

  const coverGradientHeightStyle = {
    height: coverGradientHeightValue,
  };

  const richEditorHeightStyle = {
    height: richEditorHeight,
  };

  const animatedOpacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedOpacityStyle = {
    opacity: animatedOpacity,
  };

  const getTargetPosition = (object: any) => {
    setTargetHeight(object.nativeEvent.layout.height);
  };

  return (
    <Animated.View style={[styles["container"], containerHeightStyle]}>
      <Text style={styles["project-title"]} onLayout={getTargetPosition}>
        {props.projectTitle}
      </Text>
      <ScrollView style={styles["lyric-wrap"]}>
        <SafeAreaView edges={["bottom", "left", "right"]} style={styles["rich-editor-wrap"]}>
          <RichEditor
            ref={richText}
            onChange={richTextHandle}
            placeholder={TEXT.PLACEHOLDER_EDIT_PROJECT}
            androidHardwareAccelerationDisabled={true}
            editorStyle={styles["rich-editor"]}
            useContainer={false}
            containerStyle={richEditorHeightStyle}
            disabled={disabledEditor}
          />
          <RichToolbar
            editor={richText}
            selectedIconTint={COLOR.COLOR_WHITE_BASE}
            iconTint={COLOR.COLOR_GRAY_TYPE1}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.setStrikethrough,
              actions.setUnderline,
            ]}
            style={styles["rich-toolbar"]}
          />
        </SafeAreaView>
      </ScrollView>
      <Animated.View
        style={[styles["container-cover-gradient"], animatedOpacityStyle, coverGradientHeightStyle]}
      >
        <LinearGradient
          colors={["rgba(27,34,46,0)", "rgba(27,34,46,1)"]}
          style={styles["cover-gradient"]}
        ></LinearGradient>
      </Animated.View>
      <View style={styles["toggle-button-wrap"]}>
        {activeEditor ? (
          <Pressable style={styles["close-button"]} onPress={onPressInactiveEditor}>
            <Icon
              svgType={1}
              width="12"
              height="6.84"
              viewBox="0 0 12 6.84"
              gTransform="translate(12.001 103.981) rotate(180)"
              pathD1={SVGPATH.ICON_ARROW_UP}
              pathTransform1="translate(0)"
              pathFill={COLOR.COLOR_GRAY_TYPE1}
              containerStyle={styles["icon-arrow-up"]}
            />
            <Text style={styles["toggle-button__text"]}>Close Lyrics</Text>
          </Pressable>
        ) : (
          <Pressable style={styles["open-button"]} onPress={onPressActiveEditor}>
            <Text style={styles["toggle-button__text"]}>Edit Lyrics</Text>
            <Icon
              svgType={1}
              width="12"
              height="6.84"
              viewBox="0 0 12 6.84"
              gTransform="translate(-0.001 -97.141)"
              pathD1={SVGPATH.ICON_ARROW_DOWN}
              pathTransform1="translate(0)"
              pathFill={COLOR.COLOR_GRAY_TYPE1}
              containerStyle={styles["icon-arrow-down"]}
            />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

export default TextEditor;
