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
        foodChoices: this.props.orderDetails.foodChoices, 
        price: this.props.orderDetails.price, 
        specialRequests: this.props.orderDetails.specialRequests,
        keyboardHeight: new Animated.Value(0),
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

    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
        this.getUserInfo()
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
            joinerName: this.state.userData.displayName, // TODO: at some point, we'll keep track of users. then this will be taken from their account
            foodOrderNo: 9999, // TODO: this should be dynamically generated somehow at some point. consider tracking length of foodOrders array?
            price: this.state.price,
            specialRequests: this.state.specialRequests,
            hasPaid: false,
            hasCollected: false
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
                        placeholder="What do I want to order?"
                        label="YOUR ORDER"
                        value={this.state.foodChoices.toString()}
                        onChangeText={foodChoices => this.setState({ foodChoices })}
                    /> 
                    <BigInput 
                        placeholder="How much does everything cost?"
                        label="PRICE"
                        value={this.state.price}
                        onChangeText={price => this.setState({ price })}
                        // TODO: typing into this element results in crashing. can we fix this?
                        // TODO: this should be a number input? can we find some other input for this? whatever looks nice
                    /> 
                    <BigInput 
                        placeholder="Any special requests?"
                        label="SPECIAL REQUESTS"
                        value={this.state.specialRequests}
                        onChangeText={specialRequests => this.setState({ specialRequests })}
                    /> 
                    <TouchableOpacity>
                        <View style={deleteViewStyle}>
                            <Text style={deleteTextStyle}>DELETE </Text>
                            <Image 
                                source={Delete}
                                style={deleteStyle}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <Button onPress={() => this.handleSubmit()}>EDITED</Button>
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

export default JioJoinerEditOrder;