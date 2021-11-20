import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import {SliderBox} from 'react-native-image-slider-box';
import {IconButton} from 'react-native-paper';

export default function EventDescriptionAndImageSelect() {
  const [images, setImages] = useState([]);

  const LAUCH_IMAGE_PICKER_OPTIONS = {
    selectionLimit: 5,
    includeBase64: true,
    mediaType: 'photo',
  };

  const LAUNCH_CAMERA_OPTIONS = {
    saveToPhotos: true,
    selectionLimit: 5,
    includeBase64: true,
    mediaType: 'photo',
    cameraType: 'back',
  };

  const handleImage = selectImages => {
    setImages([...images, ...selectImages]);
  };

  const getAllUri = () => {
    const res = [];
    images.forEach(image => {
      res.push(image.uri);
    });
    return res;
  };

  const selectFile = () => {
    ImagePicker.launchImageLibrary(LAUCH_IMAGE_PICKER_OPTIONS, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorCode) {
        console.log('Error Code: ', res.errorCode);
      } else if (res.errorMessage) {
        console.log('Image Picker Erro: ', res.errorMessage);
      } else {
        handleImage(res.assets);
      }
    });
  };
  const imagesUpLoaded = images.length > 0 && images != null;

  return (
    <View style={styles.container}>
      {imagesUpLoaded && (
        <View
          style={{flex: 1, flexDirection: 'row', maxHeight: 300, margin: 15}}>
          <SliderBox images={getAllUri()} sliderBoxHeight={300} />
        </View>
      )}
      <View style={{flexDirection: 'row'}}>
        <IconButton
          icon="upload"
          size={40}
          color={ORANGE}
          onPress={selectFile}
          style={styles.button}></IconButton>
      </View>
    </View>
  );
}
const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';

const TITLE_COLOR = BLUE;
const SUBTITLE_COLOR = ORANGE;
const ICON_SIZE = 27;
const BACKGROUND_COLOR = WHITE;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
});
