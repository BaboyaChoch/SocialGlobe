import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppColors from './AppColors';
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
    console.log(result);
    const distanceEstimate = (result.distance / 1.60934).toFixed(2);
    const durationEstimate = result.duration.toFixed(0);
    return {
      estimatedDistance: distanceEstimate,
      estimatedDuration: durationEstimate,
    };
  }

  console.log('here are the props: ', props);
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
      waypoints={props.destinations.length >= 2 ? [props.destinations[1]] : []}
      destination={props.destinations[0]}
      precision={'high'}
      optimizeWaypoints={true}
      strokeWidth={10}
      strokeColor={AppColors.GREEN}
      onStart={() => console.log('')}
      onReady={result => {
        props.handleRouteResult(getRouteEstimates(result));
        props.handleShowDetails(true);
        console.log('coords:  ', [props.origin, ...props.destinations]);
        props.mapRef.current.fitToCoordinates(
          [props.origin, ...props.destinations],
          {
            edgePadding: {
              right: 10,
              bottom: 10,
              left: 10,
              top: 10,
            },
          },
        );
      }}
      onError={error => {
        return;
      }}
    />
  );
}
