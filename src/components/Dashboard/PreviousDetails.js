// This js file is the file which will get all the data from axios, to be mapped
// into individual JioDetails. Once we hook up to more data, we need to consider
// changing from ScrollView to SectionList (the latter only renders what is seen
// in the screen)
// A good resource for fetching local json file and rendering it (in a mapping way)
// https://www.youtube.com/watch?v=5vFgqCfggC0

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import JioDetails from '../MainPage/JioDetails';
import { db } from '../../config';

class PreviousDetails extends Component {
    state = { 
        allOrders: {}
    };
    
    componentDidMount() { 
        // TODO: somehow pass info on all orders
        db
            .ref('/allOrders')
            .orderByChild('jioStatus')
            .equalTo('4jioCompleted')
            .on('value', snapshot => {
                // snapshot.forEach((child) => {
                //     console.log(child.val())
                // });
                let allOrders = snapshot.val();
                if ( allOrders === null ) {
                    return null;
                } else {
                    this.setState({ allOrders });
                }
            });
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