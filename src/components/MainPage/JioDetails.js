// A reusable component that house details of jio written in the form of card
// and card sections. This will display Image, restaurantName, location,
// CloseJioTime, PickupTime, and StatusIcon
// Consider making the layout more dynamic when we start hooking it up to a database

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection } from '../common';
import { Open } from '../../resources/icons';
import { Makisan }  from '../../resources/images';
import data from '../../data/AllJios.json';
import { db } from '../../config';

import {
    JIO_COMPLETED, // to be for state constants
    JIO_OPEN,
    JIO_CLOSED,
    JIO_PAID,
    JIO_ARRIVED
} from '../../data/jio-states'

class JioDetails extends Component {
    // state = { order: '' };
    
    // // constructor(order) {
    // //     super(order);
    // // }

    // componentDidMount() { // this directly adds order2 details in this file. eventually all info should come from jioInfo
    //     db
    //         .ref('/allOrders/order3')
    //         .on('value', snapshot => {
    //             let order = snapshot.val();
    //             this.setState({ order : order });
    //             console.log(order);
    //             console.log(order.store);
    //         });
    // }

    render() {
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
    
        //const store = data.allOrders.order1.store; // consider refactoring so it's just const store = store in future
        const jioStatusIcon = Open; // please use conditional formatting. based on state, load relevant icon
        const jioImage = Makisan; // please use conditional formatting based on name of store
        //const jioLocation = data.allOrders.order1.jioLocation;
        //const jioCloseTime = data.allOrders.order1.jioCloseTime;
        //const jioArrivalTime = data.allOrders.order1.jioArrivalTime;

        return (
            <TouchableOpacity onPress={() => { Actions.jioInformation({ order: this.props.order }) }}>
                <Card>
                    <CardSection>
                        <View style={imageContainerStyle}>
                            <Image 
                                style={imageStyle}
                                source={ jioImage }
                            />
                        </View> 
        
                        <View style={textContainerStyle}>
                            <Text style={titleStyle}>{this.props.order.store}</Text>
                            <Text style={locationStyle}>{this.props.order.jioLocation}</Text>
                            <View style={timeStyle}>
                                <Text style={timeTextStyle}>{this.props.order.jioCloseTime}</Text>
                                <Text style={timeTextStyle}> | </Text>
                                <Text style={timeTextStyle}>{this.props.order.jioArrivalTime}</Text>
                            </View>
                        </View>
                        <View style={iconContainerStyle}>
                            <Image 
                            style={iconStyle}
                            source={jioStatusIcon} 
                            />
                        </View>
                    </CardSection>
                </Card>
            </TouchableOpacity>
        );
    }
}

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
        fontWeight: 'bold',
        //fontFamily: 'KaushanScript-Regular'
        //no error, but the font cannot show up
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