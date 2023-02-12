import React from "react";

// Components
import LowerScreen from "components/templates/LowerScreen";

interface Props {
  navigation: any;
}

const EditProject = (props: Props) => {
  return (
    <>
      <LowerScreen title={"Edit Project"} navigation={props.navigation} />
    </>
  );
};

export default EditProject;
