import React, { useEffect, useState } from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { useDispatch } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Store
import { hideOverlay } from 'store/OverlaySlice';
import { hideMainTabMenu } from 'store/MainTabMenuSlice';

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
  const [trackFile, setTrackFile] = useState<string[]>([]);
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [trackDataFile, setTrackDataFile] = useState<string>('');
  const [errorProjectTitle, setErrorProjectTitle] = useState<string>('');
  const [errorTrackDataFile, setErrorTrackDataFile] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideOverlay());
    dispatch(hideMainTabMenu());
  }, [trackDataFile]);

  const selectTrackDataFile = async () => {
    try {
      const results: any = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.audio],
      });
      for (const response of results) {
        // console.log('response : ' + JSON.stringify(response));
        // console.log('URI : ' + response.uri);
        // console.log('Type : ' + response.type);
        // console.log('File Name : ' + response.name);
        // console.log('File Size : ' + response.size);
        setTrackDataFile(response.name);
      }
      setTrackFile(results);
      console.log(results);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Canceled from multiple doc picker');
      } else {
        console.log('Unknown Error: ' + JSON.stringify(error));
        throw error;
      }
    }
  };

  const selectTrackList = async () => {
    setModalVisible(true);
  }

  const createProject = async () => {
    setErrorProjectTitle('');
    validateProjectTitle(projectTitle, setErrorProjectTitle);
    console.log('createProject');
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
      onChangeText: setTrackDataFile,
      value: trackDataFile,
      required: true,
      notes: TEXT.LABEL_NOTES_TRACK_DATA,
      errorText: errorTrackDataFile,
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
