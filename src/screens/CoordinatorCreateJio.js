import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Input, Button, TimeOrange } from '../components/common';
import { db } from '../config';

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
        jioArrivalTime: '',
        order: {},
        firebaseOrderId: 'hello',
    };

    handleSubmit() {
        // a method called after button is pressed
        const postData = {
            orderId: 9999, // TODO: generate this somehow in future
            store: this.state.store, 
            coordinatorName: '<INSERT NAME>', // TODO: get info from user account
            phoneNumber: 99998888, // TODO: get info from user account
            jioStatus: '1jioOpen',
            jioLocation: this.state.jioLocation,
            jioOpenTime: this.state.jioOpenTime,
            jioCloseTime: this.state.jioCloseTime,
            jioArrivalTime: this.state.jioArrivalTime,
            jioMenuURL: this.state.jioMenuURL,
            deliveryApp: this.state.deliveryApp,
            deliveryCost: this.state.deliveryCost,
            promoCode: this.state.promoCode,
            foodOrders: [],
        }

        const dbLocation = '/allOrders/';

        this.setState({ order: postData });

        db
            .ref(dbLocation)
            .push(postData)
            .then((response) => {
                console.log('Success Message: ', response) // success callback
                this.setState({ firebaseOrderId: response.getKey() });
                console.log(this.state.firebaseOrderId);
                Actions.jioJoinerOrder({ 
                    order: this.state.order, 
                    jioOrderId: this.state.firebaseOrderId
                });
            })
            .catch((error) => {
                console.log('Error Message: ', error) // error callback
            })
    }
    
    render() {
        const { 
            storeStyle, 
            containerStyle, 
        } = styles;

        return(
            <View style={containerStyle}>
                <Text style={storeStyle}>NEW JIO</Text>
                <Input 
                    placeholder="Where do I want to eat from?"
                    label="Store*"
                    value={this.state.store}
                    onChangeText={store => this.setState({ store })}
                /> 
                {/* TODO: Make the input URL link to a URL, instead of being a string in Firebase */}
                <Input 
                    placeholder="What do they serve?"
                    label="Menu*"
                    value={this.state.jioMenuURL}
                    onChangeText={jioMenuURL => this.setState({ jioMenuURL })}
                /> 
                <Input 
                    placeholder="Where should they pick up the food?"
                    label="Location*"
                    value={this.state.jioLocation}
                    onChangeText={jioLocation => this.setState({ jioLocation })}
                /> 
                <Input 
                    placeholder="What app am I ordering from?"
                    label="Delivery App*"
                    value={this.state.deliveryApp}
                    onChangeText={deliveryApp => this.setState({ deliveryApp })}
                /> 
                <Input 
                    placeholder="How much is delivery?"
                    label="Delivery Cost*"
                    value={this.state.deliveryCost}
                    onChangeText={deliveryCost => this.setState({ deliveryCost })}
                /> 
                <Input 
                    placeholder="What is the promo code (how many % off)?"
                    label="Promo Code*"
                    value={this.state.promoCode}
                    onChangeText={promoCode => this.setState({ promoCode })}
                /> 
                <TimeOrange>    
                    <View style={{flex: 1}}>
                        <Input 
                            style={{color: '#000000'}}
                            placeholder="00:00"
                            label="Jio Open*"
                            value={this.state.jioOpenTime}
                            onChangeText={jioOpenTime => this.setState({ jioOpenTime })}
                        /> 
                        <Input 
                            placeholder="00:00"
                            label="Jio Close*"
                            value={this.state.jioCloseTime}
                            onChangeText={jioCloseTime => this.setState({ jioCloseTime })}
                        /> 
                        <Input 
                            placeholder="00:00"
                            label="Arrival Time*"
                            value={this.state.jioArrivalTime}
                            onChangeText={jioArrivalTime => this.setState({ jioArrivalTime })}
                        /> 
                    </View>
                </TimeOrange>

                <Button onPress={() => this.handleSubmit() }>LET'S JIO!</Button>
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