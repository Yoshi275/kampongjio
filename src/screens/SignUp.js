import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Input, Button } from '../components/common';
import { Actions } from 'react-native-router-flux';
import { auth, db, storage } from '../config';
import { ImageUpload } from '../resources/icons/'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'

class SignUp extends Component {
    state = { 
        displayName : '',
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        birthDate: '',
        photoURL: '',
        avatarSource: null,
        imageURI: null
    };
    //TODO: Figure out how to upload pictures and storing them as URL. For now, it's hardcoded
    //TODO: Make it compulsory to fill in the field/inputs

    handleSubmit() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
            auth.createUserWithEmailAndPassword(email, password)
                .then(successMessage => {
                    this.addToUserDatabase()
                    this.uploadImage()
                    this.onLoginSuccess(successMessage)
                })
                .catch((error) => {
                    console.log('LOGIN AND SIGNUP FAILED')
                    console.log(error)
                    this.onLoginFail()
                });
    }

    addToUserDatabase() {
        console.log('attempting to add user to database')
        let postData = {
            email: this.state.email,
            displayName: this.state.displayName, 
            username: this.state.username,
            phoneNumber: this.state.phoneNumber,
            password: this.state.password,
            photoURL: 'https://i.pinimg.com/originals/82/f1/a0/82f1a0775df5b99ebc9373eafd771167.jpg',
            birthDate: this.state.birthDate
        }

        let uid = auth.currentUser.uid
        let dbLocation = '/users/' + uid;

        db
            .ref(dbLocation)
            .set(postData)
            .then((success) => {
                console.log('User Added: ', success) // success callback
                Actions.mainPage();
            })
            .catch((error) => {
                console.log('Error Message: ', error) // error callback
            })
    }

    uploadImage() {
        const mime = 'image/jpg'
        console.log('IMAGE LOADED UP!!!')
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        let uploadBlob = null
        const imageRef = storage.ref('profilePics').child(`${this.state.username}.jpg`)
        fs
            .readFile(this.state.avatarSource.uri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64`})
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
                console.log(imageRef.getDownloadURL())
            })
            .then((url) => {
                console.log(url)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    pickImage() {
        ImagePicker.showImagePicker(null, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                    uri: source.uri
                })
            }
        })
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed.', loading: false})
    }

    onLoginSuccess(message) {
        console.log('clearing login, going to mainpage')
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: '',
        });
    }

    
    render() {
        const {
            containerStyle,
            titleStyle,
            topSectionStyle,
            usernameStyle,
            textStyle,
            imageStyle,
            profileStyle
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
                    <TouchableOpacity onPress={() => this.pickImage()}>
                        <Image style={imageStyle} source={ImageUpload} />
                    </TouchableOpacity>
                    <Image
                        source={this.state.avatarSource}
                        style={profileStyle}
                    />
                </View>
                <Button onPress={this.handleSubmit.bind(this)}>
                    SUBMIT
                </Button>
            </View>
        );
    }
}

const styles = {
    profileStyle: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
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
        fontSize: 32,
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
        height: 40,
        width: 40
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