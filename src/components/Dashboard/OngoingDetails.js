// This js file is the file which will get all the data from axios, to be mapped
// into individual JioDetails. Once we hook up to more data, we need to consider
// changing from ScrollView to SectionList (the latter only renders what is seen
// in the screen)
// A good resource for fetching local json file and rendering it (in a mapping way)
// https://www.youtube.com/watch?v=5vFgqCfggC0

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import DashboardJioDetails from './DashboardJioDetails';
import { db } from '../../config';
import data from '../../data/AllJios.json';
import Dashboard from '../../screens/Dashboard';

class OngoingDetails extends Component {
    state = { 
        allOrders: {}
    };
    
    componentDidMount() { // TODO: somehow pass info on all orders
        db
            .ref('/allOrders')
            .orderByChild('jioStatus')
            .startAt('jioOpen')
            .endAt('jioOpen')
            .on('value', snapshot => {
                let allOrders = snapshot.val();
                this.setState({ allOrders })
            });
    }

    renderJio = ({item}) => (
        <DashboardJioDetails
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