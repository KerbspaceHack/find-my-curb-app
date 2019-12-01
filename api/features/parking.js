const host = 'https://find-my-curb.herokuapp.com/'

export const getParkingSlots = (coords) => {
  const {latitude, longitude} = coords
  return fetch(`${host}lookingToPark?coordinates=${latitude},${longitude}`)
    .then(parkingSlots => parkingSlots.json())
}
