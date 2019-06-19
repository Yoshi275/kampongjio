// Clean up for front-end: 
// Create a master Styles list 
// Consider creating a js file for timeContainer section
// Figure out how to do something like style inheritance or overriding esp for texts in timeContainer section
// As of now, am sacrificing some aesthetics of front-end for back-end functionality
// and improving code readability


import React, { Component } from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import HeaderSection from './HeaderSection';
import { Makisan, Hourglass }  from '../../resources/images';

class FullJioDetails extends Component {
    render() {
        const { 
            imageStyle,
            imageContainerStyle,
            textStyle,
            titleStyle,
            timeImageStyle,
            timeContainerStyle,
            //timeTitleStyle,
            timeTextStyle,
            timeBodyStyle,
            //timeStyleLeft,
            //timeStyleRight
         } = styles;

        const coordinator = 'Cheryl';
        const status = 'Jio Open';
        const location = 'NUS Kent Ridge Hall';
        const timeOpen = '12:20';
        const timeClose = '12:45';
        const timeArrival = '13:20';
        const url = 'https://order.makisan.com/en_SG/';
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
                        <Text style={textStyle}>Coordinator : {coordinator}</Text>
                        <Text style={textStyle}>Phone Number</Text>
                        
                    </View>
                </HeaderSection>

                <Text style={textStyle}>Status : {status}</Text>
                <Text style={textStyle}>Location : {location}</Text>

                <View style={timeContainerStyle}>
                    <View>
                        <Image style={timeImageStyle} source={Hourglass} />    
                    </View>

                    <View style={timeBodyStyle}>
                        <Text style={timeTextStyle}>Jio Open : {timeOpen}</Text>
                        <Text style={timeTextStyle}>Jio Close : {timeClose}</Text>
                        <Text style={timeTextStyle}>Arrival Time : {timeArrival}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text style={textStyle}>Menu : </Text>
                    <TouchableOpacity onPress={()=> Linking.openURL( url )}>
                        <Text style={[textStyle, {fontWeight: '800', textDecorationLine:'underline'}]}>
                            {url}
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
    timeTextStyle: {
        fontSize: 18,
        color: '#000000',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 3,
        marginBottom: 3,
    },
    timeContainerStyle: {
        paddingTop: 5,
        paddingBottom: 5,
        // marginLeft: 15,
        // marginRight: 15,
        backgroundColor: '#F3A462',
        flexDirection: 'row'
    },
    timeImageStyle: {
        height: 100,
        width: 100
    }, 
    timeTitleContainerStyle: {
        alignItems: 'flex-start',
    },
    timeBodyStyle: {
        //fontColor: '#000000'    
    },
    timeStyleLeft: {
        flex: 1,
        paddingLeft: 20,
        alignItems: 'flex-start'
    },
    timeStyleRight: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 20
    }
}

export default FullJioDetails;