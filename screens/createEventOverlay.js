import React, {useState, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ViewBase,
  TextInput,
  Button,
} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import Geolocation from 'react-native-geolocation-service';
import DropDownPicker from 'react-native-dropdown-picker';
import {addEvent} from '../api/mapsApi';
import {useNavigation} from '@react-navigation/core';
const BORDER_COLOR = '#000000';
const TEXT_COLOR = '#142E45';
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
  },
  textStyle: {
    marginLeft: 10,
    color: TEXT_COLOR,
    fontSize: 25,
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
    borderRadius: 20,
    backgroundColor: '#5bff33',
  },
  pickerStyle: {
    width: '70%',
  },
});

export default function createEventOverlay() {
  const state = {
    open: false,
    value: null,
    items: ['Public', 'Private'],
    title: '',
    address: '',
    date: '',
    time: '',
    visibility: '',
    description: '',
  };
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('N/A');
  const [open, setOpen] = useState(false);
  const [eventVisibility, setEventVisibility] = useState('public');
  const [visibilityOptions, setVisibilityOptions] = useState([
    {label: 'Public', value: 'public'},
    {label: 'Private', value: 'private'},
  ]);

  const titleRef = useRef();
  const addressRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: TEXT_COLOR, fontSize: 40, marginBottom: 30}}>
        Create Event
      </Text>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Title</Text>
        <TextInput
          ref={titleRef}
          style={styles.inputStyle}
          onChangeText={value => setTitle(value)}
          placeholder=" Enter Here"></TextInput>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Address</Text>
        <TextInput
          ref={addressRef}
          style={styles.inputStyle}
          onChangeText={value => setAddress(value)}
          placeholder=" Enter Here"></TextInput>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Date</Text>
        <TextInput
          ref={dateRef}
          style={styles.inputStyle}
          onChangeText={value => setDate(value)}
          placeholder=" Enter Here"></TextInput>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Time</Text>
        <TextInput
          ref={timeRef}
          style={styles.inputStyle}
          onChangeText={value => setTime(value)}
          placeholder=" Enter Here"></TextInput>
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
            style={{flex: 1, alignSelf: 'stretch'}}
            ref={descriptionRef}
            onChangeText={value => setDescription(value)}
            placeholder=" Enter Description"></TextInput>
        </View>
      </View>
      <View style={styles.rowStyle}>
        <Button
          title="create"
          style={styles.buttonStyle}
          onPress={() => {
            console.log(eventVisibility);
            addEvent({
              title: title,
              address: address,
              date: date,
              time: time,
              visibility: eventVisibility,
              description: description,
            });
            navigation.navigate('Map');
          }}></Button>
      </View>
    </View>
  );
}
