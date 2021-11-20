import React, {useEffect, useState, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Modal,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Button} from 'react-native';
import {IconButton, Colors, Divider} from 'react-native-paper';
//import DeviceInfo from 'react-native-device-info';

import {useNavigation} from '@react-navigation/core';
import {useIsFocused} from '@react-navigation/core';
import MapViewDirections from 'react-native-maps-directions';
import UseModal from '../components/UseModal';
import ModeModal from '../components/UseModal';
import Route from '../components/Route';
import {getEvents} from '../api/mapsApi';
import getDirections from 'react-native-google-maps-directions';

if (Platform.OS == 'ios') {
  Geolocation.setRNConfiguration({
    authorizationLevel: 'always',
  });
  Geolocation.requestAuthorization();
}
const coordinateArray = [
  {
    longitude: -91.1873842,
    latitude: 30.4227145,
    latitudeDelta: 0.009,
    longitudeDelta: 0.0009,
  },
  {
    longitude: -91.1879546,
    latitude: 30.4211469,
    latitudeDelta: 0.009,
    longitudeDelta: 0.0009,
  },
  {
    longitude: -91.17617969999999,
    latitude: 30.4186758,
    latitudeDelta: 0.009,
    longitudeDelta: 0.0009,
  },
];

export default function Map({route, navigation}) {
  const eventToAdd = route.params;
  console.log('Maps Pags: ', eventToAdd);
  const [currentUserLocation, setCurrentUserLocation] = useState({
    latitude: 30.4077484,
    longitude: -91.1794054,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  const isFocused = useIsFocused();
  const [currentUserSelection, setCurrentUserSelection] = useState();
  const [eventsList, setEventsList] = useState([]);
  const [createEventIsVisible, setCreateEventIsVisiblility] = useState(false);
  const [userDestination, setUserDestination] = useState();
  const [modeOfTransport, setModeOfTransport] = useState();
  const mapRef = useRef(null);
  const {width, height} = Dimensions.get('window');
  function closeCreatEvent() {
    setCreateEventIsVisiblility(false);
  }

  function geoSuccess(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    setCurrentUserLocation({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.009,
      longitudeDelta: 0.0009,
    });
  }

  function getUserLocation() {
    Geolocation.getCurrentPosition(
      geoSuccess,
      err => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }

  function watchUserLocation() {
    geolocation.watchPosition(info => console.log(info));
  }

  function oncurrentUserLocationChange(location) {
    setCurrentUserLocation({location});
  }

  function onEventAdded(event) {
    setEventsList([...eventsList, event]);
  }

  const onEventsRecieved = eventsList => {
    setEventsList(eventsList);
  };

  function showUserPrivateEvents() {
    eventsList.map(eventInfo => {
      const userBelongsToGroup = true;
      if (eventInfo.visibility === 'private' && userBelongsToGroup)
        console.log(eventInfo.coordinates);
      //return <Marker coordinate={eventInfo.coordinates} />;
    });
  }

  function showPublicEvents() {
    eventsList.map(eventInfo => {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'EST',
        timeZoneName: 'short',
      };
      console.log(new Date(eventInfo.date).toLocaleString('en-US', options));
    });
  }

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'SocialGlobe',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getUserLocation();
      } else {
        console.log('Location denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const [modalVisible, setModalVisible] = useState(false);
  function ModeModal(props) {
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
                  Gerald's Castle
                </Text>
                <Text style={[styles.modalText, , {fontSize: 16}]}></Text>
                <Divider />
                <View style={styles.alignButton}>
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

  useEffect(() => {
    requestLocationPermission();
    getEvents(onEventsRecieved);
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <MapView ref={mapRef} style={styles.map} region={currentUserLocation}>
        {eventsList.map(eventInfo => (
          <UseModal
            onPress={() => setCurrentUserSelection(eventInfo)}
            key={eventInfo.eventId}
            coordinate={eventInfo.coordinates}
            title={eventInfo.title}
            time={eventInfo.time}
            address={eventInfo.address}
            date={eventInfo.date}
          />
        ))}

        {coordinateArray.length >= 2 && (
          <Route
            origin={currentUserLocation}
            destination={coordinateArray}
            modeOfTransport={modeOfTransport}
            mapRef={mapRef}
          />
        )}
      </MapView>
      <View style={styles.nav}>
        <Button
          onPress={() => {
            navigation.navigate('CreateEvent');
          }}
          title="Create Event"
        />
      </View>
      <View>
        <ModeModal></ModeModal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  nav: {
    position: 'absolute', //use absolute position to show button on top of the map
    top: '95%', //for center align
    alignSelf: 'flex-end', //for align to right
  },
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
