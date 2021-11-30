import React, {useEffect} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {ScrollView} from 'react-native';
const API_KEY = 'AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc';
export default function AddressLookUp({
  location,
  setAddress,
  setCoordinates,
  handleLocation,
  style,
}) {
  const handleResult = (data, details = null) => {
    const coordinates = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.009,
      longitudeDelta: 0.0009,
    };
    const address = {
      full_address: details.formatted_address,
      main_text: data.structured_formatting.main_text,
      secondary_text: data.structured_formatting.secondary_text,
    };
    setAddress(address);
    setCoordinates(coordinates);
    handleLocation(coordinates);
  };

  return (
    <GooglePlacesAutocomplete
      placeholder="Search event address then continue"
      placeholderTextColor="black"
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: 'distance',
      }}
      onPress={(data, details = null) => {
        handleResult(data, details);
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
          zIndex: 1,
          flex: 1,
          flexGrow: 1,
          position: 'absolute',
        },
      }}
    />
  );
}

const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';
const GRAY = '#d7d7d7';
const containerStyle = {backgroundColor: 'white', padding: 20};
