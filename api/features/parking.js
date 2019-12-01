const host = 'https://find-my-curb.herokuapp.com/'

export const getParkingSlots = async (coords) => {
  const {latitude, longitude} = coords
  const parkingSlots = await fetch(`${host}lookingToPark?coordinates=${latitude},${longitude}`)
  let parkingSlotsJson = await parkingSlots.json();
  return parkingSlotsJson.features
}
