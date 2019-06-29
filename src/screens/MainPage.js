// MainPage is a minimal file that show all the overarching components displayed 
// such as TextInput, JioList, Button and NavBar
// Remember to add onPress as props in Button once Navigation has been figured out

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import JioList from '../components/MainPage/JioList'
import { Input, Button } from '../components/common';
import Router from './Router';

class MainPage extends Component {
    state = { location: ''};

    render() {
        return (
        <View style={styles.containerStyle}>
            <Input 
                placeholder="Try 'Singapore'"
                label="Location"
                value={this.state.location}
                onChangeText={location => this.setState({ location })}
            /> 
            <JioList />
            <Button onPress={() => { Actions.coordinatorCreateJio() }}>
                +  JIO
            </Button>
        </View>
        );
    }
}

const styles = {
    containerStyle: {
        // flex is so that background color literally covers the whole background
        // can be a potential problems if settings of common components are changes
        flex: 1,
        backgroundColor: '#2D9B83',
        justifyContent: 'space-between'
    }
};

export default MainPage;