import React, { useState } from 'react'
import {Text} from 'react-native'

export default function MainApp () {
    const [confrimedSpot, setConfirmedSpot] = useState(false)

    return (
        <Text>Find a Curb Space</Text>
    )
}
