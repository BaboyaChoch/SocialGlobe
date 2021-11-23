import MapViewDirections from 'react-native-maps-directions';
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import getDirections from 'react-native-google-maps-directions';

export default function Route(props) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc';
  const {width, height} = Dimensions.get('window');

  function getDirectionsFromNativeMapsApp() {
    // getDirections({
    //   source: props.currentOrigin,
    //   destination: props.destinations,
    //   params: [
    //     {
    //       key: 'travelmode',
    //       value: props.modeOfTransport, // may be "walking", "bicycling" or "transit" as well
    //     },
    //     {
    //       key: 'dir_action',
    //       value: 'navigate', // this instantly initializes navigation using the given travel mode
    //     },
    //   ],
    //   waypoints: [],
    // });
  }

  function getRouteEstimates(result) {
    const distanceEstimate = result.distance / 1.609;
    const durationEstimate = result.duration.toFixed(0);
    return {
      estimatedDistance: distanceEstimate,
      estimatedDuration: durationEstimate,
    };
  }

  useEffect(() => {
    const info = {
      dest: props.destinations,
      origin: props.origin,
      mode: props.modeOfTransport,
    };

    console.log(info);
  });

  return (
    <MapViewDirections
      apikey={GOOGLE_MAPS_APIKEY}
      origin={props.origin}
      mode={props.modeOfTransport}
      waypoints={
        props.destinations.length > 2
          ? props.destinations.slice(1, -1)
          : undefined
      }
      destination={props.destinations[props.destinations.length - 1]}
      precision={'high'}
      optimizeWaypoints={true}
      strokeWidth={10}
      strokeColor="steelblue"
      onStart={() => console.log('')}
      onReady={result => {
        props.handleRouteResult(getRouteEstimates(result));
        props.mapRef.current.fitToCoordinates(props.destinations, {
          edgePadding: {
            right: width / 20,
            bottom: height / 20,
            left: width / 20,
            top: height / 20,
          },
        });
      }}
      onError={error => {
        return;
      }}
    />
  );
}
