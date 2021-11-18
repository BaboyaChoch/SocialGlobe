import React, {useEffect, useState, useRef} from 'react';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {set} from 'react-native-reanimated';
//import DeviceInfo from 'react-native-device-info';
import {addEvent, getEvents} from '../api/mapsApi';
import {useNavigation} from '@react-navigation/core';
import {useIsFocused} from '@react-navigation/core';
import MapViewDirections from 'react-native-maps-directions';
import SetMarker from '../components/MarkerCard';
import UseModal from '../components/UseModal';

const GOOGLE_MAPS_APIKEY = ''; //api key = AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc ; remove key if not using
const coordinates = [
  {
    longitude: -91.1873842,
    latitude: 30.4227145,
    latitudeDelta: 0.009,
    longitudeDelta: 0.0009,
  },
  {
    longitude: -91.1879546,
    latitude: 30.4211469,
    latitudeDelta: 0.009,
    longitudeDelta: 0.0009,
  },
  {
    longitude: -91.17617969999999,
    latitude: 30.4186758,
    latitudeDelta: 0.009,
    longitudeDelta: 0.0009,
  },
];

if (Platform.OS == 'ios') {
  Geolocation.setRNConfiguration({
    authorizationLevel: 'always',
  });
  Geolocation.requestAuthorization();
}

export default function Map() {
  const {width, height} = Dimensions.get('window');
  const mapView = useRef();
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
    Geolocation.watchPosition(
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
    console.log(eventsList);
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
      <MapView style={styles.map} region={currentUserLocation} ref={mapView}>
        {eventsList.map(eventInfo => (
          <UseModal
            coordinate={eventInfo.coordinates}
            title={eventInfo.title}
            description={eventInfo.description}
          />
        ))}

        {coordinates.length >= 2 && (
          <MapViewDirections
            apikey={GOOGLE_MAPS_APIKEY}
            origin={currentUserLocation}
            waypoints={
              coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
            }
            destination={coordinates[coordinates.length - 1]}
            precision={'high'}
            optimizeWaypoints={true}
            strokeWidth={5}
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

              mapView.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
            onError={errorMessage => {
              console.log('Error: MapviewDirections');
            }}
          />
        )}
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
