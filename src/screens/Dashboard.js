import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { NavBar } from '../components/common';
import Ongoing from '../components/Dashboard/Ongoing';
import Previous from '../components/Dashboard/Previous';
import { auth, db } from '../config';

class Dashboard extends Component {
    state = { 
        uid: null,
        userData: {},
        displayName: '',
        username: '',
        phoneNumber: '',
        birthDate: '',
        email: '',
        photoURL: ''
    }

    componentDidMount() {
        const user = auth.currentUser
        if(user != null) {
            this.setState({
                uid: user.uid,
            }, () => {
                console.log(this.state.uid)
                let dbLocation = '/users/' + this.state.uid + '/';
                db
                .ref(dbLocation)
                .on('value', snapshot => {
                    if ( snapshot.val() === null ) {
                        console.log('NOTHING GRABBED IN DATA')
                        return null;
                    } else {
                        const data = snapshot.val()
                        this.setState({
                            userData: {
                                displayName: data.displayName,
                                username: data.username,
                                phoneNumber: data.phoneNumber,
                                birthDate: data.birthDate,
                                email: data.email,
                                photoURL: data.photoURL
                            }
                        })
                        console.log('USER INFO LOADED')
                    }
                });
            })
        }
    }

    render() {
        const {
            containerStyle
        } = styles;

        return (
            <View style={containerStyle}>
                <ScrollView>
                    <Text>{this.state.uid}</Text>
                    <Text>{this.state.userData.username}</Text>
                    <Ongoing />
                    <Previous />
                </ScrollView>
                <NavBar />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#2D9B83',
        justifyContent: 'space-between'
    }
}
export default Dashboard;