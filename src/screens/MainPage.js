// MainPage is a minimal file that show all the overarching components displayed 
// such as TextInput, JioList, Button and NavBar
// Remember to add onPress as props in Button once Navigation has been figured out

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text} from 'react-native';
import JioList from '../components/MainPage/JioList'
import { Input, Button, NavBar } from '../components/common';
import { auth } from '../config';

class MainPage extends Component {
    state = { 
        location: '',
        uid: null,
    }

    componentDidMount() {
        const user = auth.currentUser
        if(user !== null) {
            this.setState({ uid: user.uid })
        }
    }

    render() {
        return (
        <View style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <Text style={styles.textStyle}>All Existing Jios Near You</Text>
            </View>
            <Input 
                placeholder="WORK IN PROGRESS..."
                label="Location"
                value={this.state.location}
                onChangeText={location => this.setState({ location })}
            /> 
            <JioList 
                uid={this.state.uid}
            />
            <Button onPress={() => { Actions.coordinatorCreateJio({
                uid: this.state.uid
            }) }}>
                +  JIO
            </Button>
            <NavBar />
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
    },
    textStyle: {
        fontSize: 20,
        color: '#000000',
        fontWeight: '500',
    },
    headerStyle: {
        backgroundColor: '#8CDCAC',
        opacity: 0.85,
        padding: 15,
    }
};

export default MainPage;