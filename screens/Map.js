import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, View, ScrollView} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Button, Text} from 'react-native';
//import DeviceInfo from 'react-native-device-info';
import {getAllEvents, getAllEventsByEventType} from '../api/mapsApi';
import {getAllEventsByVisiblity} from '../api/mapsApi';
import {useIsFocused} from '@react-navigation/core';
import MapFilterOptions from '../components/MapFilterOptions';
import getMapStyles from '../components/MapsStyles';
import AutocompleteInput from 'react-native-autocomplete-input';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';

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
  return (
    <>
      <MapView
        style={styles.map}
        region={focusRegion}
        customMapStyle={getMapStyles()}
        showsUserLocation={true}>
        {applyFilter
          ? filteredEventsList.map(eventInfo => (
              <Marker
                key={eventInfo.event_id}
                coordinate={eventInfo.event_coordinates}
                onPress={() => {
                  navigation.navigate('EventDetailsPage', {
                    eventDetails: eventInfo,
                  });
                }}></Marker>
            ))
          : eventsList.map(eventInfo => (
              <Marker
                key={eventInfo.event_id}
                coordinate={eventInfo.event_coordinates}
                onPress={() => {
                  navigation.navigate('EventDetailsPage', {
                    eventDetails: eventInfo,
                  });
                }}></Marker>
            ))}
      </MapView>

      <View style={styles.autocompleteContainer}>
        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          onSelectItem={item => {
            if (item && item.title) {
              handleFilter(item.title);
            }
          }}
          textInputProps={textinput_props}
          dataSet={autocomplete_data}
          onClear={handleClear}
        />
      </View>
    </>
  );
}

const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';

const autocomplete_data = [
  {id: '1', title: 'fair'},
  {id: '2', title: 'sport'},
  {id: '3', title: 'seminar'},
  {id: '4', title: 'fundraiser'},
];

const textinput_props = {
  placeholder: 'Enter an event type',
};

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
});
