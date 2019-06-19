import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Input, Button } from '../components/common';
import { Hourglass } from '../resources/icons';

class CoordinatorCreateJio extends Component {
    state = { 
        store: '', 
        jioMenuURL: '', 
        jioLocation: '', 
        deliveryApp: '',
        deliveryCost: '',
        promoCode: '',
        jioOpenTime: '',
        jioCloseTime: '',
        jioArrivalTime: ''
    };

    render() {
        const { 
            storeStyle, 
            containerStyle, 
            timeContainerStyle, 
            timeImageStyle,
        } = styles;

        return(
            <View style={containerStyle}>
                <Text style={storeStyle}>YOUR NEW JIO</Text>
                <Input 
                placeholder="Where do I want to eat from?"
                label="Store*"
                value={this.state.store}
                onChangeText={location => this.setState({ store })}
                /> 
                <Input 
                placeholder="What do they serve?"
                label="Menu*"
                value={this.state.jioMenuURL}
                onChangeText={location => this.setState({ jioMenuURL })}
                /> 
                <Input 
                placeholder="Where should they pick up the food?"
                label="Location*"
                value={this.state.jioLocation}
                onChangeText={location => this.setState({ jioLocation })}
                /> 
                <Input 
                placeholder="What app am I ordering from?"
                label="Delivery App*"
                value={this.state.deliveryApp}
                onChangeText={location => this.setState({ deliveryApp })}
                /> 
                <Input 
                placeholder="Where do I want to eat from?"
                label="Delivery Cost*"
                value={this.state.deliveryCost}
                onChangeText={location => this.setState({ deliveryCost })}
                /> 
                <Input 
                placeholder="What is the promo code (how many % off)?"
                label="Promo Code*"
                value={this.state.promoCode}
                onChangeText={location => this.setState({ promoCode })}
                /> 
                <View style={timeContainerStyle}>
                    <Image style={timeImageStyle} source={Hourglass} />    

                    <View style={{ flex: 3 }}>
                        <Input 
                        style={{color: '#000000'}}
                        placeholder="00:00"
                        label="Jio Open*"
                        value={this.state.jioOpenTime}
                        onChangeText={location => this.setState({ jioOpenTime })}
                        /> 
                        <Input 
                        placeholder="00:00"
                        label="Jio Close*"
                        value={this.state.jioCloseTime}
                        onChangeText={location => this.setState({ jioCloseTime })}
                        /> 
                        <Input 
                        placeholder="00:00"
                        label="Arrival Time*"
                        value={this.state.jioArrivalTime}
                        onChangeText={location => this.setState({ jioArrivalTime })}
                        /> 
                    </View>
                </View>
                <Button>LET'S JIO!</Button>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#2D9B83',
        justifyContent: 'space-between'
    },
    storeStyle: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 32,
        color: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 50,
        marginRight: 50,
        borderColor: '#FF7058',
        backgroundColor: '#F3A462',
    },
    timeContainerStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        marginBottom: 10,
        // marginLeft: 15,
        // marginRight: 15,
        backgroundColor: '#F3A462',
        flexDirection: 'row',
    },
    timeImageStyle: {
        flex: 1,
        position: 'relative',
        marginTop: 5, 
        marginBottom: 5,
        marginLeft: 5,
        height: 90,
        width: 90
    }, 
};
export default CoordinatorCreateJio;