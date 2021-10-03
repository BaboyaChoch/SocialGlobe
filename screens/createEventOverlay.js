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
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  rowStyle: {flexDirection: 'row', marginTop: 10},
  inputStyle: {
    height: 50,
    flex: 1,
    borderColor: '#5bff33',
    borderWidth: 1,
    borderRadius: 20,
    paddingRight: 50,
  },
  textStyle: {
    color: '#42efdc',
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
});

export default class createEventOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: ['Address', 'Privacy', 'Description'],
    };
  }
  const [selectedLanguage, setSelectedLanguage] = useState();
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>Title</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=" Enter Here"></TextInput>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>Address</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=" Enter Here"></TextInput>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>Date</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=" Enter Here"></TextInput>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>Time</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=" Enter Here"></TextInput>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textStyle}>Visibility</Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Public" value="Public" />
            <Picker.Item label="Private" value="Private" />
          </Picker>
        </View>
        /**
         *if selectedValue == Private
         *show option to select group  
         */
        <View style={{flexDirection: 'column', height: 200, width: '100%'}}>
          <Text style={styles.textStyle}>Description</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=" Enter Here"></TextInput>
        </View>
        <View style={styles.rowStyle}>
          <Button title="create" style={styles.buttonStyle}></Button>
        </View>
      </View>
    );
  }
}
