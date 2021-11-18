import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {addEvent} from '../api/mapsApi';
import {TextInput, Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import Geolocation from 'react-native-geolocation-service';
import DatePicker from 'react-native-date-picker';
import FileCard from '../components/FileCard';
import AddressLookUp from '../components/AddressLookUp';
import AddressAutoComplete from '../components/AddressAutoComplete';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fumi} from 'react-native-textinput-effects';

const BORDER_COLOR = 'black';
const TEXT_COLOR = 'black';
const GREEN = '#66f5a7';
const PLACEHOLDER_COLOR = 'black';
const BUTTON_COLOR = 'gray';

if (Platform.OS == 'ios') {
  Geolocation.setRNConfiguration({
    authorizationLevel: 'always',
  });
  Geolocation.requestAuthorization();
}

export default function CreateEventOverlay() {
  const [currentUserLocation, setCurrentUserLocation] = useState({
    latitude: 30.4077484,
    longitude: -91.1794054,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [eventCoordinates, setEventCoordinates] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.009,
    longitudeDelta: 0.0009,
  });
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [eventVisibility, setEventVisibility] = useState('public');
  const [visibilityOptions, setVisibilityOptions] = useState([
    {label: 'Public', value: 'public'},
    {label: 'Private', value: 'private'},
  ]);
  const [eventPictures, setEventPictures] = useState([
    {title: 'image1.txt'},
    {title: 'image2.txt'},
    {title: 'image3.txt'},
  ]);
  const navigation = useNavigation();
  const [isVisible, setVisibility] = useState(false);
  function geoSuccess(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    setCurrentUserLocation({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.009,
      longitudeDelta: 0.0009,
    });
  }

  function getUserLocation() {
    Geolocation.getCurrentPosition(
      geoSuccess,
      err => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'SocialGlobe',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getUserLocation();
      } else {
        console.log('Location denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  function createEvent() {
    const EVENT = {
      title: title,
      address: address,
      coordinates: eventCoordinates,
      date: date,
      visibility: eventVisibility,
      description: description,
    };
    addEvent(EVENT);
    navigation.navigate('Map');
  }
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue',
      }}>
      <View style={{marginTop: 15}}>
        <Text stlyle={styles.inputStyle}>Enter event information below!</Text>
      </View>
      <View style={styles.rowStyle}>
        <Fumi
          value={title}
          onChangeText={text => {
            setTitle(text);
          }}
          label={'Title'}
          style={{flex: 1, margin: 15}}
          iconClass={MaterialCommunityIcons}
          iconName={'tag-text-outline'}
          iconColor={ICON_COLOR}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={styles.inputBoxStyle}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <AddressAutoComplete
          containerStyle={{
            width: '92.5%',
            marginLeft: 15,
            marginRight: 15,
            marginTop: 5,
            marginBottom: 5,
            height: 50,
            position: 'relative',
            flex: 1,
            elevation: 8,
            zIndex: 1,
          }}
          address={address}
          setAddress={setAddress}
          boxStyle={{}}
          iconColor={ICON_COLOR}
        />
      </View>
      <View style={styles.rowStyle}>
        <Fumi
          value={description}
          onChangeText={text => {
            setDescription(text);
          }}
          label={'Description'}
          style={{
            width: '100%',
            height: 5000,
            shadowColor: '#5cb85c',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 8,
            margin: 15,
            marginBottom: 0,
            flex: 1,
          }}
          iconClass={MaterialCommunityIcons}
          iconName={'pencil'}
          iconColor={ICON_COLOR}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
        />
      </View>
      <View style={{flexDirection: 'row', margin: 15, marginBottom: 0}}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setOpen(true)}>
          <Text>Date</Text>
        </TouchableOpacity>
        <Text
          style={{
            width: '80%',
            flexDirection: 'row',
            borderRadius: 5,
            fontSize: 15,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
          }}>
          {`${date.toLocaleString()}`}
        </Text>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      {/* <View
        style={{
          flexDirection: 'column',
          height: 200,
          width: '100%',
          margin: 0,
        }}
        height="50%">
        <TextInput
          label="Description"
          mode="outlined"
          value={description}
          style={{margin: 15, height: 300, borderColor: GREEN}}
          multiline={true}
          onChangeText={value => setDescription(value)}
          placeholder=" Enter Description"
          placeholderTextColor={PLACEHOLDER_COLOR}></TextInput>
      </View> */}
      <View style={styles.rowStyle}>
        <View style={{flexDirection: 'row', margin: 15}}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              setEventPictures([...eventPictures, {title: 'test'}]);
            }}>
            <Text>Upload</Text>
          </TouchableOpacity>
          <View
            style={{
              width: '80%',
              borderWidth: 1,
              borderColor: 'gray',
              flexDirection: 'row',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {eventPictures.map((file, index) => (
              <FileCard cardTitle={index} fileName={file.title} />
            ))}
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 15}}>
        <TouchableOpacity style={styles.buttonStyle} onPress={createEvent}>
          <Text>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ICON_COLOR = '#5bc0de';
const styles = StyleSheet.create({
  rowStyle: {flexDirection: 'row'},
  inputBoxStyle: {
    width: '100%',
    height: 50,
    shadowColor: '#5cb85c',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    margin: 15,
    marginBottom: 0,
    flex: 1,
  },
  inputStyle: {
    color: 'red',
  },
  textStyle: {
    marginLeft: 10,
    color: TEXT_COLOR,
    fontSize: 15,
    height: 50,
    //borderColor: '#5bff33',
    //borderWidth: 2,
    //borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: BUTTON_COLOR,
    padding: 10,
    marginRight: 5,
    borderWidth: 1.5,
    borderColor: BUTTON_COLOR,
    borderRadius: 5,
  },
  pickerStyle: {
    width: '70%',
  },
  shadow: {
    borderColor: 'gray', // if you need
    borderWidth: 1,
    overflow: 'hidden',
  },
  createButton: {
    marginBottom: 15,
  },
});
