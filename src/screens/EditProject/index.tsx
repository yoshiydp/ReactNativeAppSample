import React, { useEffect, useState } from "react";
import { Animated, View, ScrollView } from "react-native";

// Components
import LowerScreen from "components/templates/LowerScreen";

// Styles
import styles from "./MyProjects.scss";

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
