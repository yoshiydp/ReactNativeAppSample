import React, { useEffect, useState } from 'react';

// Components
import LowerScreen from '../../components/templates/LowerScreen';

// Constants
import * as TEXT from '../../constants/text';

interface Props {
  navigation: any;
}

const NewTrack = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <>
      <LowerScreen
        title={ TEXT.TITLE_NEW_TRACK }
        navigation={ props.navigation }
      />
    </>
  );
};

export default NewTrack;
