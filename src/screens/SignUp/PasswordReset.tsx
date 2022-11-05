import React, { useEffect, useState } from 'react';

// Components
import MainScreen from '../../components/templates/MainScreen';

// Constants
import * as TEXT from '../../constants/text';

interface Props {
  navigation: any;
}

const PasswordReset = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <>
      <MainScreen
        title={ TEXT.TITLE_PASSWORD_RESET }
        navigation={ props.navigation }
      />
    </>
  );
};

export default PasswordReset;
