// This js file is the file which will get all the data from axios, to be mapped
// into individual JioDetails. Once we hook up to more data, we need to consider
// changing from ScrollView to SectionList (the latter only renders what is seen
// in the screen)

import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import JioDetails from './JioDetails';

class JioList extends Component {
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