import React from "react";

// Components
import MainScreen from "components/templates/MainScreen";

// Constants
import * as TEXT from "constants/text";

interface Props {
  navigation: any;
}

const RecordAudio = (props: Props) => {
  return (
    <>
      <MainScreen title={TEXT.TITLE_RECORD_AUDIO} navigation={props.navigation} />
    </>
  );
};

export default RecordAudio;
