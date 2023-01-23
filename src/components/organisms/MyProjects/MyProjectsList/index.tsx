import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// Components
import MyProjectsItem from 'components/organisms/MyProjects/MyProjectsItem';

// Styles
import styles from './MyProjectsList.scss';

interface MyProjectData {
  projectTitle: string;
  lyric: string;
  trackTitle: string;
  artistName: string;
  artWork: string;
}

interface Props {
  myProjectDataItems: Array<MyProjectData>;
  navigation: any;
}

const MyProjectsList = (props: Props) => {

  useEffect(() => {
    console.log(props.myProjectDataItems);
  }, [props.myProjectDataItems]);

  return (
    <View style={ styles.container }>
      { props.myProjectDataItems.map((item, index) => (
        <View style={ index != 0 ? styles.itemMargin : '' } key={ index }>
          <MyProjectsItem
            projectTitle={ item.projectTitle }
            lyric={ item.lyric }
            trackTitle={ item.trackTitle }
            artistName={ item.artistName }
            artWork={ item.artWork }
            navigation={ props.navigation }
          />
        </View>
      ))}
    </View>
  );
};

export default MyProjectsList;
