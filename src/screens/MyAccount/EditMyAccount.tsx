import React, { useEffect, useState } from 'react';

// Components
import MainScreen from '../../components/templates/MainScreen';

// Constants
import * as TEXT from '../../constants/text';

interface Props {
  navigation: any;
}

const EditMyAccount = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <>
      <MainScreen
        title={ TEXT.TITLE_EDIT_MY_ACCOUNT }
        navigation={ props.navigation }
      />
    </>
  );
};

export default EditMyAccount;
