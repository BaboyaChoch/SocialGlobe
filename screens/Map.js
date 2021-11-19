import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, View, ScrollView} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Button} from 'react-native';
//import DeviceInfo from 'react-native-device-info';
import {getEvents} from '../api/mapsApi';
import {useNavigation} from '@react-navigation/core';
import {useIsFocused} from '@react-navigation/core';
import CreateEventOverlay from './createEventOverlay';
import MapFilterOptions from '../components/MapFilterOptions';

if (Platform.OS == 'ios') {
  Geolocation.setRNConfiguration({
    authorizationLevel: 'always',
  });
  Geolocation.requestAuthorization();
}

export default function Map({route, navigation}) {
  const eventToAdd = route.params;
  //console.log('Maps Pags: ', eventToAdd);
  const [currentUserLocation, setCurrentUserLocation] = useState({
    latitude: 30.4077484,
    longitude: -91.1794054,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  const [focusRegion, setFocusRegion] = useState(currentUserLocation);
  const isFocused = useIsFocused();
  const [eventsList, setEventsList] = useState([]);
  const [applyFilter, setApplyFilter] = useState(false);
  const [filteredEventsList, setFilteredEventsList] = useState([]);
  const [createEventIsVisible, setCreateEventIsVisiblility] = useState(false);

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

  function oncurrentUserLocationChange(location) {
    setCurrentUserLocation({location});
  }

  const onEventsRecieved = eventsList => {
    setEventsList(eventsList);
  };

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

  const filterOutByEventType = filterOption => {
    setFilteredEventsList([]);
    eventsList.forEach(event => {
      if (event.eventType === filterOption) {
        setFilteredEventsList([...filteredEventsList, event]);
      }
    });
  };
  const filterMapByFilterOption = filterOption => {
    setFilteredEventsList([]);
    eventsList.forEach(event => {
      if (event.eventType === filterOption) {
        setFilteredEventsList([...filteredEventsList, event]);
      }
    });
    if (filteredEventsList.length > 0) {
      setFilteredEventsList(filterOutByEventType);
      setApplyFilter(true);
      setFocusRegion(filteredEventsList[0].coordinates);
      console.log(filteredEventsList);
    } else {
      console.log('SnackBar:', `Currently No Events of Type '${filterOption}'`);
    }
  };
  const filteredEventsListIsNotEmpty = () =>
    filteredEventsList != null &&
    filteredEventsList != undefined &&
    filteredEventsList.length > 0;

  useEffect(() => {
    requestLocationPermission();
    getEvents(onEventsRecieved);
  }, [isFocused]);

  useEffect(() => {}, [filteredEventsList]);

  console.log(filteredEventsList);

  return (
    <View style={{flex: 1}}>
      <MapView style={styles.map} region={focusRegion}>
        {!applyFilter &&
          eventsList.map(eventInfo => (
            <Marker
              key={eventInfo.eventId}
              coordinate={eventInfo.coordinates}
              onPress={() => {
                navigation.navigate('EventDetailsPage', {
                  eventDetails: eventInfo,
                });
              }}></Marker>
          ))}
        {applyFilter &&
          filteredEventsListIsNotEmpty() &&
          filteredEventsList.map(eventInfo => (
            <Marker
              key={eventInfo.eventId}
              coordinate={eventInfo.coordinates}
              onPress={() => {
                navigation.navigate('EventDetailsPage', {
                  eventDetails: eventInfo,
                });
              }}></Marker>
          ))}
      </MapView>
      <View>
        <MapFilterOptions onPress={filterMapByFilterOption}></MapFilterOptions>
      </View>
    </View>
  );
}

const MAP_STYLES = [
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 13,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#19a86a',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 14,
      },
      {
        weight: 1.4,
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#19a86a',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        lightness: 5,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#19a86a',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#002f4c',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        lightness: '100',
      },
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#002f4c',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        color: '#002f4c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#04111a',
      },
    ],
  },
];
const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';
const styles = StyleSheet.create({
  createEventWindowStyles: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '80%',
    borderRadius: 20,
  },
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
  filterOptionsContainer: {
    position: 'absolute', //use absolute position to show button on top of the map
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
});
