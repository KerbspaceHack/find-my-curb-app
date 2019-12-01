import * as Permissions from 'expo-permissions'
import {getCurrentPositionAsync} from 'expo-location'

export const getCurrentPosition = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }

  return await getCurrentPositionAsync({});
}
