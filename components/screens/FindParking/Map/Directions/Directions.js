import React from 'react';
import MapView from 'react-native-maps';

const Directions = ({ routeCoords }) => (
  <MapView.Polyline
    coordinates={routeCoords}
    strokeWidth={2}
    strokeColor="blue"/>
)

export default Directions
