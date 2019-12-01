import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Directions from "./Directions/Directions";

const Map = ({region, onRegionChangeComplete, routeCoords, showsUserLocation}) => (
  <MapView
    style={styles}
    region={region}
    onRegionChangeComplete={onRegionChangeComplete}
    showsUserLocation={showsUserLocation}>
    {
      routeCoords.length > 0 &&
      <Directions routeCoords={routeCoords} />
    }
  </MapView>
)

const styles = StyleSheet.create({
  flex: 2,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
});

export default Map
