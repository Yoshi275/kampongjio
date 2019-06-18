// Clean up for front-end: 
// Create a master Styles list 
// Consider creating a js file for timeContainer section
// Figure out how to do something like style inheritance or overriding esp for texts in timeContainer section
// As of now, am sacrificing some aesthetics of front-end for back-end functionality
// and improving code readability


import React, { Component } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import HeaderSection from './HeaderSection';
import { InfoDisplay } from '../common';
import { Makisan }  from '../../resources/images';

class JioInfo extends Component {
    render() {
        const { 
            imageStyle,
            imageContainerStyle,
            textStyle,
            titleStyle,
            timeTitleContainerStyle,
            timeContainerStyle,
            timeTitleStyle,
            timeTextStyle,
            timeBodyStyle,
            timeStyleLeft,
            timeStyleRight
         } = styles;

        const url = "https://order.makisan.com/en_SG/";

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
                        <InfoDisplay text={'Coordinator :'}>
                            <Text style={textStyle}>Cheryl</Text>
                        </InfoDisplay>
                        <Text style={textStyle}>Phone Number</Text>
                        
                    </View>
                </HeaderSection>

                <InfoDisplay text={'Status :'}>
                    <Text style={textStyle}>Jio Open</Text>
                </InfoDisplay>
                <InfoDisplay text={'Location: '}>
                    <Text style={textStyle}>NUS Kent Ridge Hall</Text>
                </InfoDisplay>

                <View style={timeContainerStyle}>
                    <View style={timeTitleContainerStyle}>
                        <Text style={timeTitleStyle}>TIME</Text>
                    </View>

                    <View style={timeBodyStyle}>
                            <InfoDisplay text={'Jio Open :'}>
                                <Text style={textStyle}>12:20</Text>
                            </InfoDisplay>
                            <InfoDisplay text={'Jio Close :'}>
                                <Text style={textStyle}>12:45</Text>
                            </InfoDisplay>
                            <InfoDisplay text={'Arrival Time :'}>
                                <Text style={textStyle}>13:20</Text>
                            </InfoDisplay>
                    </View>
                </View>

                <InfoDisplay text={'Menu :'}>
                    <Text style={textStyle} onPress={()=> Linking.openURL( url )}>
                        { url }
                    </Text>
                </InfoDisplay>
                <InfoDisplay text={'Delivery App :'}>
                    <Text style={textStyle}>Grab Food</Text>
                </InfoDisplay>
                <InfoDisplay text={'Delivery Cost (Total) :'}>
                    <Text style={textStyle}>$2</Text>
                </InfoDisplay>
                <InfoDisplay text={'Promo Code :'}>
                    <Text style={textStyle}>FRESH20 (20%)</Text>
                </InfoDisplay>
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
    },
    timeTitleStyle: {
        fontSize: 24,
        color: '#000000',
        fontWeight: 'bold',
        marginLeft:5,
        marginRight: 5,
        borderWidth: 1.5,
        borderColor: '#000000',
        paddingLeft: 10,
        paddingRight: 10 
        
    }, 
    timeTitleContainerStyle: {
        alignItems: 'center',
    },
    timeBodyStyle: {
        fontColor: '#000000'    
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

export default JioInfo;