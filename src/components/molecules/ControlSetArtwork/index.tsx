import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Store
import { useSelector } from 'store/index';
import { setArtWork } from 'store/NewProjectSlice';

// Components
import Icon from 'components/atoms/Icon';

// Constants
import * as COLOR from 'constants/color';
import * as SVGPATH from 'constants/svgPath';

// Styles
import styles from './ControlSetArtwork.scss';

const ControlSetArtwork = () => {
  const dispatch = useDispatch();
  const artWork = useSelector((state) => state.newProject.artWork);

  useEffect(() => {
  }, []);

  const selectImageFile = async () => {
    try {
      const options = {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 300,
        maxHeight: 300
      };
      const results: any = await ImagePicker.launchImageLibrary(options);
      dispatch(setArtWork(results.assets));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.artwork }>
        <Image
          style={ styles.image }
          source={
            artWork.length
            ? artWork
            : require('src/assets/images/common/no-artwork-large.jpg')
          }
        />
      </View>
      <TouchableOpacity
        activeOpacity={ 1 }
        style={ styles.button }
        onPress={ selectImageFile }>
        <Icon
          svgType={ 1 }
          width="24"
          height="23.999"
          viewBox="0 0 24 23.999"
          gTransform="translate(0 -0.001)"
          pathD1={ SVGPATH.ICON_EDIT_PATH1 }
          pathTransform1="translate(0 0)"
          pathD2={ SVGPATH.ICON_EDIT_PATH2 }
          pathTransform2="translate(0 0)"
          pathD3={ SVGPATH.ICON_EDIT_PATH3 }
          pathTransform3="translate(0 0)"
          pathFill={ COLOR.COLOR_GRAY_TYPE2 }
          containerStyle={ styles.icon }
        />
      </TouchableOpacity>
    </View>
  );
};

export default ControlSetArtwork;
