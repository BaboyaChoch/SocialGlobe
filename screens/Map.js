import React, {useEffect, useState, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Modal,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Button} from 'react-native';
import {IconButton, Colors, Divider} from 'react-native-paper';
//import DeviceInfo from 'react-native-device-info';

import {useNavigation} from '@react-navigation/core';
import {useIsFocused} from '@react-navigation/core';
import MapViewDirections from 'react-native-maps-directions';
import CreateEventEventMarker from '../components/CreateEventMarker';
import SelectTravelModeModal from '../components/SelectTravelModeModal';
import Route from '../components/Route';
import {getEvents} from '../api/mapsApi';

if (Platform.OS == 'ios') {
  Geolocation.setRNConfiguration({
    authorizationLevel: 'always',
  });
  Geolocation.requestAuthorization();
}

export default function Map({route, navigation}) {
  const eventToAdd = route.params;
  console.log('Maps Pags: ', eventToAdd);
  const [currentUserLocation, setCurrentUserLocation] = useState({
    latitude: 30.4077484,
    longitude: -91.1794054,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  const isFocused = useIsFocused();
  const [currentUserSelection, setCurrentUserSelection] = useState();
  const [eventsList, setEventsList] = useState([]);
  const [createEventIsVisible, setCreateEventIsVisiblility] = useState(false);
  const [userDestinations, setUserDestinations] = useState([{}]);
  const [modeOfTransport, setModeOfTransport] = useState();
  const [routeResult, setRouteResult] = useState();
  const [routeIsReady, setRouteIsReady] = useState(false);
  const [routeDetailsIsReady, setRouteDetailsIsReady] = useState(false);
  const [isChooseTravelModeVisible, setIsChooseTravelModeVisible] =
    useState(false);
  const mapRef = useRef(null);

  const {width, height} = Dimensions.get('window');
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
    //console.log(currentUserLocation);
  });
  useEffect(() => {
    requestLocationPermission();
    getEvents(onEventsRecieved);
  }, [isFocused]);

  useEffect(() => {
    if (routeResult != undefined) {
      //console.log('map.js', routeResult);
      setRouteDetailsIsReady(true);
    }
  }, [routeResult]);

  useEffect(() => {
    if (currentUserSelection != undefined) {
      console.log('selection:', currentUserSelection);
    }
  }, [currentUserSelection]);

  useEffect(() => {
    console.log({
      currentPage: 'map.js',
      dest: currentUserSelection,
      selection: currentUserSelection,
      origin: currentUserLocation,
      mode: modeOfTransport,
    });
  }, [routeIsReady]);

  return (
    <View style={{flex: 1}}>
      <MapView ref={mapRef} style={styles.map} region={currentUserLocation}>
        {eventsList.map(eventInfo => (
          <CreateEventEventMarker
            onPress={() => setCurrentUserSelection(eventInfo)}
            key={eventInfo.eventId}
            eventInfo={eventInfo}
            origin={currentUserLocation}
            modeOfTransport={modeOfTransport}
            handleSelection={setCurrentUserSelection}
            currentOrigin={currentUserLocation}
            handleNavigate={setIsChooseTravelModeVisible}
          />
        ))}

        {routeIsReady && (
          <Route
            origin={currentUserLocation}
            destinations={userDestinations}
            modeOfTransport={modeOfTransport}
            mapRef={mapRef}
            handleRouteResult={param => setRouteResult(param)}
          />
        )}
      </MapView>
      {routeIsReady && routeDetailsIsReady && (
        <View style={styles.nav}>
          <Text
            style={
              styles.routeDetails
            }>{`${routeResult.estimatedDistance}------${routeResult.estimatedDuration}`}</Text>
        </View>
      )}
      <View>
        <SelectTravelModeModal
          selectionOnclick={setModeOfTransport}
          visible={isChooseTravelModeVisible}
          handleVisisble={setIsChooseTravelModeVisible}
          handleRouteReady={setRouteIsReady}
          destinations={userDestinations}
          currentOrigin={currentUserSelection}
          handleDestinations={setUserDestinations}
          currentDestination={currentUserLocation}
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
    alignSelf: 'flex-end', //for align to righ
    flexDirection: 'column',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginVertical: 55,
    marginHorizontal: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  alignButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  divider: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  routeDetails: {
    fontSize: 15,
    height: 50,
    borderColor: 'red',
    borderWidth: 5,
    width: 200,
    color: 'red',
  },
  textCont: {
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
  },
});
