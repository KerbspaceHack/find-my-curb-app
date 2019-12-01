import React from 'react'
import {View, Image} from 'react-native';
import image from '../../../../assets/confirm.png'

export default class Confirmation extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Image source={image} style={{width:'100%', height:'100%'}} />
            </View>
        )
    }
}
