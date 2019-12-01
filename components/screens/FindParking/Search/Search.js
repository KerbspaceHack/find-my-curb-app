import React from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

const Search = ({value, onChangeText, showLoading}) => (
  <SearchBar
    style={styles}
    placeholder="Where are you going?"
    value={value}
    onChangeText={onChangeText}
    showLoading={showLoading} />
)


const styles = StyleSheet.create({
    flex: 1
})

export default Search
