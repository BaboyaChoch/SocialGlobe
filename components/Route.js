import MapViewDirections from 'react-native-maps-directions';
import {Dimensions} from 'react-native';
import React from 'react';

export default function Route(props) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc';
  const {width, height} = Dimensions.get('window');

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
      strokeWidth={5}
      strokeColor="blue"
      onStart={params => {
        console.log(
          `Started routing between "${params.origin}" and "${params.destination}" `,
        );
      }}
      onReady={result => {
        console.log(`Distance: ${(result.distance / 1.609).toFixed(2)} miles`);
        console.log(`Duration: ${result.duration.toFixed(0)} minutes`);
        props.mapRef.current.fitToCoordinates(props.destination, {
          edgePadding: {
            right: width / 20,
            bottom: height / 20,
            left: width / 20,
            top: height / 20,
          },
        });
      }}
      onError={errorMessage => {
        console.log('Error: MapviewDirections');
      }}
    />
  );
}
