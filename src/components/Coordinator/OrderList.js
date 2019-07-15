//Not sure why the ScrollView is not working. Will fix it next time

import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import OrderDetails from './OrderDetails';

class OrderList extends Component {
    renderJio = ({item}) => (
        <OrderDetails
            orderDetails={item[1]}
            foodOrderId={item[0]}
        />
    );

    keyExtractor = (item) => (
        item[1].foodOrderNo
    );

    render() {
        return(
            <FlatList 
                data={Object.entries(this.props.foodOrders)}
                renderItem={this.renderJio}
                keyExtractor={this.keyExtractor}
            />
        );
    }
    
}

// <FlatList 
            //     data={}
            // />
export default OrderList;