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

class FullJioDetails extends Component {
    render() {
        const { 
            imageStyle,
            imageContainerStyle,
            textStyle,
            titleStyle,
         } = styles;

        const coordinatorName = 'Cheryl';
        const phoneNumber = '9033 1173';
        const jioStatus = 'Jio Open';
        const jioLocation = 'NUS Kent Ridge Hall';
        const jioOpenTime = '12:20';
        const jioCloseTime = '12:45';
        const jioArrivalTime = '13:20';
        const jioMenuURL = 'https://order.makisan.com/en_SG/';
        const deliveryApp = 'GrabFood';
        const deliveryCost = '$2';
        const promoCode = 'FRESH20 (20%)';

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
                        <Text style={titleStyle}>Makisan</Text> 
                        <Text style={textStyle}>Coordinator : {coordinatorName}</Text>
                        <Text style={textStyle}>{phoneNumber}</Text>
                        
                    </View>
                </HeaderSection>

                <Text style={textStyle}>Status : {jioStatus}</Text>
                <Text style={textStyle}>Location : {jioLocation}</Text>

                 <TimeOrange>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[textStyle, {color: '#000000'}]}>Jio Open : {jioOpenTime}</Text>
                        <Text style={[textStyle, {color: '#000000'}]}>Jio Close : {jioCloseTime}</Text>
                        <Text style={[textStyle, {color: '#000000'}]}>Arrival Time : {jioArrivalTime}</Text>
                    </View>
                </TimeOrange>

                <View style={{flexDirection: 'row'}}>
                    <Text style={textStyle}>Menu : </Text>
                    <TouchableOpacity onPress={()=> Linking.openURL( jioMenuURL )}>
                        <Text style={[textStyle, {fontWeight: '800', textDecorationLine:'underline'}]}>
                            {jioMenuURL}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={textStyle}>Delivery App : {deliveryApp}</Text>
                <Text style={textStyle}>Delivery Cost (Total) : {deliveryCost}</Text>
                <Text style={textStyle}>Promo Code : {promoCode}</Text>
            </View> 
        );
    };
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
        //no error, but the font cannot show up
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