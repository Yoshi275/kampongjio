// For jios, which the user is a part of, but not initiated

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection } from '../common';
import { jioStatusIcon } from '../../data/jioStatus';
import { Edit, Food } from '../../resources/icons';
// import { Makisan, McDonalds, AlAmaan }  from '../../resources/images';
// import PayButton from './PayButton';


class DashboardJioDetails extends Component {
    state = {
        jioJoinOrderId: null,
        orderDetails: {},
        photoURL: null,
        isPhotoDefault: true
    }

//TODO: Add getProfilePhoto as well

    componentDidMount() {
        let foodOrders = Object.entries(this.props.order.foodOrders)
        for(let i = 0; i < foodOrders.length; i++) {
            if(foodOrders[i][1].joinerName === this.props.userData.displayName) {
                this.setState({
                    orderDetails: foodOrders[i][1],
                    jioJoinOrderId: foodOrders[i][0]
                })
            }
        }
    }
    
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
            iconContainerStyle,
        } = styles;
    
        const jioImage = Food;
        const jioStatusImage = jioStatusIcon(this.props.order.jioStatus);

        return (
            <TouchableOpacity onPress={() => { Actions.jioInformation({ 
                    order: this.props.order, 
                    orderDetails: this.state.orderDetails,
                    jioOrderId: this.props.jioOrderId,
                    jioJoinOrderId: this.state.jioJoinOrderId,
                    fromDashboard: true }) 
            }}> 
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
                                source={jioStatusImage} 
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
        paddingLeft: 3,
        paddingRight: 3,
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    titleStyle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    locationStyle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontStyle: 'italic'
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
        height: 35,
        width: 35,
    },
    editStyle: {
        height: 25,
        width: 25
    },
    iconContainerStyle: {
        flex: 1,
        margin: 3,
        flexDirection: 'column',
    },
    imageContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 3,
        borderColor: '#FF7058',
        borderWidth: 2,
        borderRadius: 2,
        padding: 3,
        flex: 2.5 
    }, 
    timeStyle: {
        flexDirection: 'row',
        flex: 1
    }
};

export default DashboardJioDetails;