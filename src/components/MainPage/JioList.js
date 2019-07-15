// This js file is the file which will get all the data from axios, to be mapped
// into individual JioDetails. Once we hook up to more data, we need to consider
// changing from ScrollView to SectionList (the latter only renders what is seen
// in the screen)
// A good resource for fetching local json file and rendering it (in a mapping way)
// https://www.youtube.com/watch?v=5vFgqCfggC0

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import JioDetails from './JioDetails';
import { db } from '../../config';
// import data from '../../data/AllJios.json';

class JioList extends Component {
    state = { 
        allOrders: {}
    };
    
    componentDidMount() { // TODO: somehow pass info on all orders
        db
            .ref('/allOrders')
            .on('value', snapshot => {
                let allOrders = snapshot.val();
                this.setState({ allOrders });
            });
    }

    // renderJio(order) {
    //     // order.item is because renderItem in FlatList, requires index, item and separator
    //     // whereas all the data that we currently want is centred in item. Can make use of the rest
    //     // if time permits
    //     return (
    //         <JioDetails order={item} foodOrderId={index}/>
    //     );
    // }

    render() {
        return(
            <FlatList 
                data={Object.entries(this.state.allOrders)}
                // renderItem={this.renderJio({item, index})}
                renderItem={({item, index}) => (
                    <JioDetails
                        order={item[1]}
                        foodOrderId={item[0]}
                    />
                )}
                keyExtractor={order => order.store}
            />
        );
    }
}

export default JioList;