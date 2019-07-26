import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { BigInput, Button } from '../components/common';
import { db } from '../config';

class JioJoinerOrder extends Component {
    state = { 
        foodChoices: '', 
        price: '', 
        specialRequests: '',
        userData: {}
    };

    componentDidMount() {
        this.getUserInfo()
    }

    getUserInfo() {
        let dbLocation = '/users/' + this.props.uid + '/';
        db
            .ref(dbLocation)
            .on('value', snapshot => {
                if ( snapshot.val() === null ) {
                    console.log('NOTHING GRABBED IN DATA')
                    return null;
                } else {
                    const data = snapshot.val()
                    this.setState({
                        userData: {
                            displayName: data.displayName,
                            username: data.username,
                            phoneNumber: data.phoneNumber,
                            birthDate: data.birthDate,
                            email: data.email,
                            photoURL: data.photoURL
                        }
                    })
                    console.log('USER INFO LOADED INTO INITIATED')
                }
            });
    }

    checkInput() {
        if(this.state.foodChoices === '') {
            alert('Your order required');
        } else if(this.state.price === '') {
            alert('Price required');
        } else { 
            this.handleSubmit()
        }
    }

    handleSubmit() {
        let postData = {};
        if (this.props.fromCoordinator) {
            postData = {
                foodChoices: [this.state.foodChoices],
                joinerName: this.state.userData.displayName, // TODO: at some point, we'll keep track of users. then this will be taken from their account
                foodOrderNo: 9999, // TODO: this should be dynamically generated somehow at some point. consider tracking length of foodOrders array?
                price: this.state.price,
                specialRequests: this.state.specialRequests,
                hasPaid: true,
                hasCollected: true
            }
        } else {
            postData = {
                foodChoices: [this.state.foodChoices],
                joinerName: this.state.userData.displayName, // TODO: at some point, we'll keep track of users. then this will be taken from their account
                foodOrderNo: 9999, // TODO: this should be dynamically generated somehow at some point. consider tracking length of foodOrders array?
                price: this.state.price,
                specialRequests: this.state.specialRequests,
                hasPaid: false,
                hasCollected: false
            }
        }

        let jioOrderId = this.props.jioOrderId; // for accessing the array, has to be changed in the future
        let dbLocation = '/allOrders/' + jioOrderId + '/foodOrders/';

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
        const jioOrderId = this.props.jioOrderId;

        // transform: [{translateY: this.state.keyboardHeight}]
        // 
        return(
            <View style={containerStyle}> 
                <ScrollView>
                    <Text style={storeStyle}>{store}</Text>
                    <BigInput 
                        placeholder="Item1(Quantity), Item2(Quantity), ..."
                        label="YOUR ORDER"
                        value={this.state.foodChoices}
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
                </ScrollView>
                <Button onPress={() => this.checkInput()}>SUBMIT ORDER</Button>
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
    }
};

export default JioJoinerOrder;