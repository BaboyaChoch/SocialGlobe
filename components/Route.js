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

export default function Route(props) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc';
  const {width, height} = Dimensions.get('window');

  function getRouteEstimates(result) {
    const distanceEstimate = result.distance / 1.609;
    const durationEstimate = result.duration.toFixed(0);
    return {
      estimateDistance: distanceEstimate,
      estimateDuration: durationEstimate,
    };
  }
  useEffect(() => {
    console.log('im here');
  });

  return (
    <MapViewDirections
      apikey={GOOGLE_MAPS_APIKEY}
      origin={props.origin}
      mode={props.modeOfTransport}
      waypoints={
        props.destination.length > 2
          ? props.destination.slice(1, -1)
          : undefined
      }
      destination={props.destination[props.destination.length - 1]}
      precision={'high'}
      optimizeWaypoints={true}
      strokeWidth={10}
      strokeColor="steelblue"
      onStart={params => {}}
      onReady={result => {
        props.handleRouteResult(getRouteEstimates(result));
        props.mapRef.current.fitToCoordinates(props.destination, {
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
