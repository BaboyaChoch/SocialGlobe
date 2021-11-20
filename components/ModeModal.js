import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MapView, {Marker} from 'react-native-maps';
import {IconButton, Colors, Divider} from 'react-native-paper';

export default function ModesModal(props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.centeredView}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback
          onPressOut={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalText, styles.modalTitle]}>
                Choose mode of transportion
              </Text>
              <Text style={[styles.modalText, , {fontSize: 16}]}></Text>
              <Divider />
              <View style={styles.alignButton}>
                {/* <IconButton
                  icon="bus"
                  color={Colors.blue300}
                  size={40}
                  onPress={() => {
                    setModeOfTransport('TRAINSIT'),
                      setModalVisible(!modalVisible);
                  }}
                /> */}
                <IconButton
                  icon="walk"
                  color={Colors.black}
                  size={40}
                  onPress={() => {
                    setModeOfTransport('WALKING'),
                      setModalVisible(!modalVisible);
                  }}
                />
                <IconButton
                  icon="bike"
                  color={Colors.blue300}
                  size={40}
                  onPress={() => {
                    setModeOfTransport('BICYCLING'),
                      setModalVisible(!modalVisible);
                  }}
                />
                <IconButton
                  icon="car"
                  color={Colors.green500}
                  size={40}
                  onPress={() => {
                    setModeOfTransport('DRIVING'),
                      setModalVisible(!modalVisible);
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Pressable
        style={[styles.button, {backgroundColor: 'blue'}]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
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
