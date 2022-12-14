import React, { useEffect, useState } from 'react';

// Components
import LowerScreen from 'components/templates/LowerScreen';

// Constants
import * as TEXT from 'constants/text';

interface Props {
  navigation: any;
}

const EditProject = (props: Props) => {

  useEffect(() => {
  }, []);

  return (
    <>
      <LowerScreen
        title={ 'Edit Project' }
        navigation={ props.navigation }
      />
    </>
  );
};

export default EditProject;
