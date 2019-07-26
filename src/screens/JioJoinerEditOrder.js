import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { BigInput, Button } from '../components/common';
import { db } from '../config';
import { Delete } from '../resources/icons';

class JioJoinerEditOrder extends Component {
    state = { 
        joinerName: this.props.orderDetails.joinerName,
        foodChoices: this.props.orderDetails.foodChoices, 
        foodOrderNo: this.props.orderDetails.foodOrderNo,
        price: this.props.orderDetails.price, 
        specialRequests: this.props.orderDetails.specialRequests,
    };
    
    checkInput() {
        if(this.state.foodChoices === '') {
            alert('Your order required');
        } else if(this.state.price === '') {
            alert('Price required');
        } else { 
            this.handleSubmit();
        }
    }

    handleSubmit() {
        let postData = {
            foodChoices: [this.state.foodChoices],
            joinerName: this.state.joinerName,
            foodOrderNo: this.state.foodOrderNo, // TODO: this should be dynamically generated somehow at some point. consider tracking length of foodOrders array?
            price: this.state.price,
            specialRequests: this.state.specialRequests,
            hasPaid: false,
            hasCollected: false
        }

        let jioOrderId = this.props.jioOrderId;
        let jioJoinOrderId = this.props.jioJoinOrderId
        let dbLocation = '/allOrders/' + jioOrderId + '/foodOrders/' + jioJoinOrderId + '/';

        db
            .ref(dbLocation)
            .update(postData)
            .then((success) => {
                console.log('Success Message: ', success) // success callback
                Actions.dashboard(); // TODO: Add some way to confirm that order has been made/switch to dashboard when it's ready
            })
            .catch((error) => {
                console.log('Error Message: ', error) // error callback
            })
    }

    handleDelete() {
        const dbLocation = '/allOrders/' + this.props.jioOrderId + '/foodOrders/' + this.props.jioJoinOrderId + '/'
        db
            .ref(dbLocation)
            .remove()
            .then((response) => {
                console.log('Success Message: ', response)  // success callback
                Actions.dashboard();
            })
            .catch((error) => {
                console.log('Error Message: ', error) // error callback
            })
    }

    render() {
        const { 
            containerStyle, 
            storeStyle, 
            deleteStyle, 
            deleteViewStyle, 
            deleteTextStyle 
        } = styles;

        return(
            <View style={containerStyle}>
                <ScrollView>
                    <Text style={storeStyle}>{this.props.order.store}</Text>
                    <BigInput 
                        placeholder="Item1(Quantity), Item2(Quantity), ..."
                        label="YOUR ORDER"
                        value={this.state.foodChoices.toString()}
                        onChangeText={foodChoices => this.setState({ foodChoices })}
                    /> 
                    <BigInput 
                        placeholder="How much does everything cost?"
                        label="PRICE ($)"
                        value={this.state.price}
                        onChangeText={price => this.setState({ price })}
                        keyboardType='numeric'
                    /> 
                    <BigInput 
                        placeholder="Any special requests?"
                        label="SPECIAL REQUESTS"
                        value={this.state.specialRequests}
                        onChangeText={specialRequests => this.setState({ specialRequests })}
                    /> 
                    <TouchableOpacity onPress={() => this.handleDelete()}>
                        <View style={deleteViewStyle}>
                            <Text style={deleteTextStyle}>DELETE </Text>
                            <Image 
                                source={Delete}
                                style={deleteStyle}
                            />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <Button onPress={() => this.checkInput()}>EDIT!</Button>
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
        fontSize: 26,
        color: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        borderColor: '#FF7058',
        backgroundColor: '#F3A462',
    },
    deleteStyle: {
        height: 30,
        width: 30,
    },
    deleteTextStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 5,
    },
    deleteViewStyle: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    }
};

export default JioJoinerEditOrder;