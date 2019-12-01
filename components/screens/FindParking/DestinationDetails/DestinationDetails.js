import React from 'react';
import {Button, StyleSheet, View} from "react-native";

const DestinationDetails = ({ onNavigate}) => {
  return (
    <View style={ styles }>
      <Button title='Navigate' onPress={onNavigate} />
    </View>
  )
}

const styles = StyleSheet.create({
  height: 35
})

export default DestinationDetails
