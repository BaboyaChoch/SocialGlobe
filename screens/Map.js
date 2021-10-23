import React, {useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {set} from 'react-native-reanimated';
//import DeviceInfo from 'react-native-device-info';
import {getEvents} from '../api/mapsApi';

if (Platform.OS == 'ios') {
  Geolocation.setRNConfiguration({
    authorizationLevel: 'always',
  });
  Geolocation.requestAuthorization();
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
  buttons: {
    borderRadius: 100,
    position: 'absolute', //use absolute position to show button on top of the map
    top: '95%', //for center align
    alignSelf: 'flex-end', //for align to right
  },
});

const GOOGLE_MAPS_APIKEY = ''; // api key = AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc
const origin = {latitude: 37.78825, longitude: -122.4324};
const destination = {latitude: 37.78895, longitude: -122.4053769};
const coordinates = [
  {latitude: 37.78895, longitude: -122.4053769},
  {latitude: 37.78795, longitude: -122.4153769},
];

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        showsUserLocation={true}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapViewDirections
          apikey={GOOGLE_MAPS_APIKEY}
          origin={coordinates[0]}
          destination={coordinates[1]}
          precision={'high'}
          strokeWidth={4}
          strokeColor="blue"
        />

        <Marker coordinate={origin} title={'test'}></Marker>
        <Polyline
          coordinates={[
            {latitude: 37.78895, longitude: -122.4053769},
            {latitude: 37.78795, longitude: -122.4153769},
          ]}
        />
      </MapView>
    </View>
  );
}
