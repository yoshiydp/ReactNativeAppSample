import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Image, Text} from 'react-native';
import { useDispatch } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Store
import { useSelector } from 'store/index';
import { showOverlay, inactiveHidden } from 'store/OverlaySlice';

// Components
import DeleteButton from 'components/atoms/DeleteButton';

// Interfaces
import { svgType1, svgType2, svgType3, svgType4, svgType5 } from 'interfaces/svgInterface';

// Styles
import styles from './MyProjectsItem.scss';

interface DataProps {
  projectTitle: string;
  lyric: string;
  trackTitle: string;
  artistName: string;
  artWork: string;
}

interface Props extends DataProps {
  navigation: any;
}

const MyProjectsItem = (props: Props) => {
  const swipeable = useRef<Swipeable>(null);
  const dispatch = useDispatch();
  const activeHiddenState = useSelector((state) => state.overlay.inactiveHidden);

  useEffect(() => {
    console.log('activeHiddenState: ' + activeHiddenState);
  }, [activeHiddenState]);

  const renderRightActions = () => {
    return (
      <DeleteButton
        onPressEvent={ onPressDeleteProject }
      />
    );
  };

  const navigateEditProject = async () => {
    await props.navigation.navigate('EditProject');
  };

  const onPressRightSwipeActions = () => {
    swipeable.current?.openRight();
  };

  const onPressDeleteProject = () => {
    dispatch(showOverlay());
    dispatch(inactiveHidden());
  };

  return (
    <Swipeable
      ref={ swipeable }
      renderRightActions={ renderRightActions }
      rightThreshold={ 40 }
    >
      <TouchableOpacity
        style={ styles.container }
        onPress={ navigateEditProject }
        activeOpacity={ 1 }>
        <View style={ styles.artwork }>
          <Image
            style={ styles.image }
            source={
              props.artWork
              ? props.artWork
              : require('src/assets/images/common/no-artwork.jpg')
            }
          />
        </View>
        <View style={ styles.textWrap }>
          <Text style={ styles.title }>
            { props.projectTitle }
          </Text>
          <Text style={ styles.text }>
            { props.lyric }
          </Text>
          <Text style={ styles.text }>
            { props.trackTitle } / { props.artistName }
          </Text>
        </View>
        <TouchableOpacity
          style={ styles.ellipsisButton }
          onPress={ onPressRightSwipeActions }
          activeOpacity={ 1 }>
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default MyProjectsItem;
