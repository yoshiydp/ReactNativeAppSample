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

// Constants
import * as COLOR from "constants/color";

// Styles
import styles from "./TextEditor.scss";

interface Props {
  projectTitle: string;
}

const TextEditor = (props: Props) => {
  const richText = useRef();

  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);

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

  return (
    <ScrollView style={styles["container"]}>
      <Text style={styles["project-title"]}>{props.projectTitle}</Text>
      <ScrollView style={styles["lyric-wrap"]}>
        {/* <Text style={styles["lyric-text"]}>
          歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。歌詞が表示されます。
        </Text> */}
        <SafeAreaView edges={["bottom", "left", "right"]} style={styles["rich-editor-wrap"]}>
          {/* <Pressable onPress={() => richText.current?.dismissKeyboard()}>
              <Text style={editorStyles.headerStyle}>Your awesome Content</Text>
              <View style={editorStyles.htmlBoxStyle}>
                <Text>{descHTML}</Text>
              </View>
            </Pressable> */}
          <RichEditor
            ref={richText}
            onChange={richTextHandle}
            placeholder="ここにリリックを入力してください"
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
          {/* <TouchableOpacity style={editorStyles.saveButtonStyle} onPress={submitContentHandle}>
              <Text style={editorStyles.textButtonStyle}>Save</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
      </ScrollView>
    </ScrollView>
  );
};

const editorStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#ccaf9b",
    alignItems: "center",
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#312921",
  },

  htmlBoxStyle: {
    height: 200,
    width: 330,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },

  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
  },

  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#ccaf9b",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    backgroundColor: "#c6c3b3",
    borderColor: "#c6c3b3",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },

  errorTextStyle: {
    color: "#FF0000",
    marginBottom: 10,
  },

  saveButtonStyle: {
    backgroundColor: "#c6c3b3",
    borderWidth: 1,
    borderColor: "#c6c3b3",
    borderRadius: 10,
    padding: 10,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  textButtonStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#312921",
  },
});

export default TextEditor;
