import React, { useEffect } from "react";

// Components
import LowerScreen from "components/templates/LowerScreen";

interface Props {
  navigation: any;
}

const Recording = (props: Props) => {

  return (
    <>
      <LowerScreen
        title={ "Recording" }
        navigation={ props.navigation }
      />
    </>
  );
};

export default Recording;
