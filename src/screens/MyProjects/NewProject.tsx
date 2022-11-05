import React, { useEffect, useState } from 'react';

// Components
import MainScreen from '../../components/templates/MainScreen';

// Constants
import * as TEXT from '../../constants/text';

interface Props {
  navigation: any;
}

const NewProject = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <>
      <MainScreen
        title={ TEXT.TITLE_NEW_PROJECT }
        navigation={ props.navigation }
      />
    </>
  );
};

export default NewProject;
