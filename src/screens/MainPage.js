// MainPage is a minimal file that show all the overarching components displayed 
// such as TextInput, JioList, Button and NavBar
// Remember to add onPress as props in Button once Navigation has been figured out

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text} from 'react-native';
import JioList from '../components/MainPage/JioList'
import { Input, Button, NavBar } from '../components/common';
import { auth, db } from '../config';

class MainPage extends Component {
    state = { 
        location: '',
        uid: null,
        userData: {}
    }

    // componentDidMount() {
    //     const user = auth.currentUser
    //     if(user != null) {
    //         this.setState({
    //             uid: user.uid,
    //         }, () => {
    //             console.log(this.state.uid)
    //             let dbLocation = '/users/' + this.state.uid + '/';
    //             db
    //             .ref(dbLocation)
    //             .on('value', snapshot => {
    //                 if ( snapshot.val() === null ) {
    //                     console.log('NOTHING GRABBED IN DATA')
    //                     return null;
    //                 } else {
    //                     const data = snapshot.val()
    //                     this.setState({
    //                         userData: {
    //                             displayName: data.displayName,
    //                             username: data.username,
    //                             phoneNumber: data.phoneNumber,
    //                             birthDate: data.birthDate,
    //                             email: data.email,
    //                             photoURL: data.photoURL
    //                         }
    //                     })
    //                     console.log('USER INFO LOADED INTO NAVBAR')
    //                     console.log(this.state.uid)
    //                     console.log(this.state.userData)
    //                 }
    //             });
    //         })
    //     }
    // }

    render() {
        return (
        <View style={styles.containerStyle}>
            <Text>{this.props.uid}</Text>
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
    }
};

export default MainPage;