// This js file is the file which will get all the data from axios, to be mapped
// into individual JioDetails. Once we hook up to more data, we need to consider
// changing from ScrollView to SectionList (the latter only renders what is seen
// in the screen)
// A good resource for fetching local json file and rendering it (in a mapping way)
// https://www.youtube.com/watch?v=5vFgqCfggC0

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import DashboardJioDetails from './DashboardJioDetails';
import { auth, db } from '../../config';

class PreviousDetails extends Component {
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
            .equalTo('4jioCompleted')
            .on('value', snapshot => {
                let allOrders = snapshot.val();
                if ( allOrders === null ) {
                    return null;
                } else {
                    let allOrdersArr = Object.entries(allOrders)
                    let filteredOrders = []
                    allOrdersArr.forEach((order) => {
                        let orderIncludesUser = false
                        let foodOrdersArr = Object.values(order[1].foodOrders)
                        for(let i = 0; i < foodOrdersArr.length; i++) {
                            if(foodOrdersArr[i].joinerName === this.state.userData.displayName) {
                                orderIncludesUser = true
                            }
                        }
                        if(orderIncludesUser) {
                            filteredOrders.push(order)
                            console.log('ADDING ORDER TO FILTERED')
                        } else {
                            console.log('IGNORING ORDER')
                        }
                    })
                    this.setState({ allOrders: filteredOrders });
                }
            });
    }
    
    componentDidMount() {
        this.getUserInfoThenDatabase()
    }

    renderJio = ({item}) => (
        <DashboardJioDetails
            order={item[1]}
            jioOrderId={item[0]}
            userData={this.state.userData}
            uid={this.state.uid}
        />
    );

    keyExtractor = (item) => (
        item[1].store
    );

    render() {
        return(
            <FlatList 
                data={this.state.allOrders}
                style={styles.containerStyle}
                renderItem={this.renderJio}
                keyExtractor={this.keyExtractor}
            />
        );
    }
}

const styles = {
    containerStyle : {
        opacity : 0.8
    }
}

export default PreviousDetails;