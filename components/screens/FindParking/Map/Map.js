import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const Map = ({region, onRegionChangeComplete, showsUserLocation}) => (
  <MapView
    style={styles}
    region={region}
    onRegionChangeComplete={onRegionChangeComplete}
    showsUserLocation={showsUserLocation} />
)

const styles = StyleSheet.create({
  flex: 2,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
});

export default Map
