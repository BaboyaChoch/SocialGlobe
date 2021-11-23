import { useIsFocused } from '@react-navigation/core';
import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import { Marker } from 'react-native-maps';
import { IconButton } from 'react-native-paper';

export default function EventAddressSelection() {

  const [location,setLocation]
  const screenISFocused = useIsFocused()

  const geoSuccess = (position) => {
    const coordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.0009,
    };

    setLocation(coordinates);
  }

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
  }
  
  useEffect( () => {
    getUserLocation()
  },[screenISFocused])

  return (
    <View style={{flex: 1}}>
      <MapView style={styles.map} region={location}>
        <Marker coordinate={location}></Marker>
      </MapView>
      <View style={styles.nav}>
        <IconButton icon="arrow-right" size={50} color={ORANGE} />
      </View>
    </View>
  );
}

const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';
const ICON_SIZE = 32;
const ICON_COLOR = '#e29e21';
const BORDER_COLOR = '#000000';
const TEXT_COLOR = 'black';

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
