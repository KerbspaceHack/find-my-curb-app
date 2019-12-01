import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import {getCurrentPosition, getDirections, getZoomedInRegion} from "../../../api/features/location";
import Search from "./Search/Search";
import Map from "./Map/Map";
import {lookingToPark, getParkingSlots} from "../../../api/features/parking";
import * as Speech from 'expo-speech';
import throttle from 'lodash/throttle'
import get from 'lodash/get'
import DestinationDetails from "./DestinationDetails/DestinationDetails";

export default class FindParking extends React.Component {
  constructor(props) {
    super(props)
    this.onDestinationSelect = this.onDestinationSelect.bind(this)
    this.onNavigate = this.onNavigate.bind(this)
    this.onRegionChange = throttle(this.onRegionChange.bind(this), 5000)
    this.state = {
      routeCoords: [],
      region: {
        latitude: 51.485,
        longitude: 0.010,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      parkingSpots: {},
      parkingSpotSelected: false,
      foundParking: {
        spoke: false,
        found: false,
        redirect: false
      },
      showDestinationDetails: false
    }

  }

  componentDidMount () {
    getCurrentPosition()
      .then(({coords}) => {
        this.setState({region: getZoomedInRegion(coords)})
      })

    // setTimeout(() => this.setState({foundParking: {found: true}}), 10000)
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

  onNavigate () {
    this.setState({showDestinationDetails: false})
  }

  onDestinationSelect(destinationDetails) {
    const destinationCoords =  get(destinationDetails, 'geometry.location', {})
    this.setState(state => {
      getDirections(state.region, destinationCoords)
        .then(routeCoords => {
          if (routeCoords.length > 0) {
            this.setState({
              routeCoords,
              showDestinationDetails: true,
              region: getZoomedInRegion(destinationCoords)
            })
          }
        })
    })
  }

  async onRegionChange (region) {
    lookingToPark(region)
      .then(parkingSlots => {
        this.setState({ region, parkingSlots })
      })
  }

  render() {
    const {region, parkingSlots, routeCoords, destinationDetails, showDestinationDetails} = this.state
    return (
      <View style={styles.container}>
        <Search
          onDestinationSelect={this.onDestinationSelect}/>
        <Map
          style={styles.mapStyle}
          region={region}
          routeCoords={routeCoords}
          parkingSlots={parkingSlots}
          onRegionChangeComplete={this.onRegionChange}
          showsUserLocation={true} />
        {
          showDestinationDetails &&
          <DestinationDetails onNavigate={this.onNavigate} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  }
});
