import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Components
import Icon from 'components/atoms/Icon';

// Constants
import * as COLOR from 'constants/color';
import * as SVGPATH from 'constants/svgPath';

// Styles
import styles from './ControlSetArtwork.scss';

const ControlSetArtwork = () => {
  const [imageFile, setImageFile] = useState<string[]>([]);

  useEffect(() => {
  }, [imageFile]);

  const selectImageFile = async () => {
    try {
      const options = {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 300,
        maxHeight: 300
      };
      const results: any = await ImagePicker.launchImageLibrary(options);
      setImageFile(results.assets);
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
            imageFile.length
            ? imageFile
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
