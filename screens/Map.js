import React, {useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import Geolocation from 'react-native-geolocation-service';

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
export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Example App',
        message: 'Example App access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      alert('You can use the location');
    } else {
      console.log('location permission denied');
      alert('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
export default class Map extends Component {
  state = {
    region: {
      latitude: 51.5078788,
      longitude: -0.0877321,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    },
  };
  async componentWillMount() {
    await requestLocationPermission();
  }
  onRegionChange(region) {
    this.setState({region});
  }
  render() {
    return (
      <MapView
        style={{flex: 1}}
        region={this.region}
        onRegionChange={this.onRegionChange}>
        <Marker coordinate={{latitude: 51.5078788, longitude: -0.0877321}} />
      </MapView>
    );
  }
}
