import React, {useEffect, useState, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Text, Linking} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
//import DeviceInfo from 'react-native-device-info';
import {getAllEventsByEventType} from '../api/mapsApi';
import {getAllEventsByVisiblity} from '../api/mapsApi';
import {useIsFocused} from '@react-navigation/core';
import getMapStyles from '../components/MapsStyles';
import getMarkerIconByEventType from '../components/MapsStyles';
import EventTypeSearch from '../components/EventTypeSearch';
import Route from '../components/Route';
import EventMarker from '../components/EventMarker';
import AppActionCenter from '../components/AppActionCenter';
import {Animated} from 'react-native';
import MiniEventInfoCard from './MiniEventInfoCard';

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
  const [showFilterSearchBar, setShowFilterSearchBar] = useState(false);
  const mapRef = useRef(null);

  const geoSuccess = position => {
    const coordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.0009,
    };
    setCurrentUserLocation(coordinates);
    setFocusRegion(coordinates);
  };

  const getUserLocation = () => {
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
  };

  const watchUserLocation = () => {
    geolocation.watchPosition(info => console.log(info));
  };

  const oncurrentUserLocationChange = location => {
    setCurrentUserLocation({location});
  };

  const onEventsRecieved = eventsList => {
    setEventsList(eventsList);
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS == 'ios') {
        Geolocation.setRNConfiguration({
          authorizationLevel: 'always',
        });
        Geolocation.requestAuthorization();
      } else {
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
      }
    } catch (err) {
      console.warn(err);
    }
  };
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

  const getEventMarker = eventType => {};
  useEffect(() => {
    requestLocationPermission();
    getAllEventsByVisiblity('public', onEventsRecieved);
  }, [isFocused]);

  useEffect(() => {
    console.log(filterQuery);
  }, [filterQuery]);

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={focusRegion}
        customMapStyle={getMapStyles()}
        showsUserLocation={true}>
        {applyFilter
          ? filteredEventsList.map(eventInfo => (
              <EventMarker event={eventInfo} />
            ))
          : eventsList.map(eventInfo => <EventMarker event={eventInfo} />)}
        {routeIsReady && (
          <Route
            origin={currentUserLocation}
            destinations={[
              {},
              {
                latitude: 30.41428,
                latitudeDelta: 0.009,
                longitude: -91.17700090000001,
                longitudeDelta: 0.0009,
              },
            ]}
            modeOfTransport={'DRIVING'}
            mapRef={mapRef}
            handleRouteResult={param => setRouteResult(param)}
          />
        )}
      </MapView>
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        snapToInterval={50}
        style={styles.eventScrollView}
        contentContainerStyle={styles.cont}>
        {eventsList.map((details, index) => (
          <MiniEventInfoCard
            key={index}
            eventDetails={details}
            isBookmark={true}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.autocompleteContainer}>
        {showFilterSearchBar && (
          <EventTypeSearch
            handleFilter={handleFilter}
            handleClear={handleClear}
          />
        )}
      </View>
      <AppActionCenter
        style={styles.actionButton}
        handleSearch={setShowFilterSearchBar}
      />
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
    </>
  );
}

const url = Platform.select({
  ios: 'maps:' + 30.41428 + ',' + -91.17700090000001 + '?q=' + 'Event Here!',
  android: 'geo:' + 30.41428 + ',' + -91.17700090000001 + '?q=' + 'Event Here!',
});

const MARKER_STYLES = {
  fair: '../asssets/fair_marker.png',
  seminar: '../asssets/seminar_marker.png',
  fundraiser: '../asssets/fundraiser_marker.png',
  sports: '../asssets/sports_marker.png',
  multiple_events: '../asssets/multiple_events_marker.png',
  private_events: '../asssets/private_event_marker.png',
};

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
    position: 'absolute',
    top: '80%',
    alignSelf: 'flex-end',
  },
  actionButton: {
    position: 'absolute',
    width: 150,
    height: 150,
    alignSelf: 'flex-end',
    top: '78%',
    left: 265,
  },
  filterOptionsContainer: {
    position: 'absolute',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  autocompleteContainer: {
    position: 'absolute',
    top: '0%',
    alignSelf: 'flex-start',
    width: '100%',
  },
  eventScrollView: {
    position: 'absolute',
    top: '67%',
  },
  cont: {},
});
