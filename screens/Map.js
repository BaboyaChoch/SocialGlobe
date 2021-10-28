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
import Modal from 'react-native-modal';
const GREEN = '#e6fdf0';
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
  }, []);

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

  return (
    <View style={{flex: 1}}>
      <View style={{position: 'absolute'}}>
        <Modal
          isVisible={createEventIsVisible}
          onBackButtonPress={() => {
            setCreateEventIsVisiblility(false);
          }}
          backdropOpacity={0.1}
          animationIn="bounceIn"
          animationOut="bounceOut"
          animationInTiming={750}
          animationInTiming={750}>
          <View style={styles.createEventWindowStyles}>
            <CreateEventOverlay
              closeWindow={closeCreatEvent}
              onEventAdded={onEventAdded}
              currentCoordinates={currentUserLocation}></CreateEventOverlay>
          </View>
        </Modal>
      </View>
      <MapView
        style={styles.map}
        customMapStyle={{}}
        region={currentUserLocation}>
        {eventsList.map(marker => (
          <Marker coordinate={marker.coordinates}></Marker>
        ))}
      </MapView>
      <View style={styles.nav}>
        <Button
          onPress={() => {
            setCreateEventIsVisiblility(true);
            //navigation.navigate('CreateEvent');
          }}
          title="Create Event"
        />
      </View>
    </View>
  );
}

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
