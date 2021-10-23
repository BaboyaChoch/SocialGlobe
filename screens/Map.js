/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MapView, {PROVIDER_GOOGLE, Polyline, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';
import {StyleSheet, View, Platform, SafeAreaView} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {requestLocationAccuracy} from 'react-native-permissions';
import {request, PERMISSIONS} from 'react-native-permissions';
import {Component} from 'react';

requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    var response = request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log('iPhone: ' + response);
    if (request === 'granted') {
      this.locateCurrentPosition();
    }
  } else {
    var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    console.log('Android: ' + response);

    if (request === 'granted') {
      this.locateCurrentPosition();
      this.requestLocationPermission();
    }
  }
};

locateCurrentPosition = () => {
  Geolocation.getCurrentPosition(position => {
    console.log(JSON.stringify(position));
  });
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
