import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';

import {IconButton, Colors, Divider} from 'react-native-paper';

export default function SelectTravelModeModal(props) {
  console.log('in modes modal');

  const setTravelModeAndShowRoute = travelMode => {
    props.selectionOnclick(travelMode);
    props.handleVisisble(false);
    props.handleRouteReady(true);
    props.handleDestinations(props.currentUserSelection);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        style={styles.centeredView}
        onRequestClose={() => {
          props.handleVisisble(false);
        }}>
        <TouchableWithoutFeedback
          onPressOut={() => {
            props.handleVisisble(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalText, styles.modalTitle]}>
                Gerald's Castle
              </Text>
              <Text style={[styles.modalText, , {fontSize: 16}]}>
                Distance: {props.distance}
                {'\n'}
                Duration: {props.duration}
              </Text>
              <Divider />
              <View style={styles.alignButton}>
                <IconButton
                  icon="walk"
                  color={Colors.black}
                  size={40}
                  onPress={() => {
                    setTravelModeAndShowRoute('WALKING');
                  }}
                />
                <IconButton
                  icon="bike"
                  color={Colors.blue300}
                  size={40}
                  onPress={() => {
                    setTravelModeAndShowRoute('BICYCLING');
                  }}
                />
                <IconButton
                  icon="car"
                  color={Colors.green500}
                  size={40}
                  onPress={() => {
                    setTravelModeAndShowRoute('DRIVING');
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginVertical: 55,
    marginHorizontal: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  alignButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  divider: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});
