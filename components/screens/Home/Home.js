import React from 'react'
import Constants from 'expo-constants'
import {
  View,
  Button
} from 'react-native';

class Home extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{marginTop: Constants.statusBarHeight}}>
        <Button
          title="Go to Map"
          onPress={() => navigate('Map')}
        />
      </View>
    )
  }
}

export default Home
