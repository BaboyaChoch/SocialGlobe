import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {addEvent} from '../api/mapsApi';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const BORDER_COLOR = 'black';
const TEXT_COLOR = 'black';
const API_KEY = 'AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc';
const GREEN = '#66f5a7';
const PLACEHOLDER_COLOR = 'black';

export default function CreateEventOverlay({
  currentCoordinates,
  closeWindow,
  onEventAdded,
}) {
  const [title, setTitle] = useState('N/A');
  const [address, setAddress] = useState('N/A');
  const [eventCoordinates, setEventCoordinates] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.009,
    longitudeDelta: 0.0009,
  });
  const [date, setDate] = useState('N/A');
  const [time, setTime] = useState('N/A');
  const [description, setDescription] = useState('N/A');
  const [open, setOpen] = useState(false);
  const [eventVisibility, setEventVisibility] = useState('public');
  const [visibilityOptions, setVisibilityOptions] = useState([
    {label: 'Public', value: 'public'},
    {label: 'Private', value: 'private'},
  ]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
      }}>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Title</Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={value => setTitle(value)}
          placeholder=" Enter Here"
          placeholderTextColor={PLACEHOLDER_COLOR}></TextInput>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Address</Text>
        <View style={styles.inputStyle}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: 'distance',
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setAddress(data.description);
              setEventCoordinates({
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
              location: `${currentCoordinates.latitude},${currentCoordinates.longitude}`,
            }}
            styles={{
              container: {
                flex: 1,
                position: 'absolute',
                width: '100%',
                zIndex: 1,
              },
              listView: {
                position: 'absolute',
                backgroundColor: '#fffff',
              },
            }}
          />
        </View>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Date</Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={value => setDate(value)}
          placeholder=" Enter Here"
          placeholderTextColor={PLACEHOLDER_COLOR}></TextInput>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Time</Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={value => setTime(value)}
          placeholder=" Enter Here"
          placeholderTextColor={PLACEHOLDER_COLOR}></TextInput>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Visibility</Text>
        <View
          style={{
            height: 50,
            flex: 1,
            paddingRight: 50,
          }}>
          <DropDownPicker
            key={1}
            style={{width: 100, height: 35}}
            open={open}
            value={eventVisibility}
            items={visibilityOptions}
            setOpen={setOpen}
            setValue={setEventVisibility}
            setItems={setVisibilityOptions}
          />
        </View>
      </View>
      <View style={{flexDirection: 'column', height: 200, width: '100%'}}>
        <Text style={styles.textStyle}>Description</Text>
        <View style={styles.inputStyle}>
          <TextInput
            style={{}}
            multiline={true}
            onChangeText={value => setDescription(value)}
            placeholder=" Enter Description"
            placeholderTextColor={PLACEHOLDER_COLOR}></TextInput>
        </View>
      </View>
      <View style={styles.rowStyle}>
        <Button
          title="create"
          style={styles.buttonStyle}
          color={GREEN}
          accessibilityLabel="Tap to Create Event"
          onPress={() => {
            const EVENT = {
              title: title,
              address: address,
              coordinates: eventCoordinates,
              date: date,
              time: time,
              visibility: eventVisibility,
              description: description,
            };
            closeWindow();
            addEvent(EVENT);
            onEventAdded(EVENT);
            ///navigation.navigate('Map');
          }}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowStyle: {flexDirection: 'row', marginTop: 10},
  inputStyle: {
    height: 50,
    flex: 1,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    color: TEXT_COLOR,
    flexGrow: 1,
  },
  textStyle: {
    marginLeft: 10,
    color: TEXT_COLOR,
    fontSize: 15,
    height: 50,
    //borderColor: '#5bff33',
    //borderWidth: 2,
    //borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonStyle: {
    position: 'absolute',
    borderRadius: 110,
    color: 'red',
  },
  pickerStyle: {
    width: '70%',
  },
});
