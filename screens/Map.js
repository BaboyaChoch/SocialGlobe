import React, {useState} from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {set} from 'react-native-reanimated';
//import DeviceInfo from 'react-native-device-info';
import {addEvent, getEvents} from '../api/mapsApi';

const GOOGLE_MAPS_APIKEY = ''; //api key = AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc ; remove key if not using

if (Platform.OS == 'ios') {
  Geolocation.setRNConfiguration({
    authorizationLevel: 'always',
  });
  Geolocation.requestAuthorization();
}
function eventMarker(props) {
  return <Marker coordinate={props.coordinates}></Marker>;
}
export default class Map extends Component {
  constructor({props}) {
    super(props);
    this.setCoordsState = {
      coordinates: [
        {latitude: 37.78825, longitude: -122.4324},
        {latitude: 37.78895, longitude: -122.4053769},
        {latitude: 37.771707, longitude: -122.4053769},
      ],
    };

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
  onMapPress = e => {
    this.setCoordsState({
      coordinates: [
        ...this.setCoordsState.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  };
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
      eventsList: [],
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

  // onEventsRecieved(events) {
  //   console.log('recieved:', events);
  //   this.setState({eventsList: events});
  // }

  onEventsRecieved = eventsList => {
    this.setState(prevState => ({
      eventsList: (prevState.eventsList = eventsList),
    }));
  };
  componentDidMount() {
    this.requestLocationPermission().then(info => console.log());
    getEvents(this.onEventsRecieved);
  }
  showUserPrivateEvents() {
    this.state.eventsList.map(eventInfo => {
      const userBelongsToGroup = true;
      if (eventInfo.visibility === 'private' && userBelongsToGroup)
        console.log(eventInfo.coordinates);
      //return <Marker coordinate={eventInfo.coordinates} />;
    });
  }
  showPublicEvents() {
    this.state.eventsList.map(eventInfo => {
      if (eventInfo.visibility === 'public') {
        console.log(eventInfo.coordinates);
        return <Marker coordinate={eventInfo.coordinates} />;
      }
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <MapView style={styles.map} region={this.state.region}>
          {this.showPublicEvents()}
          {this.setCoordsState.coordinates.length >= 2 && (
            <MapViewDirections
              apikey={GOOGLE_MAPS_APIKEY}
              origin={this.setCoordsState.coordinates[0]}
              waypoints={
                this.setCoordsState.coordinates.length > 2
                  ? this.setCoordsState.coordinates.slice(1, -1)
                  : undefined
              }
              destination={
                this.setCoordsState.coordinates[
                  this.setCoordsState.coordinates.length - 1
                ]
              }
              precision={'high'}
              optimizeWaypoints={true}
              strokeWidth={4}
              strokeColor="blue"
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}" `,
                );
              }}
              onReady={result => {
                console.log(
                  `Distance: ${(result.distance / 1.609).toFixed(2)} miles`,
                );
                console.log(`Duration: ${result.duration.toFixed(0)} minutes`);
              }}
              onError={errorMessage => {
                console.log('Error: MapViewDirections');
              }}
            />
          )}
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
