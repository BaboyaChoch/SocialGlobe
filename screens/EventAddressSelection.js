import {useIsFocused} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {IconButton, Button, Snackbar} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import getMapStyles from '../components/MapsStyles';
import AddressLookUp from '../components/AddressLookup';
const defaultLocation = {
  latitude: 0,
  longitude: 0,
  longitudeDelta: 0.09,
  latitudeDelta: 0.09,
};

export default function EventAddressSelection({route, navigation}) {
  const {eventDetails} = route.params;
  const [location, setLocation] = useState(defaultLocation);
  const [currentUserLocation, setCurrentUserLocation] = useState();
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [isLocationReady, setIsLocationReady] = useState(false);
  const [showAddressMissingSnackbar, setShowAddressMissingSnackbar] =
    useState(false);
  const screenIsFocused = useIsFocused();

  const handleData = () => {
    if (address != null && coordinates != null) {
      eventDetails.event_address = address;
      eventDetails.event_coordinates = coordinates;
      navigation.navigate('EventDescriptionAndImageSelect', {
        eventDetails: eventDetails,
      });
    } else {
      setShowAddressMissingSnackbar(true);
    }
  };

  const geoSuccess = position => {
    const coordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.0009,
    };

    setLocation(coordinates);
    setCurrentUserLocation(coordinates);
    setIsLocationReady(true);
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
  const handleOnpress = coordinates => {
    coordinates.latitudeDelta = 0.009;
    coordinates.longitudeDelta = 0.009;
    setLocation(coordinates);
  };

  const handleSnackbarDismiss = () => {
    setShowAddressMissingSnackbar(false);
  };
  useEffect(() => {
    getUserLocation();
  }, [screenIsFocused]);

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.search}>
          {isLocationReady && (
            <AddressLookUp
              location={currentUserLocation}
              setAddress={setAddress}
              setCoordinates={setCoordinates}
              handleLocation={setLocation}
            />
          )}
        </View>
        <MapView
          customMapStyle={getMapStyles()}
          style={styles.map}
          region={location}
          showsUserLocation={true}
          onPress={data => {
            handleOnpress(data.nativeEvent.coordinate);
          }}>
          <Marker coordinate={location}></Marker>
        </MapView>
        <View style={styles.nav}>
          <Button
            icon="arrow-right"
            mode="text"
            style={styles.button}
            color={BLUE}
            onPress={handleData}
            labelStyle={{fontSize: 20}}>
            Continue
          </Button>
        </View>
      </View>
      <Snackbar
        visible={showAddressMissingSnackbar}
        onDismiss={handleSnackbarDismiss}
        action={{
          label: 'Ok',
          onPress: () => {
            setShowAddressMissingSnackbar(false);
          },
        }}>
        Please Enter A Valid Address
      </Snackbar>
    </>
  );
}

// const GREEN = '#19a86a';
// const BLUE = '#002f4c';
const GREEN = '#5dca73';
const BLUE = '#3366ff';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';
const ICON_SIZE = 50;
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
    position: 'absolute',
    top: '94%',
    alignSelf: 'flex-end',
  },
  search: {
    position: 'absolute',
    top: '0%',
    alignSelf: 'center',
    width: '100%',
  },
  button: {},
});
