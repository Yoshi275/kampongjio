import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Input, Button, TimeOrange } from '../components/common';
import { db } from '../config';
import { Delete } from '../resources/icons';

class CoordinatorEditJio extends Component {
    state = { 
        store: this.props.order.store, 
        jioMenuURL: this.props.order.jioMenuURL, 
        jioLocation: this.props.order.jioLocation, 
        deliveryApp: this.props.order.deliveryApp,
        deliveryCost: this.props.order.deliveryCost,
        promoCode: this.props.order.promoCode,
        jioOpenTime: this.props.order.jioOpenTime,
        jioCloseTime: this.props.order.jioCloseTime,
        jioArrivalTime: this.props.order.jioArrivalTime,
        order: {},
        firebaseOrderId: '',
        userData: {}
    };

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

    handleSubmit() {
        // a method called after button is pressed
        const postData = {
            orderId: 9999, // TODO: generate this somehow in future
            store: this.state.store, 
            coordinatorName: this.state.userData.displayName, // TODO: get info from user account
            phoneNumber: this.state.userData.phoneNumber, // TODO: get info from user account
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
                    jioOrderId: this.state.firebaseOrderId,
                    uid: this.props.uid
                });
            })
            .catch((error) => {
                console.log('Error Message: ', error) // error callback
            })
    }

    componentDidMount() {
        this.getUserInfo()
    }
    
    render() {
        const { 
            storeStyle, 
            containerStyle, 
            labelStyle,
            deleteTextStyle,
            deleteViewStyle
        } = styles;

        return(
            <View style={containerStyle}>
                {/* <Text>{this.props.uid}</Text>
                <Text>{this.state.userData.username}</Text> */}
                <Text style={storeStyle}>{this.state.store}</Text>
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
                    <View style={{flex: 3}}>
                        <Text style={labelStyle}>Jio Open: {this.state.jioOpenTime}</Text>
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
                <TouchableOpacity>
                    <View style={deleteViewStyle}>
                        <Text style={deleteTextStyle}>DELETE </Text>
                        <Image 
                            source={Delete}
                            style={styles.deleteStyle}
                        />
                    </View>
                </TouchableOpacity>
                <Button onPress={() => this.handleSubmit() }>EDIT!</Button>
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
    labelStyle: {
        fontSize: 18,
        marginLeft: 10,
        // marginRight: 10,
        fontWeight: '400',
        color: '#FFFFFF'
    },
    deleteStyle: {
        height: 30,
        width: 30,
    },
    deleteTextStyle: {
        font: 40,
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
export default CoordinatorEditJio;