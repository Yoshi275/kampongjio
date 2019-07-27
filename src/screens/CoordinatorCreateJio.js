import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Input, Button, TimeOrange, Card } from '../components/common';
import { db , storage } from '../config';
import { ImageUpload } from '../resources/icons/'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'

class CoordinatorCreateJio extends Component {
    state = { 
        store: '', 
        jioMenuURL: '', 
        jioLocation: '', 
        deliveryApp: '',
        deliveryCost: '',
        minOrder: '',
        discount: '',
        jioOpenTime: '',
        jioCloseTime: '',
        jioArrivalTime: '',
        order: {},
        firebaseOrderId: '',
        userData: {},
        receipt: false,
        avatarSource: null,
        uri: null
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
                    uri: source.uri,
                    photoURL: ''
                })
            }
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
        const imageRef = storage.ref('restaurants').child(`${this.state.store.toLowerCase().replace(/\s/g, '')}.jpg`)
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
            })
            .then((url) => {
                console.log(url)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    //TODO: Minimum order need not be required? Delivery App need to be req?
    checkInput() {
        if(this.state.store === '') {
            alert('Store name required');
        } else if(this.state.jioLocation === '') {
            alert('Location required');
        } else if(this.state.deliveryCost === '') {
            alert('Delivery cost required');
        } else if(this.state.minOrder === '') {
            alert('Minimum order required');
        } else if(this.state.discount === '') {
            alert('Discount required');
        } else if(this.state.jioOpenTime === '') {
            alert('Jio Open time required')
        } else if(this.state.jioCloseTime === '') {
            alert('Jio Close time required')
        } else if(this.state.jioArrivalTime === '') {
            alert('Jio Arrival time required')
        } else { 
            this.handleSubmit()
        }
    }

    renderAvatar() {
        if(this.state.avatarSource === null) {
            return null;
        } else {
            return (
                <View style={styles.avatarViewStyle}>
                    <Image
                        source={this.state.avatarSource}
                        style={styles.profileStyle}
                    />
                </View>
            );
        }
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
            minOrder: this.state.minOrder,
            discount: this.state.discount,
            receipt: this.state.receipt,
            foodOrders: []
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
                if(this.state.avatarSource !== null) {
                    this.uploadImage()
                }
                Actions.jioJoinerOrder({ 
                    order: this.state.order, 
                    jioOrderId: this.state.firebaseOrderId,
                    uid: this.props.uid,
                    fromCoordinator: true
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
            imageStyle,
            imageUploadStyle,
            imageTextStyle,
        } = styles;

        return(
            <View style={containerStyle}>
                <ScrollView>
                {/* <Text>{this.props.uid}</Text>
                <Text>{this.state.userData.username}</Text> */}
                <Text style={storeStyle}>NEW JIO</Text>
                <Input 
                    placeholder="Where do I want to eat from?"
                    label="Store*"
                    value={this.state.store}
                    onChangeText={store => this.setState({ store })}
                /> 
                <Input 
                    placeholder="Copy and paste Menu URL"
                    label="Menu"
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
                    label="Delivery App"
                    value={this.state.deliveryApp}
                    onChangeText={deliveryApp => this.setState({ deliveryApp })}
                /> 
                <Input 
                    placeholder="How much is delivery?"
                    label="Delivery Cost ($)*"
                    value={this.state.deliveryCost}
                    onChangeText={deliveryCost => this.setState({ deliveryCost })}
                    keyboardType='numeric'
                    
                /> 
                <Input 
                    placeholder="What is the minimum order?"
                    label="Minimum Order ($)*"
                    value={this.state.minOrder}
                    onChangeText={minOrder => this.setState({ minOrder })}
                    keyboardType='numeric'
                /> 
                <Input 
                    placeholder="What is the discount (how many % off)?"
                    label="Discount (%)*"
                    value={this.state.discount}
                    onChangeText={discount => this.setState({ discount })}
                    keyboardType='numeric'
                /> 
                <TimeOrange>    
                    <View style={{flex: 3}}>
                        <Input 
                            style={{color: '#000000'}}
                            placeholder="24:00"
                            label="Jio Open*"
                            value={this.state.jioOpenTime}
                            onChangeText={jioOpenTime => this.setState({ jioOpenTime })}

                        /> 
                        <Input 
                            placeholder="24:00"
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
                <Card>
                    <TouchableOpacity onPress={() => this.pickImage()}>
                        <View style= {imageUploadStyle}>
                            <Text style={imageTextStyle}>UPLOAD RESTAURANT IMAGE</Text>
                            <Image style={imageStyle} source={ImageUpload} />
                        </View>
                    </TouchableOpacity>
                    {this.renderAvatar()}
                </Card>
                </ScrollView>

                <Button onPress={() => this.checkInput() }>LET'S JIO!</Button>
            </View>
        );
    }
}

const styles = {
    profileStyle: {
        height: 120,
        width: 120,
        shadowColor: '#FFFFFF',
        shadowOffset: {height: 3},
        shadowOpacity: 0.8
    },
    imageStyle: {
        height: 40,
        width: 40,
        tintColor: '#FFFFFF'
    },
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
        marginBottom: 5,
        marginLeft: 40,
        marginRight: 40,
        borderColor: '#FF7058',
        borderStyle: 'dotted',
        backgroundColor: '#F3A462',
    },
    imageUploadStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5, 
        paddingBottom: 5
    },
    imageTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingRight: 3
    },
    avatarViewStyle: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 10
    }
};
export default CoordinatorCreateJio;