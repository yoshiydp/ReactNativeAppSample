import React, { useEffect, useState } from 'react';

// Components
import LowerScreen from 'components/templates/LowerScreen';

// Constants
import * as TEXT from 'constants/text';

// Validators
import {
  validateUserName,
  validateEmail,
  validatePassword,
  validateNetworkRequestFailed,
  validateTooManyRequests
} from 'src/validators/SignUpValidator';

// Styles
import styles from './MyProjects.scss';

interface Props {
  navigation: any;
}

const NewProject = (props: Props) => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorUserName, setErrorUserName] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');

  useEffect(() => {
  }, []);

  const createProject = async () => {
    console.log('createProject');
  }

  // テキストフォームリスト
  const formControlItems = [
    {
      label: TEXT.LABEL_INPUT_PROJECT_TITLE,
      placeholder: TEXT.PLACEHOLDER_PROJECT_TITLE,
      onChangeText: setUserName,
      value: userName,
      required: true,
      errorText: errorUserName
    },
    {
      label: TEXT.LABEL_INPUT_TRACK_DATA,
      placeholder: TEXT.PLACEHOLDER_NO_TRACK,
      onChangeText: setEmail,
      value: email,
      required: true,
      notes: TEXT.LABEL_NOTES_TRACK_DATA,
      errorText: errorEmail
    },
  ];

  // コントロールボタンリスト
  const controlButtonItems = [
    {
      buttonText: TEXT.BUTTON_TRACK_UPLOAD,
      onPressEvent: createProject
    },
    {
      buttonText: TEXT.BUTTON_TRACK_SELECT,
      onPressEvent: createProject
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
    </>
  );
};

export default NewProject;
