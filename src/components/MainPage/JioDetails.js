import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection } from '../common';
import { Food } from '../../resources/icons';
import { jioStatusIcon } from '../../data/jioStatus';
import { storage } from '../../config';

class JioDetails extends Component {
    state = {
        photoURL: null,
        isPhotoDefault: true
    }

    componentDidMount() {
        this.getProfilePhoto()
    }

    getProfilePhoto() {
        storage
            .ref('restaurants')
            .child(`${this.props.order.store.toLowerCase()}.jpg`)
            .getDownloadURL()
            .then((url) => {
                console.log(url)
                this.setState({ 
                    photoURL: url,
                    isPhotoDefault: false
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    renderNextPage() {
        if(this.props.fromDashboard) {
            Actions.coordinator({ 
                order: this.props.order,
                jioOrderId: this.props.jioOrderId,

            });
        } else {
            Actions.jioInformation({ 
                order: this.props.order,
                jioOrderId: this.props.jioOrderId,
                uid: this.props.uid,
                isPhotoDefault: this.state.isPhotoDefault,
                photoURL: this.state.photoURL
            });
        }
    }

    render() {
        const { 
            imageStyle, 
            imageContainerStyle, 
            titleStyle, 
            locationStyle,
            timeTextStyle, 
            timeStyle, 
            textContainerStyle,
            iconStyle,
            iconContainerStyle
        } = styles;
    
        const jioStatusImage = jioStatusIcon(this.props.order.jioStatus);
    
        return (
            <TouchableOpacity onPress={() => this.renderNextPage()}>
                <Card>
                    <CardSection>
                        <View style={imageContainerStyle}>
                            <Image 
                                style={imageStyle}
                                source={this.state.isPhotoDefault ? Food : { uri: this.state.photoURL }}
                            />
                        </View> 
        
                        <View style={textContainerStyle}>
                            <Text style={titleStyle}>{this.props.order.store}</Text>
                            <Text style={locationStyle}>{this.props.order.jioLocation}</Text>
                            <View style={timeStyle}>
                                <Text style={timeTextStyle}>{this.props.order.jioCloseTime}</Text>
                                <Text style={timeTextStyle}> | </Text>
                                <Text style={timeTextStyle}>{this.props.order.jioArrivalTime}</Text>
                            </View>
                        </View>
                        <View style={iconContainerStyle}>
                            <Image 
                            style={iconStyle}
                            source={jioStatusImage} 
                            />
                        </View>
                    </CardSection>
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = {
    textContainerStyle: {
        paddingLeft: 3,
        paddingRight: 3,
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    titleStyle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    locationStyle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontStyle: 'italic'
    },
    timeTextStyle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    imageStyle: {
        height: 80,
        width: 80
    },
    iconStyle: {
        height: 35,
        width: 35,
    },
    iconContainerStyle: {
        flex: 1,
        margin: 3,
        // justifyContent: 'flex-start'
    },
    imageContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 3,
        borderColor: '#FF7058',
        borderWidth: 2,
        borderRadius: 2,
        padding: 3,
        flex: 2.5 
    }, 
    timeStyle: {
        flexDirection: 'row',
        flex: 1
    }
};

export default JioDetails;