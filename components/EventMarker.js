import {useNavigation} from '@react-navigation/core';
import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet} from 'react-native';

export default function EventMarker({event}) {
  const navigation = useNavigation();
  const eventType = event.event_type;
  const MARKER_ANCHOR = {x: 0.51, y: 0.57};
  const renderEventMarkerByType = () => {
    switch (eventType) {
      case 'fair':
        return (
          <Marker
            anchor={MARKER_ANCHOR}
            centerOffset={MARKER_ANCHOR}
            style={styles.marker}
            resizeMode="contain"
            key={event.event_id}
            coordinate={event.event_coordinates}
            onPress={() => {
              navigation.navigate('EventDetailsPage', {
                eventDetails: event,
              });
            }}
            image={require('../assets/icons/map_markers/fair_marker.png')}></Marker>
        );
      case 'seminar':
        return (
          <Marker
            anchor={MARKER_ANCHOR}
            centerOffset={MARKER_ANCHOR}
            style={styles.marker}
            resizeMode="contain"
            key={event.event_id}
            coordinate={event.event_coordinates}
            onPress={() => {
              navigation.navigate('EventDetailsPage', {
                eventDetails: event,
              });
            }}
            image={require('../assets/icons/map_markers/seminar_marker.png')}></Marker>
        );
      case 'sport':
        return (
          <Marker
            anchor={MARKER_ANCHOR}
            centerOffset={MARKER_ANCHOR}
            resizeMode="contain"
            key={event.event_id}
            coordinate={event.event_coordinates}
            onPress={() => {
              navigation.navigate('EventDetailsPage', {
                eventDetails: event,
              });
            }}
            image={require('../assets/icons/map_markers/sport_marker.png')}></Marker>
        );
      case 'fundraiser':
        return (
          <Marker
            anchor={MARKER_ANCHOR}
            centerOffset={MARKER_ANCHOR}
            style={styles.marker}
            resizeMode="contain"
            key={event.event_id}
            coordinate={event.event_coordinates}
            onPress={() => {
              navigation.navigate('EventDetailsPage', {
                eventDetails: event,
              });
            }}
            image={require('../assets/icons/map_markers/fundraiser_marker.png')}></Marker>
        );
      default:
        return (
          <Marker
            anchor={MARKER_ANCHOR}
            centerOffset={MARKER_ANCHOR}
            style={styles.marker}
            resizeMode="contain"
            key={event.event_id}
            coordinate={event.event_coordinates}
            onPress={() => {
              navigation.navigate('EventDetailsPage', {
                eventDetails: event,
              });
            }}></Marker>
        );
    }
  };

  return renderEventMarkerByType();
}

const styles = StyleSheet.create({
  marker: {width: 10, height: 28},
});
