import React, {useState} from 'react';
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

export default class createEventOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.pickerRef = React.createRef();
    this.setValue = this.setValue.bind(this);
  }

  setOpen(open) {
    this.setState({
      open,
    });
  }

  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value),
    }));
  }

  setItems(callback) {
    this.setState(state => ({
      items: callback(state.items),
    }));
  }

  render() {
    const {open, value, items} = this.state;
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
            ref="title"
            style={styles.inputStyle}
            onChangeText={value => this.setState({title: value})}
            placeholder=" Enter Here"></TextInput>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>Address</Text>
          <TextInput
            ref="address"
            style={styles.inputStyle}
            onChangeText={value => this.setState({address: value})}
            placeholder=" Enter Here"></TextInput>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>Date</Text>
          <TextInput
            ref="date"
            style={styles.inputStyle}
            onChangeText={value => this.setState({date: value})}
            placeholder=" Enter Here"></TextInput>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>Time</Text>
          <TextInput
            ref="time"
            style={styles.inputStyle}
            onChangeText={value => this.setState({time: value})}
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
              ref="visibility"
              style={{width: '100%'}}
              open={open}
              value={value}
              items={items}
              setOpen={this.setOpen}
              setValue={this.setValue}
              setItems={this.setItems}
            />
          </View>
        </View>
        <View style={{flexDirection: 'column', height: 200, width: '100%'}}>
          <Text style={styles.textStyle}>Description</Text>
          <View style={styles.inputStyle}>
            <TextInput
              ref="description"
              onChangeText={value => this.setState({description: value})}
              placeholder=" Enter Description"></TextInput>
          </View>
        </View>
        <View style={styles.rowStyle}>
          <Button
            title="create"
            style={styles.buttonStyle}
            onPress={() => {
              // addEvent({
              //   title: this.state.title,
              //   address: this.state.address,
              //   date: this.state.date,
              //   time: this.state.time,
              //   visibility: this.state.visibility,
              //   description: this.state.description,
              // });

              const {navigation} = this.props;
              navigation.navigate('Map');
            }}></Button>
        </View>
      </View>
    );
  }
}
