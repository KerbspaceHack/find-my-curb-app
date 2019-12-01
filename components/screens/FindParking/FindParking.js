import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constants from "expo-constants";
import {getCurrentPosition, getDirections} from "../../../api/features/location";
import Search from "./Search/Search";
import Map from "./Map/Map";
import * as Speech from 'expo-speech';
import {getParkingSlots} from "../../../api/features/parking";
import throttle from 'lodash/throttle'

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
      parkingSpots: [],
      parkingSpotSelected: false,
      foundParking: {
        spoke: false,
        found: false,
        redirect: false
      }
    }
  }

  async componentDidMount () {
    const {coords} = await getCurrentPosition()
    const {latitude, longitude} = coords
    const origin = `${latitude},${longitude}`

    this.setState(({region: {latitude, longitude, latitudeDelta: 0.02, longitudeDelta: 0.02}}))
    const routeCoords = await getDirections(origin, 'Buckingham Palace')
    this.setState({ routeCoords })

    setTimeout(() => this.setState({foundParking: {found: true}}), 10000)
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.foundParking.found && !this.state.foundParking.spoke) {
      await this.startConversation()
      this.setState({foundParking: {spoke: true}})
    }
    if(this.state.foundParking.redirect) {
      this.redirectToConfirmation()
    }
  }

  redirectToConfirmation () {
    this.props.navigation.navigate('Confirm', {address: '12 Park street, Camden Town, London NW1 8AF'})
  }

  async getDirections (destination) {
    const directions = await getDirections(destination)
  }

  async startConversation () {
    setTimeout(() => this.onFindParking(), 20000);
    setTimeout(() => this.onAcceptingParking(), 30000);
  }

  onFindParking () {
    this.speakFoundParking()
  }

  onAcceptingParking () {
    this.speakAcceptingParking()
    this.setState({foundParking: {redirect: true}})
  }

  speakAcceptingParking () {
    const thingToSay = 'Fantastic, sending the address to you now.'
    Speech.speak(thingToSay);
  }

  speakFoundParking () {
    const thingToSay = 'I found a parking space 2 minutes away, shall I redirect you there?'
    Speech.speak(thingToSay);
  }

  async getParkingSlots (region) {
    return await getParkingSlots(region)
  }

  onSearchInputUpdate (searchInput) {
    this.setState({ searchInput })
  }

  onRegionChange (region) {
    this.setState({ region })
    throttle(() => {
      const parkingSlots = this.getParkingSlots(region)
      this.setState({ parkingSlots })
    }, 1000)

  }

  render() {
    const {searchInput, region, parkingSpots, routeCoords, parkingSpotSelected} = this.state
    return (
      <View style={styles.container}>
        <Search
          value={searchInput}
          onChangeText={this.onSearchInputUpdate} />
        <Map
          style={styles.mapStyle}
          region={region}
          routeCoords={routeCoords}
          parkingSpots={parkingSpots}
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
