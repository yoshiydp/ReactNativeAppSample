import React from "react";
import { View } from "react-native";

// Components
import NoData from "components/molecules/NoData";
import MyProjectsItem from "components/organisms/MyProjects/MyProjectsItem";

// Interfaces
import { MyProjectsDetailType } from "interfaces/myProjectsInterface";

// Constants
import * as TEXT from "constants/text";

// Styles
import styles from "./MyProjectsList.scss";

interface Props {
  myProjectDataItems: MyProjectsDetailType[];
  navigation: any;
  containerStyle?: any;
}

const MyProjectsList = (props: Props) => {
  const navigateNewProject = async () => {
    await props.navigation.navigate("NewProject");
  };

  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.myProjectDataItems.length ? (
        props.myProjectDataItems.map((item, index) => (
          <View style={index != 0 ? styles.itemMargin : ""} key={index}>
            <MyProjectsItem
              projectTitle={item.projectTitle}
              lyric={item.lyric}
              trackDataPath={item.trackDataPath}
              trackTitle={item.trackTitle}
              artistName={item.artistName}
              artWorkPath={item.artWorkPath}
              cueButtons={item.cueButtons}
              navigation={props.navigation}
            />
          </View>
        ))
      ) : (
        <NoData
          text={TEXT.NO_DATA_TEXT_MY_PROJECTS}
          buttonText={TEXT.BUTTON_MY_PROJECTS_CREATE}
          onPressEvent={navigateNewProject}
        />
      )}
    </View>
  );
};

export default MyProjectsList;
