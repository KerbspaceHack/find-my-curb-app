import * as Permissions from 'expo-permissions'
import {getCurrentPositionAsync} from 'expo-location'
import * as Polyline from "@mapbox/polyline";

export const getCurrentPosition = async () => {
  return Permissions.askAsync(Permissions.LOCATION)
    .then(() => getCurrentPositionAsync({}))
}

export const getDirections = (origin, destination) => {
  const apiKey = 'AIzaSyClrwK7abn_dNJXfHi_IyKKjRBiiwp2puo'

  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`)
    .then(resp => resp.json())
    .then(respJson => {
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return  {
          latitude : point[0],
          longitude : point[1]
        }
      })
      return coords
    })

}
