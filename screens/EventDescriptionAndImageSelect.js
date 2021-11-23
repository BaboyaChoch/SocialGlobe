import React, {useState, useEffect} from 'react';

import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import {SliderBox} from 'react-native-image-slider-box';
import {IconButton, Divider, Card, Paragraph, Button} from 'react-native-paper';

export default function EventDescriptionAndImageSelect({route, navigation}) {
  const [images, setImages] = useState([
    'https://content.hostgator.com/img/weebly_image_sample.png',
  ]);

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
    setImages(selectImages);
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

  useEffect(() => {
    console.log(route.params.eventDetails);
  }, []);

  return (
    <View style={styles.container}>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          backgroundColor: GRAY,
          width: '100%',
        }}>
        <Button
          icon="pencil"
          size={25}
          color={BLUE}
          onPress={selectFile}
          style={styles.button}
          mode="contained">
          Edit
        </Button>
        <Button
          icon="upload"
          size={25}
          color={BLUE}
          onPress={selectFile}
          style={styles.button}
          mode="contained">
          Upload
        </Button>
      </View> */}

      <SliderBox
        images={images}
        sliderBoxHeight={300}
        onCurrentImagePressed={selectFile}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView style={{marginHorizontal: 2}}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Card style={{backgroundColor: WHITE, height: 300}}>
              <Card.Content>
                <Paragraph style={styles.textInputStyle}>
                  {'Enter Description'}
                </Paragraph>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';
const GRAY = '#d7d7d7';

const TITLE_COLOR = BLUE;
const ICON_SIZE = 27;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: WHITE,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    margin: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  textInputStyle: {color: BLUE, fontSize: 14, fontWeight: '300'},
});
