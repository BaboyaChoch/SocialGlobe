import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {set} from 'react-native-reanimated';
//import DeviceInfo from 'react-native-device-info';
import {addEvent, getEvents} from '../api/mapsApi';
import {useNavigation} from '@react-navigation/core';
import {useIsFocused} from '@react-navigation/core';
if (Platform.OS == 'ios') {
  Geolocation.setRNConfiguration({
    authorizationLevel: 'always',
  });
  Geolocation.requestAuthorization();
}

export default function Map() {
  const [currentUserLocation, setCurrentUserLocation] = useState({
    latitude: 30.4077484,
    longitude: -91.1794054,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [eventsList, setEventsList] = useState([]);
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

  function watchUserLocation() {
    geolocation.watchPosition(info => console.log(info));
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

  function oncurrentUserLocationChange(location) {
    setCurrentUserLocation({location});
  }

  function onEventAdded(event) {
    setEventsList([...eventsList, event]);
  }

  const onEventsRecieved = eventsList => {
    setEventsList(eventsList);
  };

  function showUserPrivateEvents() {
    eventsList.map(eventInfo => {
      const userBelongsToGroup = true;
      if (eventInfo.visibility === 'private' && userBelongsToGroup)
        console.log(eventInfo.coordinates);
      //return <Marker coordinate={eventInfo.coordinates} />;
    });
  }

  function showPublicEvents() {
    eventsList.map(eventInfo => {
      if (eventInfo.visibility === 'public') {
        console.log(eventInfo.title, ':', eventInfo.coordinates);
        <Marker coordinate={eventInfo.coordinates}></Marker>;
      }
    });
  }

  useEffect(() => {
    requestLocationPermission();
    getEvents(onEventsRecieved);
    console.log(currentUserLocation);
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <MapView style={styles.map} region={currentUserLocation}>
        {eventsList.map(marker => (
          <Marker coordinate={marker.coordinates}></Marker>
        ))}
      </MapView>
      <View style={styles.nav}>
        <Button
          onPress={() => {
            navigation.navigate('CreateEvent');
          }}
          title="Create Event"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  nav: {
    position: 'absolute', //use absolute position to show button on top of the map
    top: '95%', //for center align
    alignSelf: 'flex-end', //for align to right
  },
});
