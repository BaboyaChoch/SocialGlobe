import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';

import {IconButton, Colors, Divider} from 'react-native-paper';

{
  /* <SelectTravelModeModal
isSingleDestination={true}
handleVisible={setIsChooseTravelModeVisible}
visible={isChooseTravelModeVisible}
event={eventDetails}
isTour={isTour}]

/> */
}
export default function SelectTravelModeModal({
  handleVisible,
  visible,
  event,
  isTour,
}) {
  console.log('in modes modal');
  const navigation = useNavigation();
  const passRouteDetailsIsTour = travelMode => {
    navigation.navigate('Map', {
      eventToAdd: event,
      createRoute: true,
      createTour: isTour,
      travelMode: travelMode,
    });
  };

  const handleSelection = selection => {
    passRouteDetailsIsTour(selection);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      style={styles.centeredView}
      onRequestClose={() => {
        handleVisible(false);
      }}>
      <TouchableWithoutFeedback
        onPressOut={() => {
          handleVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, styles.modalTitle]}>
              Select Mode of Transportation
            </Text>
            <Divider />
            <View style={styles.alignButton}>
              <IconButton
                icon="walk"
                color={Colors.black}
                size={40}
                onPress={() => {
                  handleSelection('WALKING');
                }}
              />
              <IconButton
                icon="bike"
                color={Colors.blue300}
                size={40}
                onPress={() => {
                  handleSelection('BICYCLING');
                }}
              />
              <IconButton
                icon="car"
                color={Colors.green500}
                size={40}
                onPress={() => {
                  handleSelection('DRIVING');
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
    borderRadius: 2,
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
    borderRadius: 2,
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
    color: Colors.black,
    paddingLeft: 5,
    fontSize: 15,
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
});
