import React, { useEffect, useState } from 'react';

// Components
import MainScreen from '@src/components/templates/MainScreen';

// Constants
import * as TEXT from '@src/constants/text';

interface Props {
  navigation: any;
}

const TrackList = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <>
      <MainScreen
        title={ TEXT.TITLE_TRACK_LIST }
        navigation={ props.navigation }
      />
    </>
  );
};

export default TrackList;
