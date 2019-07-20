import React, { Component } from 'react';
import { FlatList } from 'react-native';
import JioDetails from '../MainPage/JioDetails';
import { db, auth } from '../../config';
import Dashboard from '../../screens/Dashboard';

class OngoingDetails extends Component {
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
                        })
                        console.log('USER INFO LOADED INTO INITIATED')
                        this.getDatabaseInfo()
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
                console.log(allOrders)
                if ( allOrders === null ) {
                    return null;
                } else {
                    let allOrdersArr = Object.values(allOrders)
                    let filteredOrders = []
                    allOrdersArr.forEach((order) => {
                        let orderIncludesUser = false
                        let foodOrdersArr = Object.values(order.foodOrders)
                        console.log(foodOrdersArr)
                        for(let i = 0; i < foodOrdersArr.length; i++) {
                            if(foodOrdersArr[i].joinerName === this.state.userData.displayName) {
                                orderIncludesUser = true
                                console.log('FOOD ORDER ACCEPTED')
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
        <JioDetails
            order={item[1]}
            jioOrderId={item[0]}
        />
    );

    keyExtractor = (item) => (
        item[1].store
    );

    render() {
        return(
            <FlatList 
                data={Object.entries(this.state.allOrders)}
                renderItem={this.renderJio}
                keyExtractor={this.keyExtractor}
            />
        );
    }
}

export default OngoingDetails;