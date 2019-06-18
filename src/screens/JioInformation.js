import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Input, Button, Card, CardSection } from '../components/common';
import JioInfo from '../components/JioInformation/JioInfo';

class JioInformation extends Component {
    render() {
        return(
            <View style={styles.containerStyle}>
                <JioInfo />
                <Button style={styles.buttonStyle}>+ JOIN JIO</Button>
            </View>
        );
    };
}

const styles = {
    containerStyle: {
        // flex is so that background color literally covers the whole background
        // can be a potential problems if settings of common components are changes
        flex: 1,
        backgroundColor: '#2D9B83',
        // flexDirection: 'column',
        justifyContent: 'space-between'
    },
};

export default JioInformation;