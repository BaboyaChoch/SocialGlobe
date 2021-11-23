import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MapView, {Marker} from 'react-native-maps';

import InfoCard from '../screens/InfoCard';
import {useIsFocused} from '@react-navigation/core';
import {firebase} from '@react-native-firebase/auth';

export default function CreateEventEventMarker(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [isEventInfoReady, setisEventInfoReady] = useState(false);
  const isFocused = useIsFocused();
  const user = firebase.auth().currentUser;
  const [eventsInfo, setEventsInfo] = useState([]);

  useEffect(() => {
    setisEventInfoReady(
      props.eventInfo != null && props.eventInfo != undefined,
    );
  });
  const onEventInfoRecieved = events => {
    setEventsInfo(events);
    setIsBookmarkReady(true);
  };

  return (
    isEventInfoReady && (
      <Marker
        coordinate={props.eventInfo.event_coordinates}
        onPress={() => setModalVisible(true)}>
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
            <SafeAreaView>
              <ScrollView>
                <InfoCard
                  eventDetails={props.eventInfo}
                  handleNavigateModal={props.handleNavigate}
                />
              </ScrollView>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </Modal>
      </Marker>
    )
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
    fontSize: 22,
  },
});
