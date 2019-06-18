// A reusable component that house details of jio written in the form of card
// and card sections. This will display Image, restaurantName, location,
// CloseJioTime, PickupTime, and StatusIcon
// Consider making the layout more dynamic when we start hooking it up to a database

import React from 'react';
import { Image, View, Text } from 'react-native';
import { Card, CardSection } from '../common';
import { Open } from '../../resources/icons';
import { Makisan }  from '../../resources/images';
// source={{ uri: 'http://4.bp.blogspot.com/-Lrkp3LMtUpQ/VIsYN_JaIYI/AAAAAAAABHw/RMZ-dfvGlfc/s1600/IMG_0894.JPG'}}

const JioDetails = () => {
    const { 
        imageStyle, 
        imageContainerStyle, 
        titleStyle, 
        locationStyle,
        timeTextStyle, 
        timeStyle, 
        textContainerStyle,
        iconStyle,
        iconContainerStyle
    } = styles;

    return (
        <Card>
            <CardSection>
                <View style={imageContainerStyle}>
                    <Image 
                        style={imageStyle}
                        source={ Makisan }
                    />
                </View> 
 
                <View style={textContainerStyle}>
                    <Text style={titleStyle}>Makisan</Text>
                    <Text style={locationStyle}>NUS Kent Ridge Hall</Text>
                    <View style={timeStyle}>
                        <Text style={timeTextStyle}>12:40</Text>
                        <Text style={timeTextStyle}> | </Text>
                        <Text style={timeTextStyle}>13:20</Text>
                    </View>
                </View>
                <View style={iconContainerStyle}>
                    <Image 
                    style={iconStyle}
                    source={ Open } 
                    />
                </View>
                </CardSection>
        </Card>
    );
};

const styles = {
    textContainerStyle: {
        padding: 3,
        flex: 6,
        /* Figure out how to make it space out
        height: 80,
        flexDirection: 'column',
        justifyContent: 'space-around'
        */
    },
    titleStyle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold'
        //fontFamily: 'KaushanScript-Regular'
        //no error, but not sure whether font family will show up later 
    },
    locationStyle: {
        fontSize: 16,
        color: '#FFFFFF' 
    },
    timeTextStyle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    imageStyle: {
        height: 80,
        width: 80
    },
    iconStyle: {
        height: 40,
        width: 40,
    },
    iconContainerStyle: {
        flex: 1,
        padding: 3
    },
    imageContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        borderColor: '#FF7058',
        borderWidth: 2,
        borderRadius: 2,
        padding: 3,
        shadowColor: '#FF0000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        flex: 2.2 
    }, 
    timeStyle: {
        flexDirection: 'row',
        flex: 1
    }
};

export default JioDetails;