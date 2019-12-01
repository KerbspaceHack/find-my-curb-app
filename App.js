import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MainApp from './components/MainApp'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

export default function App() {

  const MainNavigator = createStackNavigator({
    Home: {screen: MainApp}
  });

  const App = createAppContainer(MainNavigator);

  return (
    <View style={styles.container}>
      <App />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
