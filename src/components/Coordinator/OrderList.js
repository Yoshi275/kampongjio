//Not sure why the ScrollView is not working. Will fix it next time

import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import OrderDetails from './OrderDetails';

class OrderList extends Component {
    

    renderJio = ({item}) => (
        <OrderDetails
            order={this.props.order}
            orderDetails={item[1]}
            jioJoinOrderId={item[0]}
            jioOrderId={this.props.jioOrderId}
        />
    );

    keyExtractor = (item) => (
        item[1].joinerName
    );

    render() {
        return(
            <FlatList 
                data={Object.entries(this.props.order.foodOrders)}
                renderItem={this.renderJio}
                keyExtractor={this.keyExtractor}
            />
        );
    }
    
}

export default OrderList;