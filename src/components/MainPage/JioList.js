// This js file is the file which will get all the data from axios, to be mapped
// into individual JioDetails. Once we hook up to more data, we need to consider
// changing from ScrollView to SectionList (the latter only renders what is seen
// in the screen)

import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import JioDetails from './JioDetails';
import { db } from '../../config';

class JioList extends Component {
    state = { allOrders: {} }

    componentDidMount() { // this adds ALL ORDERS + details eg. this.state.allOrders.order1.store should open "Makisan"
        db
            .ref('/allOrders')
            .on('value', snapshot => {
                let allOrders = snapshot.val();
                this.setState({ allOrders });
                console.log(allOrders);
            })
    }

    render() {
        return(
            <ScrollView>
                <JioDetails />
                <JioDetails />
                <JioDetails />
                <JioDetails />
                <JioDetails />
                <JioDetails />
            </ScrollView>
        );
    }
}

export default JioList;