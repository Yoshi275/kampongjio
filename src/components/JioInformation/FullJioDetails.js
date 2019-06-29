// Clean up for front-end: 
// Create a master Styles list 
// Consider creating a js file for timeContainer section
// Figure out how to do something like style inheritance or overriding esp for texts in timeContainer section
// As of now, am sacrificing some aesthetics of front-end for back-end functionality
// and improving code readability


import React, { Component } from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import HeaderSection from './HeaderSection';
import { Makisan }  from '../../resources/images';
import { TimeOrange } from '../common';

import {
    JIO_COMPLETED, // to be for state constants
    JIO_OPEN,
    JIO_CLOSED,
    JIO_PAID,
    JIO_ARRIVED
} from '../../data/jio-states'


class FullJioDetails extends Component {
    render() {
        const { 
            imageStyle,
            imageContainerStyle,
            textStyle,
            titleStyle,
         } = styles;

        return(
            <View>
                <HeaderSection>
                    <View style={imageContainerStyle}>
                        <Image 
                        source={ Makisan }
                        style={imageStyle}
                        /> 
                    </View>

                    <View>
                        <Text style={titleStyle}>{this.props.order.store}</Text> 
                        <Text style={textStyle}>Coordinator : {this.props.order.coordinatorName}</Text>
                        <Text style={textStyle}>{this.props.order.phoneNumber}</Text>
                        
                    </View>
                </HeaderSection>

                <Text style={textStyle}>Status : {this.props.order.jioStatus === "jioOpen" ? 'Jio Open' : 'Jio Closed'}</Text>
                <Text style={textStyle}>Location : {this.props.order.jioLocation}</Text>

                 <TimeOrange>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[textStyle, {color: '#000000'}]}>Jio Open : {this.props.order.jioOpenTime}</Text>
                        <Text style={[textStyle, {color: '#000000'}]}>Jio Close : {this.props.order.jioCloseTime}</Text>
                        <Text style={[textStyle, {color: '#000000'}]}>Arrival Time : {this.props.order.jioArrivalTime}</Text>
                    </View>
                </TimeOrange>

                <View style={{flexDirection: 'row'}}>
                    <Text style={textStyle}>Menu : </Text>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                    <TouchableOpacity onPress={()=> Linking.openURL( this.props.order.jioMenuURL )}>
                        <Text style={[textStyle, {fontWeight: '800', textDecorationLine:'underline'}]}>
                            {this.props.order.jioMenuURL}
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <Text style={textStyle}>Delivery App : {this.props.order.deliveryApp}</Text>
                <Text style={textStyle}>Delivery Cost (Total) : {this.props.order.deliveryCost}</Text>
                <Text style={textStyle}>Promo Code : {this.props.order.promoCode}</Text>
            </View> 
        );
    }
}

const styles = {
    imageStyle: {
        height: 120,
        width: 120
    },
    titleStyle: {
        fontSize: 30,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft:5,
        marginRight: 5
        //fontFamily: 'KaushanScript-Regular' 
        // TODO: have font show up. not working?
    },
    textStyle: {
        fontSize: 18,
        color: '#FFFFFF',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
        marginBottom: 3,
    },
    imageContainerStyle: {
        // flex: 1
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
        shadowRadius: 2
    },
};

export default FullJioDetails;