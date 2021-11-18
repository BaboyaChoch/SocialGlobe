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
const GREEN = '#e6fdf0';

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
  const isFocused = useIsFocused();

  const [eventsList, setEventsList] = useState([]);
  const [createEventIsVisible, setCreateEventIsVisiblility] = useState(false);

  function closeCreatEvent() {
    setCreateEventIsVisiblility(false);
  }

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
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'EST',
        timeZoneName: 'short',
      };
      console.log(new Date(eventInfo.date).toLocaleString('en-US', options));
    });
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
    getEvents(onEventsRecieved);
  }, [isFocused]);

  const mapStyle = [
    {
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ];

  //showPublicEvents();
  return (
    <View style={{flex: 1}}>
      <MapView
        style={styles.map}
        customMapStyle={MAP_STYLES}
        region={currentUserLocation}>
        {eventsList.map(eventInfo => (
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
});
