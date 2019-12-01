const HOSTNAME = 'https://find-my-curb.herokuapp.com/'
const LOOKING_AROUND_ENDPOINT = 'lookingAround'
const LOOKING_TO_PARK_ENDPOINT= 'lookingToPark'

const _getParkingSpots = (coords, endpoint) => {
  const {latitude, longitude} = coords
  return fetch(`${HOSTNAME}${endpoint}?coordinates=${latitude},${longitude}`)
    .then(parkingSlots => parkingSlots.json())
}

export const lookingAround = (coords) => {
  return _getParkingSpots(coords, LOOKING_AROUND_ENDPOINT)
}

export const lookingToPark = (coords) => {
  return _getParkingSpots(coords, LOOKING_TO_PARK_ENDPOINT)
}
