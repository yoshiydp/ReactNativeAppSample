import React, { useEffect, useState } from 'react';

// Components
import LowerScreen from 'components/templates/LowerScreen';

// Constants
import * as TEXT from 'constants/text';

interface Props {
  navigation: any;
}

const EditMyAccount = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <>
      <LowerScreen
        title={ TEXT.TITLE_EDIT_MY_ACCOUNT }
        navigation={ props.navigation }
      />
    </>
  );
};

export default EditMyAccount;
