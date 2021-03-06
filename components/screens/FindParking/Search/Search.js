import React from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Search = ({ onDestinationSelect }) => {
    return (
      <GooglePlacesAutocomplete
        style={styles}
        placeholder='Where are you going?'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed='auto'    // true/false/undefined
        renderDescription={row => row.description}
        fetchDetails={true}
        onPress={(_, destinationDetails) => {
            onDestinationSelect(destinationDetails)
        }}
        getDefaultValue={() => ''}

        query={{
            key: 'AIzaSyAFmo1ixidXKVVYZgNAwO08kcL5Rsb5JKY',
            language: 'en', // language of the results
            types: '(cities)' // default: 'geocode'
        }}

        styles={{
            textInputContainer: {
                width: '100%'
            },
            description: {
                fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
                color: '#1faadb'
            }
        }}
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance'
        }}

        GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: 'formatted_address',
        }}

        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
}

const styles = StyleSheet.create({
    flex: 1
})

export default Search
