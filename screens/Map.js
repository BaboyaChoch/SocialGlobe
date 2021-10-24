import React, {useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Polyline, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {set} from 'react-native-reanimated';
import MapViewDirections from 'react-native-maps-directions';
//import DeviceInfo from 'react-native-device-info';
import {getEvents} from '../api/mapsApi';

const GOOGLE_MAPS_APIKEY = ''; // api key = AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc

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

const origin = {latitude: 37.78825, longitude: -122.4324};
const destination = {latitude: 37.78895, longitude: -122.4053769};
const waypoints = [
  {latitude: 37.77931171567034, longitude: -122.43359206702804},
  {latitude: 37.777398395622996, longitude: -122.42647912078746},
  {latitude: 37.77989057960354, longitude: -122.42186444974531},
];

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        showsUserLocation={true}
        rotateEnabled={false}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapViewDirections
          apikey={GOOGLE_MAPS_APIKEY}
          origin={waypoints[0]}
          destination={waypoints[waypoints.length - 1]}
          precision={'high'}
          strokeWidth={4}
          strokeColor="blue"
          onStart={params => {
            console.log(
              `Started routing between "${params.origin}" and "${params.destination}"`,
            );
          }}
          onReady={result => {
            console.log(
              `Distance: ${(result.distance / 1.609).toFixed(2)} miles`,
            );
            console.log(`Duration: ${result.duration} minutes`);
          }}
        />
      </MapView>
    </View>
  );
}
