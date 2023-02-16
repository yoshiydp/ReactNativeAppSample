import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DocumentPicker from "react-native-document-picker";
import { firebaseAuth, db } from "src/config/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

// Store
import { useSelector } from "store/index";
import { hideOverlay } from "store/OverlaySlice";
import { hideMainTabMenu } from "store/MainTabMenuSlice";
import { showModalPageSheet } from "store/ModalPageSheetSlice";
import { setTrackDataFile } from "store/NewProjectSlice";

// Components
import LowerScreen from "components/templates/LowerScreen";
import ModalPageSheet from "components/organisms/Modal/ModalPageSheet";

// Constants
import * as TEXT from "constants/text";

// Validators
import { validateProjectTitle } from "src/validators/NewProjectValidator";

// Styles
import styles from "./MyProjects.scss";

interface Props {
  navigation: any;
}

const NewProject = (props: Props) => {
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [errorProjectTitle, setErrorProjectTitle] = useState<string>("");
  const dispatch = useDispatch();
  const artWork = useSelector((state) => state.newProject.artWork);
  const trackDataFile = useSelector((state) => state.newProject.trackDataFile);

  useEffect(() => {
    dispatch(hideOverlay());
    dispatch(hideMainTabMenu());
  }, [projectTitle, artWork, trackDataFile]);

  const selectTrackDataFile = async () => {
    try {
      const results: any = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.audio],
      });
      dispatch(setTrackDataFile(results));
    } catch (error) {
      console.log(error);
    }
  };

  const selectTrackList = async () => {
    dispatch(showModalPageSheet());
  };

  const { uid }: any = firebaseAuth.currentUser;
  const storage = getStorage();

  const fileUpload = async (
    fileUri: string,
    fileName: string,
    fileType: string,
    directory: string,
  ) => {
    if (!uid) return;
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", fileUri, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, uid + directory + fileName);
    const metadata = {
      contentType: fileType,
    };

    try {
      await uploadBytesResumable(storageRef, blob, metadata);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const createProject = async () => {
    setErrorProjectTitle("");
    validateProjectTitle(projectTitle, setErrorProjectTitle);

    // プロジェクトタイトルが未入力の場合は以下を実行不可とする
    if (!projectTitle) return;

    let artWorkDownloadUrl;
    let trackDataDownloadUrl;

    // artWorkのアップロード
    if (artWork.length) {
      await fileUpload(artWork[0]?.uri, artWork[0]?.fileName, artWork[0]?.type, "/artworks/");
      await getDownloadURL(ref(storage, uid + "/artworks/" + artWork[0]?.fileName))
        .then((url) => {
          artWorkDownloadUrl = url;
          console.log("artWorkDownloadUrl: " + artWorkDownloadUrl);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // trackDataFileのアップロード
    if (trackDataFile.length) {
      await fileUpload(
        trackDataFile[0]?.uri,
        trackDataFile[0]?.name,
        trackDataFile[0]?.type,
        "/track_data_files/",
      );

      await getDownloadURL(ref(storage, uid + "/track_data_files/" + trackDataFile[0]?.name))
        .then((url) => {
          trackDataDownloadUrl = url;
          console.log("trackDataDownloadUrl: " + trackDataDownloadUrl);
        })
        .catch((error) => {
          console.log(error);
        });

      await updateDoc(doc(db, "users", uid), {
        projectData: arrayUnion({
          projectTitle: projectTitle,
          lyric: "",
          trackDataPath: trackDataDownloadUrl ? trackDataDownloadUrl : "",
          trackTitle: trackDataFile[0]?.name,
          artistName: "",
          artWorkPath: artWorkDownloadUrl ? artWorkDownloadUrl : "",
        }),
      });
    }
  };

  // テキストフォームリスト
  const formControlItems = [
    {
      label: TEXT.LABEL_INPUT_PROJECT_TITLE,
      placeholder: TEXT.PLACEHOLDER_PROJECT_TITLE,
      onChangeText: setProjectTitle,
      value: projectTitle,
      required: true,
      errorText: errorProjectTitle,
    },
    {
      label: TEXT.LABEL_INPUT_TRACK_DATA,
      placeholder: TEXT.PLACEHOLDER_NO_TRACK,
      value: trackDataFile[0]?.name,
      required: true,
      notes: TEXT.LABEL_NOTES_TRACK_DATA,
      editable: false,
      selectTextOnFocus: false,
    },
  ];

  // コントロールボタンリスト
  const controlButtonItems = [
    {
      buttonText: trackDataFile.length ? TEXT.BUTTON_TRACK_CHANGE : TEXT.BUTTON_TRACK_UPLOAD,
      onPressEvent: selectTrackDataFile,
    },
    {
      buttonText: TEXT.BUTTON_TRACK_SELECT,
      onPressEvent: selectTrackList,
    },
  ];

  return (
    <>
      <LowerScreen
        title={TEXT.TITLE_NEW_PROJECT}
        navigation={props.navigation}
        formControlItems={formControlItems}
        controlButtonItems={controlButtonItems}
        buttonText={TEXT.BUTTON_START}
        onPressSubmitEvent={createProject}
      />
      <ModalPageSheet />
    </>
  );
};

export default NewProject;
