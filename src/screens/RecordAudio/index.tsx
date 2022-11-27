import React, { useEffect, useState } from 'react';

// Components
import MainScreen from 'components/templates/MainScreen';

// Constants
import * as TEXT from 'constants/text';

interface Props {
  navigation: any;
}

const RecordAudio = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <>
      <MainScreen
        title={ TEXT.TITLE_RECORD_AUDIO }
        navigation={ props.navigation }
      />
    </>
  );
};

export default RecordAudio;
