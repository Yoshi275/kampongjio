import React, { Component } from 'react';
import { View, Text } from 'react-native';
import OngoingDetails from '../Dashboard/OngoingDetails';
import Initiated from './Initiated';

class Ongoing extends Component {
    render() {
        return (
            <View>
                <Text style={styles.titleStyle}>ONGOING</Text>
                <Initiated />
                <OngoingDetails />
            </View>
        );
    }
}

const styles = {
    titleStyle: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 32,
        color: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 50,
        marginRight: 50,
        borderColor: '#FF7058',
        backgroundColor: '#F3A462',
    }
};

export default Ongoing;