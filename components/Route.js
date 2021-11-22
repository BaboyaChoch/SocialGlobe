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
import getDirections from 'react-native-google-maps-directions';

export default function Route(props) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc';
  const {width, height} = Dimensions.get('window');

  function getDirectionsFromNativeMapsApp() {
    getDirections({
      source: props.currentOrigin,
      destination: props.destinations,
      params: [
        {
          key: 'travelmode',
          value: props.modeOfTransport, // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
      waypoints: [],
    });
  }

  function getRouteEstimates(result) {
    const distanceEstimate = (result.distance / 1.609).toFixed(2);
    const durationEstimate = result.duration.toFixed(0);
    return {
      estimatedDistance: distanceEstimate,
      estimatedDuration: durationEstimate,
    };
  }
  function fitRouteToScreen(origin, destination) {
    const tempDestination = destination;
    tempDestination[0] = origin;
    const destinationWithOrigin = [origin].concat(tempDestination);
    props.mapRef.current.fitToCoordinates(destinationWithOrigin, {
      edgePadding: {
        right: width / 20,
        bottom: height / 15,
        left: width / 20,
        top: height / 20,
      },
    });
  }

  useEffect(() => {
    const info = {
      dest: props.destinations,
      origin: props.origin,
      mode: props.modeOfTransport,
    };
    console.log(info);
  });
  useEffect(() => {
    setTimeout(function () {
      fitRouteToScreen(props.origin, props.destinations);
    }, 250);
  }, [props.origin, props.destinations, props.modeOfTransport]);

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
      onReady={result => {
        props.handleRouteResult(getRouteEstimates(result));
      }}
      onError={error => {
        return;
      }}
    />
  );
}
