import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, NavBar, Button } from '../components/common';
import { ProfileIcon } from '../resources/icons';

class Profile extends Component {
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

        const displayName = 'Cheryl Ng';
        const username = '@yoshi275';
        const phoneNumber = '91234567';
        const birthDate = "21/10/1999";
        const email = "test@gmail.com";

        return(
            <View style={containerStyle}>
                <View>
                    <View style={topSectionStyle}>
                        <View style ={imageContainerStyle}>
                            <Image
                                source = {ProfileIcon}
                                style = {imageStyle}
                            />
                        </View>
                        <Text style={titleStyle}>{displayName}</Text>
                        <Text style={usernameStyle}>{username}</Text>
                    </View>
                    <Card>
                        <Text style={textStyle}>Email: {email}</Text>
                        <Text style={textStyle}>Birthday: {birthDate} </Text>
                        <Text style={textStyle}>Phone Number: {phoneNumber}</Text>
                    </Card>
                </View>
                <View>
                    <Button>
                        SETTINGS
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

export default Profile;