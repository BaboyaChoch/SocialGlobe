import MapViewDirections from 'react-native-maps-directions';

import React from 'react';

export default function Route(props) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc';

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
      }}
      onError={errorMessage => {
        console.log('Error: MapviewDirections');
      }}
    />
  );
}
