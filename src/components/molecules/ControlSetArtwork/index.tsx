import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
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
  }, []);

  const selectImageFile = async () => {
    try {
      const results: any = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const response of results) {
        console.log('response : ' + JSON.stringify(response));
        console.log('URI : ' + response.uri);
        console.log('Type : ' + response.type);
        console.log('File Name : ' + response.name);
        console.log('File Size : ' + response.size);
      }
      setImageFile(results);
      console.log(results);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Canceled from multiple doc picker');
      } else {
        console.log('Unknown Error: ' + JSON.stringify(error));
        throw error;
      }
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
