import React from "react";
import { View } from "react-native";

// Components
import NoData from "components/molecules/NoData";
import TrackListItem from "components/organisms/TrackList/TrackListItem";

// Interfaces
import { TrackListDetailType } from "interfaces/trackListInterface";

// Constants
import * as TEXT from "constants/text";

// Styles
import styles from "./TrackList.scss";

interface Props {
  trackListDataItems: Array<TrackListDetailType>;
  navigation: any;
}

const TrackList = (props: Props) => {
  const navigateNewTrack = async () => {
    await props.navigation.navigate("NewTrack");
  };

  return (
    <View style={styles.container}>
      {props.trackListDataItems.length ? (
        props.trackListDataItems.map((item, index) => (
          <View style={index != 0 ? styles.itemMargin : ""} key={index}>
            <TrackListItem
              trackDataPath={item.trackDataPath}
              trackTitle={item.trackTitle}
              artistName={item.artistName}
              artWorkPath={item.artWorkPath}
              linkedMyProjects={item.linkedMyProjects}
              navigation={props.navigation}
            />
          </View>
        ))
      ) : (
        <NoData
          text={TEXT.NO_DATA_TEXT_TRACK_LIST}
          buttonText={TEXT.BUTTON_NEW_TRACK_UPLOAD}
          onPressEvent={navigateNewTrack}
        />
      )}
    </View>
  );
};

export default TrackList;
