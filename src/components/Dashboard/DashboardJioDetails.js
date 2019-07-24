// For jios, which the user is a part of, but not initiated

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection } from '../common';
import { jioStatusIcon } from '../../data/jioStatus';
import { Edit, Food } from '../../resources/icons';
import { auth } from '../../config';
// import { Makisan, McDonalds, AlAmaan }  from '../../resources/images';
// import PayButton from './PayButton';


class DashboardJioDetails extends Component {
    state = {
        userDisplayName: null,
        jioJoinOrderId: null,
        orderDetails: {},
        uid: null
    }

    //TODO: Have an onPress in the delete image to somehow delete the order of this person. Image only appears when the jio is still open
    renderEdit() {
        if (this.props.order.jioStatus === '1jioOpen') {
            return(
                <TouchableOpacity onPress={() => Actions.jioJoinerEditOrder({
                    order: this.props.order,
                    jioOrderId: this.props.jioOrderId,
                    jioJoinOrderId: this.state.jioJoinOrderId,
                    orderDetails: this.state.orderDetails
                })}>
                    <Image 
                        style={styles.editStyle}
                        source={Edit}
                    />
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }

    componentDidMount() {
        let foodOrders = Object.entries(this.props.order.foodOrders)
        console.log('HERE ARE THE FOOD ORDERS: ')
        console.log(foodOrders)
        console.log(this.props.userData)
        for(let i = 0; i < foodOrders.length; i++) {
            if(foodOrders[i][1].joinerName === this.props.userData.displayName) {
                this.setState({
                    orderDetails: foodOrders[i][1],
                    jioJoinOrderId: foodOrders[i][0]
                }, () => {
                    console.log('ADDED TO JIO ORDER: ')
                    console.log(this.state.orderDetails)
                    console.log(this.state.jioJoinOrderId)
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
                            {//TODO: Show price (after calculator), and ideally order when status is 2jioClosed
                                /* <View>
                                <Text>PRICE?</Text>
                            </View> */}
                        </View>
                        <View style={iconContainerStyle}>
                            <Image 
                                style={iconStyle}
                                source={jioStatusImage} 
                            />
                            {this.renderEdit()}
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
    editStyle: {
        height: 25,
        width: 25
    },
    iconContainerStyle: {
        flex: 1,
        padding: 3,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
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