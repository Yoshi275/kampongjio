import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PreviousDetails from '../Dashboard/PreviousDetails';

class Previous extends Component {
    render() {
        return(
            <View>
                <Text style={styles.titleStyle}> PREVIOUS JIOS</Text>
                <PreviousDetails />
            </View>
        );
    }
}

const styles = {
    titleStyle: {
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
        borderColor: '#FF7058',
        borderStyle: 'dotted',
        backgroundColor: '#F3A462',
        opacity: 0.9
    }
};

export default Previous;