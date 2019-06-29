import React, { Component } from 'react';
import { View, Text } from 'react-native';
import InitiatedDetails from '../Dashboard/InitiatedDetails';

class Initiated extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.titleStyle}>~~~Your Initiated Jios~~~</Text>
                <InitiatedDetails />
            </View>
        );
    }
}

const styles = {
    containerStyle : {
        backgroundColor: '#FF7058',
        paddingBottom: 5,
        paddingTop: 2,
        marginTop: 7,
        borderRadius: 20,
        borderColor: '#F3A462',
        borderWidth: 3,
        shadowColor: '##FF0000',
        // shadowOffset: 3,
        // shadowRadius: 20,
        // shadowOffset: {width: 4, height: 4}

    },
    titleStyle : {
        textAlign: 'center',
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
}
export default Initiated;