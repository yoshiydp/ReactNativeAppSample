import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, Image, Text} from 'react-native';
import { useDispatch } from 'react-redux';
import { firebaseAuth, db } from 'src/config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Store
import { useSelector } from 'store/index';
import {
  showCenterModal,
  setCenterModalTitle,
  setCenterModalDataTitle,
  setCenterModalDescription,
  setCenterModalSubmitButtonText
} from 'store/CenterModalSlice';
import { setMyProjectsDetail } from 'store/MyProjectsSlice';
import { showOverlay, inactiveHidden } from 'store/OverlaySlice';

// Components
import DeleteButton from 'components/atoms/DeleteButton';
import Icon from 'components/atoms/Icon';

// Constants
import * as COLOR from 'constants/color';
import * as TEXT from 'constants/text';

// Styles
import styles from './MyProjectsItem.scss';

interface DataProps {
  projectTitle: string;
  lyric: string;
  trackDataPath: string;
  trackTitle: string;
  artistName: string;
  artWorkPath: string;
}

interface Props extends DataProps {
  navigation: any;
}

const MyProjectsItem = (props: Props) => {
  const swipeable = useRef<Swipeable>(null);
  const dispatch = useDispatch();
  const activeHiddenState = useSelector((state) => state.overlay.inactiveHidden);
  const { uid }: any = firebaseAuth.currentUser;
  if (!uid) return;
  const docRef = doc(db, 'users', uid);

  useEffect(() => {
    onSnapshot(docRef, () => {
      swipeable.current?.close();
    });
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
    dispatch(showCenterModal());
    dispatch(setCenterModalTitle(TEXT.MODAL_TITLE_DELETE_PROJECT));
    dispatch(setCenterModalDataTitle(setProjectData.projectTitle));
    dispatch(setCenterModalDescription(TEXT.MODAL_DESC_DELETE_NOTE));
    dispatch(setCenterModalSubmitButtonText);
    dispatch(setMyProjectsDetail(setProjectData));
  };

  const setProjectData = {
    projectTitle: props.projectTitle,
    lyric: props.lyric,
    trackDataPath: props.trackDataPath,
    trackTitle: props.trackTitle,
    artistName: props.artistName,
    artWorkPath: props.artWorkPath
  };

  return (
    <Swipeable
      ref={ swipeable }
      renderRightActions={ renderRightActions }
      rightThreshold={ 44 }
    >
      <TouchableOpacity
        style={ styles.container }
        onPress={ navigateEditProject }
        activeOpacity={ 1 }>
        <View style={ styles.artwork }>
          <Image
            style={ styles.image }
            source={
              props.artWorkPath
              ? props.artWorkPath
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
