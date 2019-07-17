import React, { Component } from 'react';
import { Text, View, Animated, Keyboard, Dimensions, UIManager } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { BigInput, Button } from '../components/common';
import { auth } from '../config';

// const { State: TextInputState } = TextInput;

class LoginForm extends Component {
    state = { 
        email: '', 
        password: '', 
        error: '',
        loading: new Animated.Value(0),
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
        console.log('Submitting!')
        // let postData = {
        //     foodChoices: [this.state.foodChoices],
        //     joinerName: 'Cheryl', // TODO: at some point, we'll keep track of users. then this will be taken from their account
        //     foodOrderNo: 9999, // TODO: this should be dynamically generated somehow at some point. consider tracking length of foodOrders array?
        //     price: this.state.price,
        //     specialRequests: this.state.specialRequests,
        //     hasPaid: false,
        //     hasCollected: false
        // }

        // let jioOrderId = this.props.jioOrderId; // for accessing the array, has to be changed in the future
        // let dbLocation = '/allOrders/' + jioOrderId + '/foodOrders/';

        // db
        //     .ref(dbLocation)
        //     .push(postData)
        //     .then((success) => {
        //         console.log('Success Message: ', success) // success callback
        //         Actions.mainPage(); // TODO: Add some way to confirm that order has been made/switch to dashboard when it's ready
        //     })
        //     .catch((error) => {
        //         console.log('Error Message: ', error) // error callback
        //     })
    }

    render() {
        const { containerStyle, titleStyle, errorTextStyle } = styles;
        return(
            <Animated.View style={[containerStyle, { paddingBottom: this.state.keyboardHeight }]}> 
                <View>
                    <Text style={titleStyle}>Login</Text>
                    <BigInput 
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    /> 
                    <BigInput 
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                    <Text style={errorTextStyle}>
                        {this.state.error}
                    </Text>
                </View>
                <Button onPress={() => this.handleSubmit()}>SUBMIT ORDER</Button>
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
    titleStyle: {
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
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
};

export default LoginForm;