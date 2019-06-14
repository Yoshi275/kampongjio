// MainPage is a minimal file that show all the overarching components displayed 
// such as TextInput, JioList, Button and NavBar

import React, { Component } from 'react';
import { View } from 'react-native';
import JioList from '../components/MainPage/JioList'

class MainPage extends Component {
    render() {
        return (
        <View style={styles.containerStyle}>
            <JioList />
        </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#2D9B83'
    }
};

export default MainPage;