import * as Permissions from 'expo-permissions'
import {getCurrentPositionAsync} from 'expo-location'
import * as Polyline from "@mapbox/polyline";

export const getCurrentPosition = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }
  return await getCurrentPositionAsync({});
}

export const getDirections = async(origin, destination) => {
    const apiKey = 'AIzaSyClrwK7abn_dNJXfHi_IyKKjRBiiwp2puo'

    let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`)
    let respJson = await resp.json();
    let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    let coords = points.map((point, index) => {
      return  {
        latitude : point[0],
        longitude : point[1]
      }
    })
    return coords
}
