import React from 'react'
import Home from './components/screens/Home/Home'
import Map from './components/screens/Map/Map'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Map: {screen: Map}
});

const App = createAppContainer(MainNavigator);

export default App;
