import React, { useEffect, useState } from 'react';

// Components
import LowerScreen from '../../components/templates/LowerScreen';

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
      <LowerScreen
        title={ TEXT.TITLE_PASSWORD_RESET }
        navigation={ props.navigation }
      />
    </>
  );
};

export default PasswordReset;
