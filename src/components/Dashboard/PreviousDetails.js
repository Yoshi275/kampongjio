// This js file is the file which will get all the data from axios, to be mapped
// into individual JioDetails. Once we hook up to more data, we need to consider
// changing from ScrollView to SectionList (the latter only renders what is seen
// in the screen)
// A good resource for fetching local json file and rendering it (in a mapping way)
// https://www.youtube.com/watch?v=5vFgqCfggC0

import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import JioDetails from '../MainPage/JioDetails';
import { db } from '../../config';
import data from '../../data/AllJios.json';

class PreviousDetails extends Component {
    state = { 
        allOrders: {}, 
        orderOne: {}, 
        orderTwo: {}, 
        orderThree: {} 
    };
    
    componentDidMount() { // TODO: somehow pass info on all orders
        db
            .ref('/allOrders')
            .on('value', snapshot => {
                let allOrders = snapshot.val();
                this.setState({ allOrders });
                this.setState({ orderOne: allOrders[0] });
                this.setState({ orderTwo: allOrders[1] });
                this.setState({ orderThree: allOrders[2] });
                this.order = allOrders;
                console.log(this.state.allOrders);
                console.log(this.state.orderOne);
            });
    }

    renderJio() {
        // not in use for now. orders are hardcoded
        return this.state.allOrders.map(order => 
            <JioDetails order={order}/>
        );
            //  <JioDetails print={'print'} order={this.state.orderOne}/>
            // // A new method doesn't allow the rendering of two components {/* <JioDetails print={'print'} order={this.state.allOrders}/> */}
            // );
    }

    render() {
        let order = [];

        return(
            <ScrollView style={styles.containerStyle}>
                {/* { this.renderJio() }  */}
                <JioDetails order={this.state.orderOne} />
                <JioDetails order={this.state.orderTwo} />
                <JioDetails order={this.state.orderThree} />
            </ScrollView>
        );
    }
}

const styles = {
    containerStyle : {
        opacity : 0.8
    }
}

export default PreviousDetails;