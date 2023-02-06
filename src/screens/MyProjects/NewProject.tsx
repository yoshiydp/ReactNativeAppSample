import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { useDispatch } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import { firebaseAuth, db } from 'src/config/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';

// Store
import { useSelector } from 'store/index';
import { hideOverlay } from 'store/OverlaySlice';
import { hideMainTabMenu } from 'store/MainTabMenuSlice';
import { setTrackDataFile } from 'store/NewProjectSlice';

// Components
import LowerScreen from 'components/templates/LowerScreen';

// Constants
import * as TEXT from 'constants/text';

// Validators
import { validateProjectTitle } from 'src/validators/NewProjectValidator';

// Styles
import styles from './MyProjects.scss';

interface Props {
  navigation: any;
}

const NewProject = (props: Props) => {
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [errorProjectTitle, setErrorProjectTitle] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const artWork = useSelector((state) => state.newProject.artWork);
  const trackDataFile = useSelector((state) => state.newProject.trackDataFile);

  useEffect(() => {
    dispatch(hideOverlay());
    dispatch(hideMainTabMenu());
    console.log(projectTitle, artWork, trackDataFile);
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
    setModalVisible(true);
  }

  const { uid }: any = firebaseAuth.currentUser;
  const storage = getStorage();

  const fileUpload = async (fileUri: string, fileName: string, fileType: string, directory: string) => {
    if (!uid) return;
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', fileUri, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, uid + directory + fileName);
    const metadata = {
      contentType: fileType,
    };

    try {
      await uploadBytesResumable(storageRef, blob, metadata)
        .then((snapshot) => {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.');
          console.log('File metadata:', snapshot.metadata);
          getDownloadURL(snapshot.ref).then((url) => {
            console.log('File available at', url);
          });
      });
    } catch (error) {
      console.error('Upload failed', error);
    }
  }

  const createProject = async () => {
    setErrorProjectTitle('');
    validateProjectTitle(projectTitle, setErrorProjectTitle);

    // プロジェクトタイトルが未入力の場合は以下を実行不可とする
    if (!projectTitle) return;

    // artWorkのアップロード
    if (artWork.length) {
      fileUpload(
        artWork[0]?.uri,
        artWork[0]?.fileName,
        artWork[0]?.type,
        '/artworks/'
      );
    }
    
    // trackDataFileのアップロード
    if (trackDataFile.length) {
      fileUpload(
        trackDataFile[0]?.uri,
        trackDataFile[0]?.name,
        trackDataFile[0]?.type,
        '/track_data_files/'
      );
    
      await updateDoc(doc(db, 'users', uid), {
        projectData: arrayUnion({
          projectTitle: projectTitle,
          lyric: '',
          trackDataPath: trackDataFile[0]?.uri,
          trackTitle: trackDataFile[0]?.name,
          artistName: '',
          artWorkPath: 'gs://lyrics-a7ae4.appspot.com/H3Ra9j8S4fZcBCnRH3u0ugKESt22/artworks/03107ECA-3234-4FBF-A2CC-F9DC25A7283E.jpg'
        }),
      });
    }
  }

  // テキストフォームリスト
  const formControlItems = [
    {
      label: TEXT.LABEL_INPUT_PROJECT_TITLE,
      placeholder: TEXT.PLACEHOLDER_PROJECT_TITLE,
      onChangeText: setProjectTitle,
      value: projectTitle,
      required: true,
      errorText: errorProjectTitle
    },
    {
      label: TEXT.LABEL_INPUT_TRACK_DATA,
      placeholder: TEXT.PLACEHOLDER_NO_TRACK,
      value: trackDataFile[0]?.name,
      required: true,
      notes: TEXT.LABEL_NOTES_TRACK_DATA,
      editable: false,
      selectTextOnFocus: false
    },
  ];

  // コントロールボタンリスト
  const controlButtonItems = [
    {
      buttonText: trackDataFile ? TEXT.BUTTON_TRACK_CHANGE : TEXT.BUTTON_TRACK_UPLOAD,
      onPressEvent: selectTrackDataFile
    },
    {
      buttonText: TEXT.BUTTON_TRACK_SELECT,
      onPressEvent: selectTrackList
    },
  ];

  return (
    <>
      <LowerScreen
        title={ TEXT.TITLE_NEW_PROJECT }
        navigation={ props.navigation }
        formControlItems={ formControlItems }
        controlButtonItems={ controlButtonItems }
        buttonText={ TEXT.BUTTON_START }
        onPressSubmitEvent={ createProject }
      />
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        style={modalStyles.modal}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>Hello World!</Text>
            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={modalStyles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const modalStyles = StyleSheet.create({
  modal: {
    backgroundColor: '#333'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 300,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default NewProject;
