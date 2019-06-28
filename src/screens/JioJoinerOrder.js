import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { BigInput, Button } from '../components/common';
import { db } from '../config';

class JioJoinerOrder extends Component {
    state = { 
        foodChoices: '', 
        price: '', 
        specialRequests: ''
    };

    handleSubmit() {
        let postData = {
            foodChoices: this.state.foodChoices,
            joinerName: 'Cheryl', // TODO: at some point, we'll keep track of users. then this will be taken from their account
            foodOrderNo: 9999, // TODO: this should be dynamically generated somehow at some point. consider tracking length of foodOrders array?
            price: '8.80', // TODO: Until price var is fixed, this will have to do
            specialRequests: this.state.specialRequests,
        }

        let orderId = this.props.order.orderId - 1; // for accessing the array
        let dbLocation = '/allOrders/' + orderId + '/foodOrders/';

        db
            .ref(dbLocation)
            .push(postData)
            .then((success) => {
                console.log('Success Message: ', success) // success callback
                Actions.mainPage(); // TODO: Add some way to confirm that order has been made/switch to dashboard when it's ready
            })
            .catch((error) => {
                console.log('Error Message: ', error) // error callback
            })
    }

    render() {
        const { containerStyle, storeStyle } = styles;
        const store = this.props.order.store;

        return(
            <View style={containerStyle}>
                <View>
                    <Text style={storeStyle}>{store}</Text>
                    <BigInput 
                        placeholder="What do I want to order?"
                        label="YOUR ORDER"
                        value={this.state.foodChoices}
                        onChangeText={foodChoices => this.setState({ foodChoices })}
                    /> 
                    <BigInput 
                        placeholder="How much does everything cost?"
                        label="PRICE"
                        value={this.state.price}
                        onChangeText={order => this.setState({ price })}
                        // TODO: typing into this element results in crashing. can we fix this?
                        // TODO: this should be a number input? can we find some other input for this? whatever looks nice
                    /> 
                    <BigInput 
                        placeholder="Any special requests?"
                        label="SPECIAL REQUESTS"
                        value={this.state.specialRequests}
                        onChangeText={specialRequests => this.setState({ specialRequests })}
                    /> 
                </View>
                <Button onPress={() => this.handleSubmit()}>SUBMIT ORDER</Button>
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

    }
};

export default JioJoinerOrder;