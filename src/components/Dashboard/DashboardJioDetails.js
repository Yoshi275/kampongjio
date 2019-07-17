// AS OF NOW, NOT USING IT UNLESS WE ARE THINKING OF DISPLAYING DIFFERENT INFO

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection } from '../common';
import PayButton from './PayButton';
import { Open, Close, Arrive, Paid, Complete, Food } from '../../resources/icons';
import { Makisan, McDonalds, AlAmaan }  from '../../resources/images';
import data from '../../data/AllJios.json';
import { db } from '../../config';

import { //TODO: Change status into states? Not sure how the constants help and later change status icon respectively
    JIO_COMPLETED, // to be for state constants
    JIO_OPEN,
    JIO_CLOSED,
    JIO_PAID,
    JIO_ARRIVED
} from '../../data/jioStatus'

class DashboardJioDetails extends Component {
    // state = {jioStatus: {this.props.order.jioStatus}};
    // console.log(this.state.jioStatus);

    //TODO: Unable to do so because need to have idea of registered users. 
    //      Link to the paymentIndication in firebase, and make it update when onPress is called
    
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
    
        // const jioImage = this.props.order.store === 'Makisan'
        //         ? Makisan
        //         : this.props.order.store === 'Al Amaan'
        //         ? AlAmaan : McDonalds;
        const jioImage = Food;
        const jioStatusIcon = this.props.order.jioStatus === 'jioOpen'
                ? Open 
                : this.props.order.jioStatus === 'jioClosed'
                    ? Close
                    : this.props.order.jioStatus === 'jioPaid' 
                        ? Paid
                        : this.props.order.jioStatus === 'jioArrived'
                            ? Arrive : Complete; 
        // please use conditional formatting. based on state, load relevant icon


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
                            <View>
                                <Text>PRICE?</Text>
                            </View>
                        </View>
                        <View style={iconContainerStyle}>
                            <Image 
                            style={iconStyle}
                            source={jioStatusIcon} 
                            />
                        </View>
                    </CardSection>
                    <CardSection>
                        
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

export default DashboardJioDetails;