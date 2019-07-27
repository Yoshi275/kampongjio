import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, NavBar, Button, TimeOrange } from '../components/common';
import { ProfileIcon } from '../resources/icons';
import { auth, db, storage } from '../config';
import { Actions } from 'react-native-router-flux';

class Profile extends Component {
    state = { 
        uid: null,
        displayName: '',
        username: '',
        phoneNumber: '',
        birthDate: '',
        email: '',
        photoURL: ''
    }

    componentDidMount() {
        this.getUserData()
    }

    getUserData() {
        const user = auth.currentUser
        if(user != null) {
            this.setState({
                uid: user.uid,
            }, () => {
                console.log(this.state.uid)
                let dbLocation = '/users/' + this.state.uid + '/';
                db
                .ref(dbLocation)
                .on('value', snapshot => {
                    if ( snapshot.val() === null ) {
                        console.log('NOTHING GRABBED IN DATA')
                        return null;
                    } else {
                        const data = snapshot.val()
                        this.setState({
                            displayName: data.displayName,
                            username: data.username,
                            phoneNumber: data.phoneNumber,
                            birthDate: data.birthDate,
                            email: data.email,
                            photoURL: data.photoURL
                        }, () => {
                            if(this.state.photoURL === '') {
                                this.getProfilePhoto()
                            }
                        })
                        console.log('USER INFO LOADED INTO PROFILE')
                    }
                });
            })
        }
    }

    getProfilePhoto() {
        storage
            .ref('profilePics')
            .child(`${this.state.username}.jpg`)
            .getDownloadURL()
            .then((url) => {
                console.log(url)
                this.setState({ photoURL: url })
            })
    }

    logOut() {
        auth
            .signOut()
            .then((success) => {
                console.log(success)
                Actions.loginForm()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const {
            containerStyle,
            imageStyle,
            imageContainerStyle,
            titleStyle,
            topSectionStyle,
            usernameStyle,
            textStyle
        } = styles;

        return(
            <View style={containerStyle}>
                <View>
                    <View style={topSectionStyle}>
                        <View style ={imageContainerStyle}>
                            <Image
                                source = {{uri: this.state.photoURL}}
                                style = {imageStyle}
                            />
                        </View>
                        <Text style={titleStyle}>{this.state.displayName}</Text>
                        <Text style={usernameStyle}>{this.state.username}</Text>
                    </View>
                    <Card>
                        <Text style={textStyle}>Email: {this.state.email}</Text>
                        <Text style={textStyle}>Birthday: {this.state.birthDate} </Text>
                        <Text style={textStyle}>Phone Number: {this.state.phoneNumber}</Text>
                    </Card>
                </View>
                <View>
                    <Button onPress={() => this.logOut()}>
                        LOG OUT
                    </Button>
                    <NavBar />
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
    topSectionStyle: {
        flexDirection: 'column', 
        alignItems: 'center',
        backgroundColor: '#8CDCAC',
        margin: 10,
        // borderWidth: 2,
        // borderRadius: 5,
        padding: 3
    },
    titleStyle: {
        fontSize: 24,
        color: '#000000',
        fontWeight: 'bold',
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
        height: 120,
        width: 120,
        borderRadius: 60
    },
    imageContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3A462',
        margin: 5,
        // borderWidth: 3,
        borderRadius: 70,
        // padding: 3,
        // borderColor: '#FF7058',
        height: 140,
        width: 140
    }
};

export default Profile;