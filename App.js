import React from 'react'
import Home from './components/screens/Home/Home'
import FindParking from './components/screens/FindParking/FindParking'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Search: {screen: FindParking}
}, {
  initialRouteName: 'Search',
  headerMode: 'none',
  header: null
});

const App = createAppContainer(MainNavigator);

export default App;
