import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Image, Text} from 'react-native';
import { useDispatch } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Store
import { useSelector } from 'store/index';
import { showOverlay, inactiveHidden } from 'store/OverlaySlice';

// Components
import DeleteButton from 'components/atoms/DeleteButton';
import Icon from 'components/atoms/Icon';

// Constants
import * as COLOR from 'constants/color';
import * as SVGPATH from 'constants/svgPath';

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
          <Icon
            svgType={ 6 }
            width="5"
            height="21"
            viewBox="0 0 5 21"
            parentGTransform="translate(-357 -118)"
            childGTransform="translate(698 -206) rotate(90)"
            coordinate="2.5"
            radius="2.5"
            pathTransform1="translate(324 336)"
            pathTransform2="translate(332 336)"
            pathTransform3="translate(340 336)"
            pathFill={ COLOR.COLOR_GRAY_TYPE3 }
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default MyProjectsItem;
