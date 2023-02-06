import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// Components
import MyProjectsItem from 'components/organisms/MyProjects/MyProjectsItem';

// Interfaces
import { MyProjectType } from 'interfaces/myProjectInterface';

// Styles
import styles from './MyProjectsList.scss';

interface Props {
  myProjectDataItems: Array<MyProjectType>;
  navigation: any;
}

const MyProjectsList = (props: Props) => {

  useEffect(() => {
  }, [props.myProjectDataItems]);

  return (
    <View style={ styles.container }>
      {
        props.myProjectDataItems
        ? props.myProjectDataItems.map((item, index) => (
            <View style={ index != 0 ? styles.itemMargin : '' } key={ index }>
              <MyProjectsItem
                projectTitle={ item.projectTitle }
                lyric={ item.lyric }
                trackDataPath={ item.trackDataPath }
                trackTitle={ item.trackTitle }
                artistName={ item.artistName }
                artWorkPath={ item.artWorkPath }
                navigation={ props.navigation }
              />
            </View>
          ))
        : ''
      }
    </View>
  );
};

export default MyProjectsList;
