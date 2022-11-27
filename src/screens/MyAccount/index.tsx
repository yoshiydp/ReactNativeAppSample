import React, { useEffect, useState } from 'react';

// Components
import MainScreen from '@src/components/templates/MainScreen';

// Constants
import * as TEXT from '@src/constants/text';

interface Props {
  navigation: any;
}

const MyAccount = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <>
      <MainScreen
        title={ TEXT.TITLE_MY_ACCOUNT }
        navigation={ props.navigation }
      />
    </>
  );
};

export default MyAccount;
