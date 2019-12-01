import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constants from "expo-constants";
import {getCurrentPosition, getDirections} from "../../../api/features/location";
import Search from "./Search/Search";
import Map from "./Map/Map";

export default class FindParking extends React.Component {
  constructor(props) {
    super(props)
    this.onSearchInputUpdate = this.onSearchInputUpdate.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
    this.state = {
      searchInput: '',
      routeCoords: [],
      region: {
        latitude: 51.485,
        longitude: 0.010,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      parkingSpots: {
        loading: false,
        error: false,
        spots: []
      },
      parkingSpotSelected: false
    }
  }

  async componentDidMount () {
    const {coords} = await getCurrentPosition()
    const {latitude, longitude} = coords
    const origin = `${latitude},${longitude}`

    this.setState(({region: {latitude, longitude, latitudeDelta: 0.02, longitudeDelta: 0.02}}))
    const routeCoords = await getDirections(origin, 'Buckingham Palace')
    this.setState({ routeCoords })
  }

  async getDirections (destination) {
    const directions = await getDirections(destination)
  }

  onSearchInputUpdate (searchInput) {
    this.setState({ searchInput })
  }

  onRegionChange (region) {
    this.setState({ region })
  }

  render() {
    const {searchInput, region, parkingSpots, routeCoords, parkingSpotSelected} = this.state
    return (
      <View style={styles.container}>
        <Search
          value={searchInput}
          onChangeText={this.onSearchInputUpdate}
          showLoading={parkingSpots.loading} />
        <Map
          style={styles.mapStyle}
          region={region}
          routeCoords={routeCoords}
          onRegionChangeComplete={this.onRegionChange}
          showsUserLocation={true} />
        {
          parkingSpotSelected &&
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
