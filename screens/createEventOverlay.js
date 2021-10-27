import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {addEvent} from '../api/mapsApi';
import {useNavigation} from '@react-navigation/core';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {ScrollView} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';

if (Platform.OS == 'ios') {
  Geolocation.setRNConfiguration({
    authorizationLevel: 'always',
  });
  Geolocation.requestAuthorization();
}

const BORDER_COLOR = '#000000';
const TEXT_COLOR = '#142E45';
const API_KEY = 'AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc';

export default function createEventOverlay() {
  const navigation = useNavigation();
  const [currentUserLocation, setCurrentUserLocation] = useState({
    latitude: 30.4077484,
    longitude: -91.1794054,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  const [title, setTitle] = useState('N/A');
  const [address, setAddress] = useState('N/A');
  const [eventCoordinates, setEventCoordinates] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.009,
    longitudeDelta: 0.0009,
  });
  const [date, setDate] = useState('N/A');
  const [time, setTime] = useState('N/A');
  const [description, setDescription] = useState('N/A');
  const [open, setOpen] = useState(false);
  const [eventVisibility, setEventVisibility] = useState('public');
  const [visibilityOptions, setVisibilityOptions] = useState([
    {label: 'Public', value: 'public'},
    {label: 'Private', value: 'private'},
  ]);

  const titleRef = useRef();
  const addressRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

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
      }}>
      <Text style={{color: TEXT_COLOR, fontSize: 40, marginBottom: 30}}>
        Create Event
      </Text>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Title</Text>
        <TextInput
          ref={titleRef}
          style={styles.inputStyle}
          onChangeText={value => setTitle(value)}
          placeholder=" Enter Here"></TextInput>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Address</Text>
        <View style={styles.inputStyle}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: 'distance',
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setAddress(data);
              setEventCoordinates({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.009,
                longitudeDelta: 0.0009,
              });
              console.log('details', details);
              console.log('data', data);
            }}
            query={{
              key: API_KEY,
              language: 'en',
              components: 'country:us',
              location: `${currentUserLocation.latitude},${currentUserLocation.longitude}`,
            }}
            styles={{
              container: {
                flex: 1,
                position: 'absolute',
                width: '100%',
                zIndex: 1,
              },
              listView: {
                position: 'absolute',
                backgroundColor: '#fffff',
              },
            }}
          />
        </View>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Date</Text>
        <TextInput
          ref={dateRef}
          style={styles.inputStyle}
          onChangeText={value => setDate(value)}
          placeholder=" Enter Here"></TextInput>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Time</Text>
        <TextInput
          ref={timeRef}
          style={styles.inputStyle}
          onChangeText={value => setTime(value)}
          placeholder=" Enter Here"></TextInput>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Visibility</Text>
        <View
          style={{
            height: 50,
            flex: 1,
            paddingRight: 50,
          }}>
          <DropDownPicker
            key={1}
            style={{width: 100, height: 35}}
            open={open}
            value={eventVisibility}
            items={visibilityOptions}
            setOpen={setOpen}
            setValue={setEventVisibility}
            setItems={setVisibilityOptions}
          />
        </View>
      </View>
      <View style={{flexDirection: 'column', height: 200, width: '100%'}}>
        <Text style={styles.textStyle}>Description</Text>
        <View style={styles.inputStyle}>
          <TextInput
            ref={descriptionRef}
            onChangeText={value => setDescription(value)}
            placeholder=" Enter Description"></TextInput>
        </View>
      </View>
      <View style={styles.rowStyle}>
        <Button
          title="create"
          style={styles.buttonStyle}
          onPress={() => {
            console.log(eventVisibility);
            addEvent({
              title: title,
              address: address,
              coordinates: eventCoordinates,
              date: date,
              time: time,
              visibility: eventVisibility,
              description: description,
            });
            navigation.navigate('Map');
          }}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowStyle: {flexDirection: 'row', marginTop: 10},
  inputStyle: {
    height: 50,
    flex: 1,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    color: TEXT_COLOR,
  },
  textStyle: {
    marginLeft: 10,
    color: TEXT_COLOR,
    fontSize: 25,
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
    borderRadius: 20,
    backgroundColor: '#5bff33',
  },
  pickerStyle: {
    width: '70%',
  },
});
