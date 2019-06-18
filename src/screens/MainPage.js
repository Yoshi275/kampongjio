// MainPage is a minimal file that show all the overarching components displayed 
// such as TextInput, JioList, Button and NavBar
// Remember to add onPress as props in Button once Navigation has been figured out

import React, { Component } from 'react';
import { View } from 'react-native';
import JioList from '../components/MainPage/JioList'
import { Input, Button } from '../components/common';

class MainPage extends Component {
    state = { location: ''};

    render() {
        return (
        <View style={styles.containerStyle}>
            <Input 
                placeholder="Where am I?"
                label="Location"
                value={this.state.location}
                onChangeText={location => this.setState({ location })}
            /> 
            <JioList />
            <Button>+  JIO</Button>
        </View>
        );
    }
}

const styles = {
    containerStyle: {
        // flex is so that background color literally covers the whole background
        // can be a potential problems if settings of common components are changes
        // Not sure why the button is able to be at the bottom
        flex: 1,
        backgroundColor: '#2D9B83',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
};

export default MainPage;