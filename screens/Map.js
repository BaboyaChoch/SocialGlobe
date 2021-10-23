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

export default class Map extends Component {
  constructor({props}) {
    super(props);
    this.state = {
      region: {
        latitude: 30.4077484,
        longitude: -91.1794054,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      },
      eventsList: [],
    };
  }
  geoSuccess = position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    this.setState({
      region: {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.009,
        longitudeDelta: 0.0009,
      },
    });
  };

  getUserLocation() {
    Geolocation.getCurrentPosition(
      this.geoSuccess,
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
  watchUserLocation() {
    geolocation.watchPosition(info => console.log(info));
  }
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'SocialGlobe',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getUserLocation();
      } else {
        console.log('Location denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  onRegionChange(region) {
    this.setState({region: region});
  }
  onEventAdded(event) {
    this.setState(prevState => ({
      eventsList: [...prevState.eventsList, event],
    }));
  }

  onEventsRecieved(events) {
    //console.log('recieved:', events);
    this.setState({eventsList: events});
  }
  componentDidMount() {
    this.requestLocationPermission().then(info => console.log());
    getEvents(this.onEventsRecieved);
  }

  render() {
    console.log('mapEvents::', this.state.eventsList);
    return (
      <View style={{flex: 1}}>
        <MapView style={styles.map} region={this.state.region}>
          <Marker coordinate={this.state.region} />
        </MapView>
        <View style={styles.buttons}>
          <Button
            onPress={() => {
              console.log('mapEvents2::', this.state.eventsList);
              const {navigation} = this.props;
              navigation.navigate('CreateEvent');
            }}
            title="Create Event"
          />
        </View>
      </View>
    );
  }
}
