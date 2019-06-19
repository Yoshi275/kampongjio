import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from '../components/common';
import FullJioDetails from '../components/JioInformation/FullJioDetails';

class JioInformation extends Component {
    render() {
        return(
            <View style={styles.containerStyle}>
                <FullJioDetails />
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