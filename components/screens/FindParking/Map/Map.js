import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Directions from "./Directions/Directions";
import Geojson from "react-native-maps/lib/components/Geojson";
import get from 'lodash/get'

const Map = ({region, onRegionChangeComplete, routeCoords, parkingSlots, showsUserLocation}) => {
  return (
    <MapView
      style={styles}
      region={region}
      onRegionChangeComplete={onRegionChangeComplete}
      showsUserLocation={showsUserLocation}>
      {
        routeCoords.length > 0 &&
        <Directions routeCoords={routeCoords} />
      }
      {
        get(parkingSlots, 'features', []).length > 0 &&
        <Geojson geojson={parkingSlots}/>
      }
    </MapView>
  )
}

const styles = StyleSheet.create({
  flex: 2,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
});

export default Map
