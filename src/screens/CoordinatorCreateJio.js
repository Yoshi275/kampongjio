import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Input, Button, TimeOrange } from '../components/common';

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
                <TimeOrange>    
                    <View style={{flex: 1}}>
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
                </TimeOrange>

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
};
export default CoordinatorCreateJio;