import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
export default function SetMarker(props) {
  return (
    <Marker
      coordinate={props.coordinate}
      onPress={() => {
        props.onPress;
      }}>
      <View style={styles.centeredView}>
        <View style={styles.markerView}>
          <Text style={styles.markerText}>Title: {props.title}</Text>
          <Text style={styles.markerText}>
            Description: {props.description}
          </Text>
        </View>
      </View>
    </Marker>
  );
}
const styles = StyleSheet.create({
  markerView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  markerText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
