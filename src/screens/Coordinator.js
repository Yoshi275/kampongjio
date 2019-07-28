import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, NavBar, Card } from '../components/common';
import { ImageUpload } from '../resources/icons';
import { db, storage } from '../config';
import CoordinatorFullJio from '../components/Coordinator/CoordinatorFullJio';
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'

class Coordinator extends Component {
    state = { 
        jioStatus : this.props.order.jioStatus, 
        receipt: this.props.order.receipt,
        receiptSource: null,
        uri: null
     };

    componentDidUpdate() {
        this.handleSubmit()
    }
    
    handleSubmit() {
        let postData = {
            jioStatus: this.state.jioStatus,
            receipt: this.state.receipt
        }

        const jioOrderId = this.props.jioOrderId;
        let dbLocation = '/allOrders/' + jioOrderId + '/';

        db
            .ref(dbLocation)
            .update(postData)
            .then((success) => {
                console.log('Success Message: ', success) // success callback
            })
            .catch((error) => {
                console.log('Error Message: ', error) // error callback
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
                    receiptSource: source,
                    uri: source.uri,
                })
            }
        })
    }

    uploadReceipt() {
        const mime = 'image/jpg'
        console.log('IMAGE LOADED UP!!!')
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        let uploadBlob = null
        const imageRef = storage.ref('receipts').child(`${this.props.jioOrderId}.jpg`)
        fs
            .readFile(this.state.receiptSource.uri, 'base64')
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
                this.setState({ receipt: true })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    renderReceiptUpload() {
        if ((this.state.jioStatus != '1jioOpen') && !this.state.receipt) {
            return(
            <Card>
                <TouchableOpacity onPress={() => this.pickImage()}>
                    <View style= {styles.imageUploadStyle}>
                        <Text style={styles.imageTextStyle}>UPLOAD RECEIPT</Text>
                        <Image style={styles.imageStyle} source={ImageUpload} />
                    </View>
                </TouchableOpacity>
                {this.renderReceipt()}
            </Card>
            );
        } 
    }

    renderReceipt() {
        if(this.state.receiptSource === null) {
            return null;
        } else {
            return (
                <View style={styles.receiptViewStyle}>
                    <Image
                        source={this.state.receiptSource}
                        style={styles.profileStyle}
                    />
                    <TouchableOpacity onPress={ () => this.uploadReceipt() }>
                        <Text style={styles.uploadStyle}>UPLOAD ME!</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    renderButton() {
        console.log(this.state.jioStatus);
        if( this.state.jioStatus === '1jioOpen' ) {
            return (
                <Button onPress={ () => this.setState({ jioStatus : '2jioClosed'}) }>JIO CLOSED</Button>
            );
        } else if( this.state.jioStatus === '2jioClosed' ) {
            return (
                <Button onPress={ () => this.setState({ jioStatus : '3jioArrived'}) }>FOOD ARRIVED</Button>
            );
        } else {        
            if (!this.state.receipt) {
                return(
                    <Text style={styles.uploadStyle}>PLEASE UPLOAD RECEIPT TO COMPLETE JIO</Text>
                );
            }
            return(
                <Button onPress={ () => {Actions.mainPage(); this.setState({ jioStatus : '4jioCompleted'});} }>JIO COMPLETED</Button>
            );
        }
    }
    
    render() {
        const store = this.props.order.store;

        const { 
            containerStyle,
            storeStyle,
            editStyle,
            headerStyle,
            textStyle
        } = styles; 

        return(
            <View style={containerStyle}>
                <ScrollView>
                    <Text style={storeStyle}>{store}</Text>
                    {this.renderReceiptUpload()}
                    <CoordinatorFullJio 
                        order={this.props.order}
                        jioOrderId={this.props.jioOrderId}
                        jioStatus={this.state.jioStatus}
                    />
                </ScrollView>
                <View>
                    {this.renderButton()}
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
        flexDirection: 'column',
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
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        // paddingLeft: 50,
        // paddingRight: 50,
        borderColor: '#FF7058',
        borderStyle: 'dotted',
        backgroundColor: '#F3A462',
        flex: 7,
    },
    editStyle: {
        height: 24,
        width: 24, 
        flex: 1
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
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
    receiptViewStyle: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 10
    },
    uploadStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFFFFF'
    }
}

export default Coordinator;