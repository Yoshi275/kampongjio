import React, { Component } from 'react';
import { Text, View, Spinner, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Input } from '../components/common';
import { auth } from '../config';
import { Logo } from '../resources/images';

class LoginForm extends Component {
    state = { 
        email: '', 
        password: '', 
        error: '',
        loading: false,
    };
    
    handleSubmit() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
        
        auth.signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    renderButton() {
        if(this.state.loading) {
            return <Spinner size="small" />
        } else {
            return (
                <Button onPress={() => this.handleSubmit.bind(this)}>
                    LOGIN
                </Button>
            )
        }
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed.', loading: false})
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: '',
        });
        Actions.mainPage()
    }

    render() {
        const { 
            containerStyle,
            titleStyle,
            errorTextStyle,
            imageContainerStyle
        } = styles;
        
        return(
            <View style={containerStyle}> 
                <View>
                    <Text style={titleStyle}>Login</Text>

                    <Input 
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    /> 

                    <Input 
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry
                    />

                    <Text>
                        {this.state.password}
                    </Text>

                    <Button onPress={() => this.handleSubmit()}>
                        LOGIN
                    </Button>

                    {/* <View>{this.renderButton()}</View> */}
                </View>
                <View style={imageContainerStyle}>
                    <Image 
                        source={ Logo }
                        style={ styles.imageStyle }
                    />
                </View>
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
    },
    imageStyle: {
        height: 200,
        width: 200
    },
    imageContainerStyle: {
        backgroundColor: '#2D9B83',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default LoginForm;