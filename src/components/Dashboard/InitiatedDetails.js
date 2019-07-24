// This js file is the file which will get all the data from axios, to be mapped
// into individual JioDetails. Once we hook up to more data, we need to consider
// changing from ScrollView to SectionList (the latter only renders what is seen
// in the screen)
// A good resource for fetching local json file and rendering it (in a mapping way)
// https://www.youtube.com/watch?v=5vFgqCfggC0
// Strangely also following DashboardJioDetails even though I did not want it to

import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import JioDetails from '../MainPage/JioDetails';
import { auth, db } from '../../config';

class InitiatedDetails extends Component {
    state = { 
        allOrders: {},
        uid: null,
        userData: {}
    };

    getUserInfoThenDatabase() {
        const user = auth.currentUser
        if(user != null) {
            this.setState({
                uid: user.uid,
            }, () => {
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
                        }, () => {
                            console.log('USER INFO LOADED INTO INITIATED')
                            this.getDatabaseInfo()
                        })
                    }
                });
            })
        }
    }

    getDatabaseInfo() {
        db
            .ref('/allOrders')
            .orderByChild('jioStatus')
            .startAt('1jioOpen')
            .endAt('3jioArrived')
            .on('value', snapshot => {
                let allOrders = snapshot.val();
                if ( allOrders === null ) {
                    return null;
                } else {
                    let allOrdersArr = Object.entries(allOrders)
                    let filteredOrders = []
                    allOrdersArr.forEach((order) => {
                        if(order[1].coordinatorName === this.state.userData.displayName) {
                            filteredOrders.push(order)
                    }})
                    this.setState({ allOrders: filteredOrders });
                } 
            });
    }
    
    componentDidMount() { 
        this.getUserInfoThenDatabase()
    }
    
    renderJio = ({item}) => (
        <JioDetails
            order={item[1]}
            jioOrderId={item[0]}
            fromDashboard={true}
        />
    );

    keyExtractor = (item) => (
        item[1].store // TODO: Change to an actually unique key. This isn't unique.
    );

    render() {
        return(
            <View>
                <FlatList 
                    data={this.state.allOrders}
                    renderItem={this.renderJio}
                    keyExtractor={this.keyExtractor}
                />
            </View>
        );
    }
}

export default InitiatedDetails;