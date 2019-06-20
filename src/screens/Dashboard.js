import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { JioDetails } from '../components/MainPage/JioDetails';

class Dashboard extends Component {
    render() {
        const {
            containerStyle
        } = styles;

        return (
            <View style={containerStyle}>
                <JioList></JioList>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#2D9B83',
        flexDirection: 'space-between'
    }
}
export default Dashboard;