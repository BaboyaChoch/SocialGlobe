import React, {useEffect, useState, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  PermissionsAndroid,
  Platform,
  Text,
  Linking,
  Dimensions,
} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
//import DeviceInfo from 'react-native-device-info';
import {getAllEventsByEventType} from '../api/mapsApi';
import {getAllEventsByVisiblity} from '../api/mapsApi';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import getMapStyles from '../components/MapsStyles';
import getMarkerIconByEventType from '../components/MapsStyles';
import EventTypeSearch from '../components/EventTypeSearch';
import Route from '../components/Route';
import EventMarker from '../components/EventMarker';
import AppActionCenter from '../components/AppActionCenter';
import {Animated} from 'react-native';
import MiniEventInfoCard from './MiniEventInfoCard';
import {RotationGestureHandler, State} from 'react-native-gesture-handler';
import AppColors from '../components/AppColors';

export default function Map({route}) {
  let createRoute = false;
  let createTour = false;
  let eventToAdd = null;
  let transportMode = null;

  if (route.params != undefined) {
    eventToAdd = route.params.eventToAdd;
    createRoute = route.params.createRoute;
    createTour = route.params.createTour;
    if (createRoute) {
      transportMode = route.params.transportMode;
    }
  }

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
  const [scrollViewAnimation, setScrollViewAnimation] = useState(
    new Animated.Value(0),
  );
  const [routeMarkers, setRouteMarkers] = useState([]);

  const mapRef = useRef(null);
  let mapIndex = 0;

  const mapScrollAnimation = markerList => {
    scrollViewAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index > filteredEventsList.length) {
        index = filteredEventsList.length = 1;
      }
      if (index <= 0) {
        index = 0;
      }
      const duration = 350;
      clearTimeout(mapRegionTimeOut);
      const mapRegionTimeOut = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          if (
            filteredEventsList[index] != undefined &&
            filteredEventsList[index] != null
          ) {
            const coordinates = filteredEventsList[index].event_coordinates;
            mapRef.current.animateToRegion(coordinates, duration);
            console.log(filteredEventsList[index]);
          } else {
            console.log('Err: Undefined Event');
          }
        }
      }, 10);
    });
  };

  const interpolations = filteredEventsList.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = scrollViewAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  useEffect(() => {
    scrollViewAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index > filteredEventsList.length) {
        index = filteredEventsList.length = 1;
      }
      if (index <= 0) {
        index = 0;
      }
      const duration = 500;
      clearTimeout(mapRegionTimeOut);
      const mapRegionTimeOut = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          if (
            filteredEventsList[index] != undefined &&
            filteredEventsList[index] != null
          ) {
            const coordinates = filteredEventsList[index].event_coordinates;
            mapRef.current.animateToRegion(coordinates, duration);
          } else {
          }
        }
      }, 10);
    });
  });

  const geoSuccess = position => {
    const coordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.0009,
    };
    setCurrentUserLocation(coordinates);
    if (applyFilter) {
      setFocusRegion(filteredEventsList[0].event_coordinates);
    } else {
      setFocusRegion(coordinates);
    }
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
          getAllEventsByVisiblity('public', onEventsRecieved);
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
    console.log(events);
    setFocusRegion(events[0].event_coordinates);
    setApplyFilter(true);
  };

  const filterMapByFilterOption = filterOption => {
    getAllEventsByEventType(filterOption, onFilteringEventsRecieved);
  };

  const handleFilter = filterOption => {
    setFilteredEventsList([]);
    filterMapByFilterOption(filterOption);
  };

  const handleClear = () => {
    setFilteredEventsList([]);
    setApplyFilter(false);
    setShowFilterSearchBar(false);
    setFocusRegion(currentUserLocation);
  };
  const handleCloseRoute = () => {
    setRouteIsReady(false);
    setRouteMarkers([]);
  };

  const getDirectionsFromNativeMapsApp = () => {
    const latitude = eventToAdd.event_coordinates.latitude;
    const longitude = eventToAdd.event_coordinates.longitude;

    const url = Platform.select({
      ios:
        'maps:' +
        latitude +
        ',' +
        longitude +
        '?q=' +
        eventToAdd.event_address.full_address,
      android:
        'geo:' +
        latitude +
        ',' +
        longitude +
        '?q=' +
        eventToAdd.event_address.full_address,
    });

    Linking.openURL(url);
  };

  const getEventMarker = eventType => {};
  useEffect(() => {
    requestLocationPermission();
    setScrollViewAnimation(new Animated.Value(0));
  }, [isFocused]);

  useEffect(() => {
    if (createRoute && !createTour) {
      console.log(route.params);
      const destinationCoordinates = eventToAdd.event_coordinates;
      const waypoints = [currentUserLocation, destinationCoordinates];
      setUserDestinations([...userDestinations, destinationCoordinates]);
      setModeOfTransport(transportMode);
      setRouteMarkers(waypoints);
      setRouteIsReady(true);
    }
  }, [isFocused]);

  const isFilteredListFilled =
    filteredEventsList.length > 0 &&
    filteredEventsList != null &&
    filteredEventsList != undefined;

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={focusRegion}
        customMapStyle={getMapStyles()}
        showsUserLocation={true}>
        {applyFilter &&
          !routeIsReady &&
          filteredEventsList.map((eventInfo, index) => (
            <EventMarker
              key={index}
              event={eventInfo}
              scaleStyle={{
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              }}
            />
          ))}
        {!applyFilter &&
          !routeIsReady &&
          eventsList.map((eventInfo, index) => (
            <EventMarker key={index} event={eventInfo} />
          ))}
        {routeIsReady &&
          createRoute &&
          routeMarkers.map((coordinates, index) => (
            <Marker key={index} coordinate={coordinates} />
          ))}
        {routeIsReady && createRoute && (
          <Route
            origin={currentUserLocation}
            destinations={userDestinations}
            modeOfTransport={'DRIVING'}
            mapRef={mapRef}
            handleRouteResult={param => setRouteResult(param)}
          />
        )}
      </MapView>
      {applyFilter && isFilteredListFilled && (
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          snapToInterval={CARD_WIDTH + 10}
          snapToAlignment="center"
          style={styles.eventScrollView}
          contentContainerStyle={styles.cont}
          contentContainerStyle={{
            paddingHorizontal:
              Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollViewAnimation}}}],
            {useNativeDriver: true},
          )}>
          {filteredEventsList.map(
            (details, index) => (
              console.log(filteredEventsList),
              (
                <MiniEventInfoCard
                  key={index}
                  eventDetails={details}
                  isBookmark={true}
                />
              )
            ),
          )}
        </Animated.ScrollView>
      )}
      <View style={styles.autocompleteContainer}>
        {showFilterSearchBar && (
          <EventTypeSearch
            handleFilter={handleFilter}
            handleClear={handleClear}
          />
        )}
      </View>
      {!applyFilter && !routeIsReady && (
        <AppActionCenter handleSearch={setShowFilterSearchBar} />
      )}
      <View style={styles.directions}>
        {routeIsReady && (
          <IconButton
            icon="directions"
            size={30}
            color={AppColors.BLUE}
            onPress={() => getDirectionsFromNativeMapsApp()}
            labelStyle={{color: AppColors.BLUE}}>
            Get Directions
          </IconButton>
        )}
      </View>
      <View style={styles.reset}>
        {routeIsReady && (
          <IconButton
            icon="close-circle-outline"
            size={30}
            color="red"
            onPress={() => handleCloseRoute()}
            labelStyle={{color: AppColors.BLUE}}>
            Get Directions
          </IconButton>
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

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = 320;

const CARD_HEIGHT = 190;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  directions: {
    position: 'absolute',
    top: '78%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  reset: {
    position: 'absolute',
    top: '85%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
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
    bottom: 0,
    left: 0,
    right: 0,
  },
  cont: {},
});
