import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Button,ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {set} from 'react-native-reanimated';
//import DeviceInfo from 'react-native-device-info';
import {addEvent, getEvents} from '../api/mapsApi';
import {useNavigation} from '@react-navigation/core';
//importing paper
import { Chip } from 'react-native-paper';

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
  const [applyFilter, setApplyFilter] = useState(false);
  const [filteredEventsList, setFilteredEventsList] = useState([]);
  var disableChip = false;

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

  

  function showChipEvents(arg){
    const filteringResults = []; 
    for (let i = 0; i < eventsList.length; i++) {
      if (eventsList[i].eventType === arg){
        filteringResults.push(eventsList[i])
      }
    }
    setFilteredEventsList(filteringResults)
    setApplyFilter(true)
  }

  return (
   <View style = {{flex: 1}}> 
      <MapView style={styles.map} region={currentUserLocation}>
      {!applyFilter && eventsList.map(eventInfo => (
          <Marker
            key={eventInfo.eventId}
            coordinate={eventInfo.coordinates}
            onPress={() => {
              navigation.navigate('EventDetailsPage', {details: eventInfo});
            }}></Marker>
        ))}
        {applyFilter && filteredEventsList.map(eventInfo => (
          <Marker
            key={eventInfo.eventId}
            coordinate={eventInfo.coordinates}
            onPress={() => {
              navigation.navigate('EventDetailsPage', {details: eventInfo});
            }}></Marker>
        ))}
      </MapView>

        <View style={styles.nav}>
        <Button
          onPress={() => {
            navigation.navigate('CreateEvent');
          }}
          title="Create Event"
        />
      </View> 
      
        <ScrollView horizontal style={styles.ScrollView}  showsHorizontalScrollIndicator={false}>
          <Chip  mode ="outlined" style ={styles.chipStyle} onPress={() => setApplyFilter(false)}>Remove Filters</Chip>
            <Chip mode ="outlined"  style ={styles.chipStyle}  onPress={() => showChipEvents("nearby") }>Nearby</Chip> 
              <Chip  mode ="outlined" style ={styles.chipStyle} onPress={() => showChipEvents("fair")}>Fairs</Chip>
            <Chip mode ="outlined" style ={styles.chipStyle} onPress={() => showChipEvents("sport")}>Sport</Chip>
              <Chip mode ="outlined" style ={styles.chipStyle}  onPress={() => showChipEvents("gaming")}>Gaming</Chip>
            <Chip  mode ="outlined" style ={styles.chipStyle} onPress={() => showChipEvents("seminar")}>Seminars</Chip>
              <Chip  mode ="outlined" style ={styles.chipStyle} onPress={() => showChipEvents("fundraiser")}>Fundraisers</Chip>
            <Chip  mode ="outlined" style ={styles.chipStyle} onPress={() => showChipEvents("workshop")}>Workshops</Chip> 
        </ScrollView> 

    </View>
      );
    }
   
 /*  return (
    <View style={{flex: 1}}>
      <MapView style={styles.map} region={currentUserLocation}>
        {eventsList.map(marker => (
          <Marker coordinate={marker.coordinates}></Marker>
        ))}
      </MapView>
      <View style={styles.nav}>
        <Button
          onPress={() => {
            navigation.navigate('CreateEvent');
          }}
          title="Create Event"
        />
      </View>    
      <ScrollView style = {styles.ScrollView}>
              <Chip mode ="outlined" onPress={() => console.log('1')}>Nearby</Chip>
                <Chip  mode ="outlined" onPress={() => console.log('2')}>Fairs</Chip>
              <Chip mode ="outlined" onPress={() => console.log('3')}>Sport</Chip>
                <Chip mode ="outlined" onPress={() => console.log('4')}>Gaming</Chip>
              <Chip  mode ="outlined" onPress={() => console.log('5')}>Nearby</Chip>
                <Chip  mode ="outlined" onPress={() => console.log('6')}>Gaming</Chip>
                <Chip  mode ="outlined" onPress={() => console.log('6')}>Gaming</Chip>
      </ScrollView>   
    </View>
    );
    */


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
    position: 'relative', //use absolute position to show button on top of the map
    top: '95%', //for center align
    alignSelf: 'flex-end', //for align to right
  },
  ScrollView: {
    position: 'absolute', //use absolute position to show button on top of the map
   alignSelf: 'flex-start',
    flexDirection: "row",
    //margin: 2,
    
  },
  chipStyle: {
    margin: 3,

  },
});
