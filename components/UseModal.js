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
import {IconButton, Colors, Divider} from 'react-native-paper';

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
                <Text style={[styles.modalText, styles.modalTitle]}>
                  {props.title}
                </Text>
                <Text style={[styles.modalText, , {fontSize: 16}]}>
                  {props.address.description}
                  {'\n'}
                  <View style={styles.divider} />
                  {props.date}
                  {'\n'}
                  <View style={styles.divider} />
                  {props.time}
                  {'\n'}
                  <View style={styles.divider} />
                  {props.eventType}
                </Text>
                <Divider />
                <View style={styles.alignButton}>
                  <IconButton
                    icon="bookmark"
                    color={Colors.black}
                    size={40}
                    onPress={() => {
                      navigation.navigate('');
                    }}
                  />
                  <IconButton
                    icon="plus"
                    color={Colors.black}
                    size={40}
                    onPress={() => {
                      navigation.navigate('Map', {
                        eventToAdd: props.route.eventToAdd,
                      });
                    }}
                  />
                  <IconButton
                    icon="information"
                    color={Colors.blue300}
                    size={40}
                    onPress={() => {
                      navigation.navigate('EventDetailsPage', {
                        eventDetails: props.route.eventDetails,
                      });
                    }}
                  />
                  <IconButton
                    icon="navigation"
                    color={Colors.green500}
                    size={40}
                    onPress={() => {
                      console.log('');
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
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
