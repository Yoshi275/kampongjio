import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Animated, Keyboard, Dimensions, UIManager } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { BigInput, Button } from '../components/common';
import { db } from '../config';
import { Delete } from '../resources/icons';

// const { State: TextInputState } = TextInput;

class JioJoinerEditOrder extends Component {
    //TODO: When called from Coordinator, the required prop is passed in, but I don't know how to 
    //      pass it in from OngoingDetails, thus this page will likely not render

    state = { 
        joinerName: this.props.orderDetails.joinerName,
        foodChoices: this.props.orderDetails.foodChoices, 
        foodOrderNo: this.props.orderDetails.foodOrderNo,
        price: this.props.orderDetails.price, 
        specialRequests: this.props.orderDetails.specialRequests,
        keyboardHeight: new Animated.Value(0)
    };

    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
    
    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }

    keyboardDidShow = (event) => {
        const { height: windowHeight } = Dimensions.get('window');
        const eventKeyboardHeight = event.endCoordinates.height;
        const gap = eventKeyboardHeight;
        // UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
        //     const fieldHeight = height;
        //     const fieldTop = pageY;
        //     const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
        //     if (gap >= 0) {
        //         return;
        //     }
            Animated.timing(this.state.keyboardHeight, {
                duration: 500,
                toValue: gap,
        }).start();
    };
 

    keyboardDidHide = (event) => {
        Animated.timing(this.state.keyboardHeight, {
            duration: 500,
            toValue: 0,
        }).start();
    };
    
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

        // transform: [{translateY: this.state.keyboardHeight}]
        // 
        return(
            <Animated.View style={[containerStyle, { paddingBottom: this.state.keyboardHeight }]}> 
                <View>
                    <Text style={storeStyle}>{this.props.order.store}</Text>
                    {//TODO: Change how we store the foodChoices, because now it is in arrays, and my way out
                     //      is to use .toString() which looks horrendous, and when stored might also look different
                    }
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
                </View>
                <Button onPress={() => this.handleSubmit()}>EDIT!</Button>
            </Animated.View>
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