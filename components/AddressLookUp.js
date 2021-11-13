import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {ScrollView} from 'react-native';
const API_KEY = 'AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc';
export default function AddressLookUp({
  location,
  setAddress,
  setCoordinates,
  style,
}) {
  return (
    <GooglePlacesAutocomplete
      currentLocation
      placeholder="Address"
      placeholderTextColor="black"
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: 'distance',
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        setAddress(data.description);
        setCoordinates({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.009,
          longitudeDelta: 0.0009,
        });
      }}
      query={{
        key: API_KEY,
        language: 'en',
        components: 'country:us',
        location: `${location.latitude},${location.longitude}`,
      }}
      styles={{
        container: {
          width: '100%',
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 5,
          zIndex: 1,
          flex: 1,
          flexGrow: 1,
          position: 'absolute',
        },
      }}
    />
  );
}

const containerStyle = {backgroundColor: 'white', padding: 20};
