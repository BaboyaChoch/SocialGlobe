import React, {useEffect, useState, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Text, Linking} from 'react-native';
import {Button} from 'react-native-paper';
//import DeviceInfo from 'react-native-device-info';
import {getAllEventsByEventType} from '../api/mapsApi';
import {getAllEventsByVisiblity} from '../api/mapsApi';
import {useIsFocused} from '@react-navigation/core';
import getMapStyles from '../components/MapsStyles';
import EventTypeSearch from '../components/EventTypeSearch';
import Route from '../components/Route';

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
  const [locationPermissionResult, setLocationPermissionResult] =
    useState('not_granted');
  const [createEventIsVisible, setCreateEventIsVisiblility] = useState(false);
  const [filterQuery, setFilterQuery] = useState();
  const [currentUserSelection, setCurrentUserSelection] = useState();
  const [userDestinations, setUserDestinations] = useState([{}]);
  const [modeOfTransport, setModeOfTransport] = useState();
  const [routeResult, setRouteResult] = useState();
  const [routeIsReady, setRouteIsReady] = useState(false);
  const [routeDetailsIsReady, setRouteDetailsIsReady] = useState(false);
  const [isChooseTravelModeVisible, setIsChooseTravelModeVisible] =
    useState(false);
  const mapRef = useRef(null);
  const [currentUserSelection, setCurrentUserSelection] = useState();
  function geoSuccess(position) {
    const coordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.0009,
    };
    setCurrentUserLocation(coordinates);
    setFocusRegion(coordinates);
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
      setLocationPermissionResult(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getUserLocation();
      } else {
        console.log('Location denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  const onFilteringEventsRecieved = events => {
    setFilteredEventsList(events);
    setFocusRegion(events[0].event_coordinates);
    setApplyFilter(true);
  };
  const filterMapByFilterOption = filterOption => {
    getAllEventsByEventType(filterOption, onFilteringEventsRecieved);
  };

  const handleFilter = filterOption => {
    filterMapByFilterOption(filterOption);
  };
  const handleClear = () => {
    setFilteredEventsList([]);
    setApplyFilter(false);
    setFocusRegion(currentUserLocation);
  };

  useEffect(() => {
    requestLocationPermission();
    getAllEventsByVisiblity('public', onEventsRecieved);
  }, [isFocused]);

  useEffect(() => {
    console.log(filterQuery);
  }, [filterQuery]);

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
      dest: userDestinations,
      selection: currentUserSelection,
      origin: currentUserLocation,
      mode: modeOfTransport,
    });
  }, [routeIsReady]);

  return (
    <>
      <MapView
        style={styles.map}
        region={focusRegion}
        customMapStyle={getMapStyles()}
        showsUserLocation={true}
        ref={mapRef}>
        {!routeIsReady && applyFilter
          ? filteredEventsList.map(eventInfo => (
              <CreateEventEventMarker
                onPress={() => setCurrentUserSelection(eventInfo)}
                key={eventInfo.event_id}
                eventInfo={eventInfo}
                origin={currentUserLocation}
                modeOfTransport={modeOfTransport}
                currentOrigin={currentUserLocation}
                handleNavigate={setIsChooseTravelModeVisible}
              />
            ))
          : eventsList.map(eventInfo => (
              <CreateEventEventMarker
                onPress={() => setCurrentUserSelection(eventInfo)}
                key={eventInfo.event_id}
                eventInfo={eventInfo}
                origin={currentUserLocation}
                modeOfTransport={modeOfTransport}
                currentOrigin={currentUserLocation}
                handleNavigate={setIsChooseTravelModeVisible}
              />
            ))}

        {routeIsReady && (
          <Route
            origin={currentUserLocation}
            destinations={coordinateForDestinations}
            modeOfTransport={modeOfTransport}
            mapRef={mapRef}
            handleRouteResult={param => setRouteResult(param)}
          />
        )}
      </MapView>
      <View style={styles.autocompleteContainer}>
        <EventTypeSearch
          handleFilter={handleFilter}
          handleClear={handleClear}
        />
      </View>
      <View style={styles.nav}>
        {routeIsReady && (
          <Button
            icon="navigation"
            onPress={() => Linking.openURL(url)}
            labelStyle={{color: BLUE}}>
            Get Directions
          </Button>
        )}
      </View>
      {routeIsReady && routeDetailsIsReady && (
        <View style={styles.navs}>
          <Text
            style={
              styles.routeDetails
            }>{`   ${routeResult.estimatedDistance} miles  ${routeResult.estimatedDuration} mins`}</Text>
        </View>
      )}
      {routeIsReady && (
        <View style={styles.endRouteButton}>
          <Button
            onPress={() => {
              setRouteIsReady(false);
            }}
            title="End Route"
          />
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
          currentDestination={currentUserSelection}
        />
      </View>
    </>
  );
}

const url = Platform.select({
  ios: 'maps:' + 30.41428 + ',' + -91.17700090000001 + '?q=' + 'Event Here!',
  android: 'geo:' + 30.41428 + ',' + -91.17700090000001 + '?q=' + 'Event Here!',
});

const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';

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
    top: '90%', //for center align
    alignSelf: 'flex-end', //for align to right
  },
  filterOptionsContainer: {
    position: 'absolute', //use absolute position to show button on top of the map
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  autocompleteContainer: {
    position: 'absolute',
    top: '0%', //for center align
    alignSelf: 'flex-start', //for align to right
    width: '100%',
  },
  routeDetails: {
    fontSize: 15,
    height: 50,
    borderColor: 'red',
    borderWidth: 5,
    width: 200,
    color: 'red',
  },
  endRouteButton: {
    position: 'absolute',
    top: '80%',
    alignSelf: 'flex-end',
  },
  navs: {
    position: 'absolute', //use absolute position to show button on top of the map
    top: '90%', //for center align
    alignSelf: 'flex-start', //for align to right
    backgroundColor: 'white',
  },
});
