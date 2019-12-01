import React from 'react'
import {
  Button
} from 'react-native';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Map"
        onPress={() => navigate('Map')}
      />
    );
  }
}

export default Home
