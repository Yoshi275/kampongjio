import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import { Button } from '../components/common';
import FullJioDetails from '../components/JioInformation/FullJioDetails';

class JioInformation extends Component {
    render() {
        return(
            <View style={styles.containerStyle}>
                <FullJioDetails />
                <Button onPress={() => { Actions.jioJoinerOrder() }}>
                    + JOIN JIO
                </Button>
            </View>
        );
    };
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#2D9B83',
        justifyContent: 'space-between'
    },
};

export default JioInformation;