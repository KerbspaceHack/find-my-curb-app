import * as Permissions from 'expo-permissions'
import {getCurrentPositionAsync} from 'expo-location'
import * as Polyline from "@mapbox/polyline";
import get from 'lodash/get'

export const coordinatesToSearchParams = (coordinates) => {
  const latitude = coordinates.latitude || coordinates.lat
  const longitude = coordinates.longitude || coordinates.lng

  return `${latitude},${longitude}`
}

export const getZoomedInRegion = (coordinates) => ({
  latitude: coordinates.latitude || coordinates.lat,
  longitude: coordinates.longitude || coordinates.lng,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
})

export const getCurrentPosition = async () => {
  return Permissions.askAsync(Permissions.LOCATION)
    .then(() => getCurrentPositionAsync({}))
}

export const getDirections = (from = {}, to = {}) => {
  const apiKey = 'AIzaSyClrwK7abn_dNJXfHi_IyKKjRBiiwp2puo'
  const fromParam = coordinatesToSearchParams(from)
  const toParam = coordinatesToSearchParams(to)

  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${fromParam}&destination=${toParam}&key=${apiKey}`)
    .then(resp => resp.json())
    .then(respJson => {
      const points = Polyline.decode(get(respJson, 'routes[0].overview_polyline.points', []))
      return points.map((point) => {
        return  {
          latitude : point[0],
          longitude : point[1]
        }
      })
    })

}
