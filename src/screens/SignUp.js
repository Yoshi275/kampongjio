import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from '../components/common';
import { Actions } from 'react-native-router-flux';

class SignUp extends Component {
    state = { 
        displayName : '',
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        birthDate: '',
        photoURL: '',
    };
    //TODO: Figure out how to upload pictures and storing them as URL?
    //TODO: Make it compulsory to fill in the field/inputs
    
    render() {
        const {
            containerStyle,
            titleStyle,
            topSectionStyle,
            usernameStyle,
            textStyle
        } = styles;

        return(
            <View style={containerStyle}>
            <View>
                <View style={topSectionStyle}>
                    <Text style={titleStyle}>SIGN UP</Text>
                </View>
                <Input 
                    placeholder="John Ang"
                    label="Full Name*"
                    value={this.state.displayName}
                    onChangeText={displayName => this.setState({ displayName })}
                /> 
                <Input 
                    placeholder="john_ang_99"
                    label="Username*"
                    value={this.state.username}
                    onChangeText={username => this.setState({ username })}
                /> 
                <Input 
                    placeholder="email@google.com"
                    label="Email*"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                /> 
                <Input 
                    placeholder="Recommended min 8 characters"
                    label="Password*"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry
                /> 
                <Input 
                    placeholder="Singapore number"
                    label="Phone Number*"
                    value={this.state.phoneNumber}
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                /> 
                <Input 
                    placeholder="DD/MM/YYYY"
                    label="Birthday*"
                    value={this.state.birthDate}
                    onChangeText={birthDate => this.setState({ birthDate })}
                /> 
                <Input 
                    placeholder="Will allow actual uploading"
                    label="Image URL*"
                    value={this.state.photoURL}
                    onChangeText={photoURL => this.setState({ photoURL })}
                /> 
                </View>
                <Button onPress={() => Actions.loginForm()}>
                    SUBMIT
                </Button>
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
    topSectionStyle: {
        flexDirection: 'column', 
        alignItems: 'center',
        backgroundColor: '#8CDCAC',
        margin: 10,
        padding: 3
    },
    titleStyle: {
        fontSize: 30,
        color: '#000000',
        // fontWeight: 'bold',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 18,
        color: '#FFFFFF',
        margin: 10,
    },
    usernameStyle: {
        fontSize: 16,
        color: '#000000',
        // justifyContent: 'center'
        alignItems: 'center'
    },
    imageStyle: {
        height: 100,
        width: 100
    },
    imageContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3A462',
        margin: 5,
        borderWidth: 3,
        borderRadius: 70,
        // padding: 3,
        borderColor: '#FF7058',
        height: 140,
        width: 140
    }
};

export default SignUp;