import React, { useEffect, useState } from 'react';

// Components
import LowerScreen from '@src/components/templates/LowerScreen';

// Constants
import * as TEXT from '@src/constants/text';

interface Props {
  navigation: any;
}

const Recording = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <>
      <LowerScreen
        title={ 'Recording' }
        navigation={ props.navigation }
      />
    </>
  );
};

export default Recording;
