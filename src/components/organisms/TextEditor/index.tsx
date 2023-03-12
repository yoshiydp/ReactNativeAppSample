import React, { useRef, useState } from "react";
import {
  ScrollView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import LinearGradient from "react-native-linear-gradient";

// Components
import Icon from "components/atoms/Icon";

// Constants
import * as COLOR from "constants/color";
import * as SVGPATH from "constants/svgPath";

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
  };

  const onPressInactiveEditor = () => {
    setActiveEditor(false);
  };

  return (
    <View style={styles["container"]}>
      <Text style={styles["project-title"]}>{props.projectTitle}</Text>
      <ScrollView style={styles["lyric-wrap"]}>
        <SafeAreaView edges={["bottom", "left", "right"]} style={styles["rich-editor-wrap"]}>
          <RichEditor
            ref={richText}
            onChange={richTextHandle}
            placeholder="ここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してくださいここにリリックを入力してください"
            androidHardwareAccelerationDisabled={true}
            // initialHeight={417}
            initialHeight={188}
            editorStyle={styles["rich-editor"]}
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
      <LinearGradient
        colors={["rgba(27,34,46,0)", "rgba(27,34,46,1)"]}
        style={styles["cover-gradient"]}
      ></LinearGradient>
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
    </View>
  );
};

export default TextEditor;
