// This js file is the file which will get all the data from axios, to be mapped
// into individual JioDetails. Once we hook up to more data, we need to consider
// changing from ScrollView to SectionList (the latter only renders what is seen
// in the screen)

import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import JioDetails from './JioDetails';
import firebase from 'firebase';

class JioList extends Component {
    readData() {
        firebase
            .database()
            .ref('kampongjio/allOrders/order1')
            .on('value', function(snapshot) {
                console.log(snapshot.val());
            });
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