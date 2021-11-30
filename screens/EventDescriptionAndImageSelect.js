import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import {SliderBox} from 'react-native-image-slider-box';
import {
  IconButton,
  Divider,
  Card,
  Paragraph,
  Button,
  Avatar,
  Snackbar,
} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/firestore';
import {firebase as authenticator} from '@react-native-firebase/auth';
import {addEvent} from '../api/mapsApi';
import DropDownPicker from 'react-native-dropdown-picker';
const defaultImage = [
  'https://forwomen.org/wp-content/uploads/2015/09/default-placeholder-300x300.png',
];

export default function EventDescriptionAndImageSelect({route, navigation}) {
  const {eventDetails} = route.params;
  const [images, setImages] = useState(defaultImage);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState();
  const [eventTypeOptions, setEventTypeOptions] = useState([
    {label: 'Fair', value: 'fair'},
    {label: 'Sport', value: 'sport'},
    {label: 'Seminar', value: 'seminar'},
    {label: 'Fundraiser', value: 'fundraiser'},
  ]);
  const [eventType, setEventType] = useState('None');
  const [openEventTypeSelect, setOpenEventTypeSelect] = useState(false);
  const [showEventCreatedSnackbar, setShowEventCreatedSnackbar] =
    useState(false);
  const LAUCH_IMAGE_PICKER_OPTIONS = {
    selectionLimit: 5,
    includeBase64: true,
    mediaType: 'photo',
  };

  const LAUNCH_CAMERA_OPTIONS = {
    saveToPhotos: true,
    selectionLimit: 1,
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

  const savePhoto = async (source, eventId, user) => {
    const image_ref = storage().ref(
      `images/${user.uid}/${eventId}/event_photo1`,
    );
    setIsUploading(true);
    try {
      await image_ref.putFile(source.uri);
      setIsUploading(false);
    } catch (err) {
      console.log('Error: ', err);
    }
    setImages(defaultImage);
  };

  const saveEventDetails = (eventId, user) => {
    eventDetails.event_creater = user.displayName;
    eventDetails.event_user_id = user.uid;
    eventDetails.event_id = eventId;
    eventDetails.event_description = description;
    eventDetails.event_type = eventType;
    addEvent(eventDetails);
  };

  const imagesUpLoaded = images.length > 0 && images != null;
  const LeftContent = props => (
    <Avatar.Icon {...props} icon="folder" style={{backgroundColor: WHITE}} />
  );

  const handleData = () => {
    if (authenticator.auth().currentUser != null) {
      const currentUser = authenticator.auth().currentUser;
      const eventId = firebase.firestore().collection('tmp').doc().id;
      savePhoto(images[0], eventId, currentUser);
      saveEventDetails(eventId, currentUser);
      navigation.navigate('Map');
    } else {
      Alert.alert('Unauthorized User', 'Please Sign In');
    }
  };
  const handleSnackbarDismiss = () => {
    setShowEventCreatedSnackbar(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      <View style={styles.container}>
        <SliderBox
          images={images}
          sliderBoxHeight={300}
          onCurrentImagePressed={selectFile}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            backgroundColor: WHITE,
            width: '100%',
          }}>
          <Button
            icon="pencil"
            color={GREEN}
            onPress={selectFile}
            style={styles.button}
            labelStyle={{color: BLUE}}
            mode={BUTTON_MODE}>
            Edit
          </Button>
          <Button
            icon="upload"
            color={GREEN}
            onPress={selectFile}
            style={styles.button}
            labelStyle={{color: BLUE}}
            mode={BUTTON_MODE}>
            Upload
          </Button>
        </View>
        <View style={{margin: 5}}>
          <DropDownPicker
            key={'eventTypeDropDown'}
            style={styles.eventTypeDropDown}
            open={openEventTypeSelect}
            value={eventType}
            items={eventTypeOptions}
            setOpen={setOpenEventTypeSelect}
            setValue={setEventType}
            setItems={setEventTypeOptions}
            textStyle={styles.textStyle}
            containerStyle={{borderWidth: 0}}
            labelStyle={{marginTop: 2, color: GREEN}}
            defaultValue="None"
            placeholder="Select an event type"
            dropDownDirection="BOTTOM"
            zIndex={100}
          />
        </View>
        <View style={{margin: 10, marginBottom: 5, marginTop: 5}}>
          <Text style={{fontSize: 15, color: BLUE, fontWeight: '500'}}>
            Enter event description below:
          </Text>
        </View>
        <SafeAreaView
          style={{
            marginLeft: 5,
            marginRight: 5,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 2,
            height: 260,
          }}>
          <ScrollView style={{marginHorizontal: 2}}>
            <TextInput
              value={description}
              onChangeText={text => {
                setDescription(text);
              }}
              style={styles.textInputStyle}
              multiline={true}
              numberOfLines={30}
              placeholder="Enter Here"
              placeholderTextColor="gray"></TextInput>
          </ScrollView>
        </SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: WHITE,
            width: '100%',
            marginTop: 10,
          }}>
          <Button
            icon="content-save"
            mode={BUTTON_MODE}
            color={GREEN}
            onPress={handleData}
            labelStyle={{color: BLUE}}>
            Create Event
          </Button>
        </View>
      </View>
      <Snackbar
        visible={showEventCreatedSnackbar}
        onDismiss={handleSnackbarDismiss}>
        Event created!
      </Snackbar>
    </>
  );
}
// const GREEN = '#19a86a';
// const BLUE = '#002f4c';
const GREEN = '#5dca73';
const BLUE = '#3366ff';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';
const GRAY = '#d7d7d7';
const TITLE_COLOR = BLUE;
const ICON_SIZE = 27;
const ICON_COLOR = GREEN;
const BUTTON_MODE = 'text';

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: BLUE,
  },
  container: {
    flex: 1,
    height: 200,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    margin: 5,
    borderWidth: 2,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  textInputStyle: {
    color: BLUE,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 0,
    paddingLeft: 16,
  },
  eventTypeDropDown: {
    shadowColor: '#5cb85c',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    width: 205,
    height: 35,
    borderRadius: 0,
    borderColor: 'black',
    borderWidth: 0.1,
  },
  textStyle: {
    fontWeight: '500',
    fontSize: 17,
    color: BLUE,
  },
});
