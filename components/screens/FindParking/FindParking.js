import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constants from "expo-constants";
import {getCurrentPosition, getDirections} from "../../../api/features/location";
import Search from "./Search/Search";
import Map from "./Map/Map";
import {getParkingSlots} from "../../../api/features/parking";
import throttle from 'lodash/throttle'

export default class FindParking extends React.Component {
  constructor(props) {
    super(props)
    this.onSearchInputUpdate = this.onSearchInputUpdate.bind(this)
    this.onRegionChange = throttle(this.onRegionChange.bind(this), 5000)
    this.state = {
      searchInput: '',
      routeCoords: [],
      region: {
        latitude: 51.485,
        longitude: 0.010,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      parkingSlots: {},
      parkingSlotselected: false
    }
  }

  componentDidMount () {
    getCurrentPosition()
      .then(({coords}) => {
        const {latitude, longitude} = coords
        const origin = `${latitude},${longitude}`

        this.setState(({region: {latitude, longitude, latitudeDelta: 0.02, longitudeDelta: 0.02}}))
        return getDirections(origin, 'Buckingham Palace')
          .then(routeCoords => {this.setState({ routeCoords })})
      })
  }

  onSearchInputUpdate (searchInput) {
    this.setState({ searchInput })
  }

  async onRegionChange (region) {
    getParkingSlots(region)
      .then(parkingSlots => {
        this.setState({ region, parkingSlots })
      })
  }

  render() {
    const {searchInput, region, parkingSlots, routeCoords, parkingSlotselected} = this.state
    return (
      <View style={styles.container}>
        <Search
          value={searchInput}
          onChangeText={this.onSearchInputUpdate} />
        <Map
          style={styles.mapStyle}
          region={region}
          routeCoords={routeCoords}
          parkingSlots={parkingSlots}
          onRegionChangeComplete={this.onRegionChange}
          showsUserLocation={true} />
        {
          parkingSlotselected &&
          <View
            style={styles.infoStyle}>
            <Text>Latitude: { region.latitude}</Text>
            <Text>Longitude: {region.longitude}</Text>
          </View>
        }


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  infoStyle: {
    height: 100
  }
});
