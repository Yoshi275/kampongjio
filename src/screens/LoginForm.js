import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity  } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Input, Spinner} from '../components/common';
import { auth, db } from '../config';
import { Logo } from '../resources/images';

class LoginForm extends Component {
    state = { 
        email: '', 
        password: '', 
        error: false,
        loading: false,
    };
    
    handleSubmit() {
        const { email, password } = this.state;

        this.setState({ error: false, loading: true });
        
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.onLoginSuccess()
            })
            .catch(() => {
                this.onLoginFail()
                    });
    }

    onLoginFail() {
        this.setState({ error: true, loading: false})
    }

    onLoginSuccess(message) {
        console.log('clearing login, going to mainPage')
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: false,
        });
        console.log('LOGIN SUCCESS')
        Actions.mainPage({
            uid: this.state.uid,
            userData: this.state.userData
        })
    }

    renderError() {
        if(this.state.error) {
            return(
                <View style={{marginTop: 5, marginBottom: 5}}>
                    <Text style={[styles.textStyle, {textAlign: 'center'}]}>AUTHENTICATION FAILED</Text>
                    <Text style={styles.errorTextStyle}>Have you signed up?</Text>
                </View>
            )
        } else {
            return null
        }
    }

    renderButton() {
        if(this.state.loading) {
            return (<Spinner size="small" />)
        } else {
            return (
                <Button onPress={this.handleSubmit.bind(this)}>
                    LOGIN
                </Button>
            )
        }
    }

    render() {
        const { 
            containerStyle,
            titleStyle,
            imageContainerStyle,
            imageStyle,
            textStyle,
            headerStyle
        } = styles;
        
        return(
            <View style={containerStyle}> 
                <View style={headerStyle}>
                    <Text style={textStyle}>KampongJio</Text>
                    <TouchableOpacity onPress={()=> Actions.signUp()}>
                        <Text style={textStyle}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={imageContainerStyle}>
                        <Image 
                            source={ Logo }
                            style={ imageStyle }
                        />
                    </View>
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
                </View>               
                <View>
                    {this.renderError()}
                    {this.renderButton()}
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
        color: '#000000',
        margin: 15,
        alignItems: 'center',
        backgroundColor: '#8CDCAC',
        padding: 3
    },
    errorTextStyle: {
        fontSize: 16,
        alignSelf: 'center',
        color: '#FFFFFF',
    },
    imageStyle: {
        height: 150,
        width: 150
    },
    imageContainerStyle: {
        margin: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 20,
        color: '#000000',
        fontWeight: '500',
    },
    headerStyle: {
        backgroundColor: '#8CDCAC',
        opacity: 0.85,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
};

export default LoginForm;