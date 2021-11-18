import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MapView, {Marker} from 'react-native-maps';
import {IconButton, Colors} from 'react-native-paper';

export default function UseModal(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  return (
    <Marker coordinate={props.coordinate} onPress={() => setModalVisible(true)}>
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
                <Text style={styles.modalText}>Title: {props.title}</Text>
                <Text style={styles.modalText}>
                  Description: {props.description}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <IconButton
                    icon="plus"
                    color={Colors.black}
                    size={40}
                    onPress={() => {
                      navigation.navigate('Map', {eventToAdd: details});
                    }}
                  />
                  <IconButton
                    icon="information"
                    color={Colors.blue300}
                    size={40}
                    onPress={() => {
                      navigation.navigate('EventDetailsPage', {
                        eventDetails: eventInfo,
                      });
                    }}
                  />
                  <IconButton
                    icon="navigation"
                    color={Colors.green500}
                    size={40}
                    onPress={() => {
                      console.log('reported');
                    }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </Marker>
  );
}
const styles = StyleSheet.create({
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
    padding: 10,
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
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtonAlignLeft: {
    position: 'absolute',
    top: '99%',
    alignSelf: 'flex-start',
    marginTop: 25,
  },
  modalButtonAlignMiddle: {
    position: 'absolute',
    top: '99%',
    alignSelf: 'center',
    marginTop: 25,
  },
  modalButtonAlignRight: {
    position: 'absolute',
    top: '99%',
    alignSelf: 'flex-end',
    marginTop: 25,
  },
  tView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginTop: 22,
  },
});
