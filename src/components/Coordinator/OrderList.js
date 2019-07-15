//Not sure why the ScrollView is not working. Will fix it next time

import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import OrderDetails from './OrderDetails';

class OrderList extends Component {
    render() {
        // console.log(this.props.foodOrders);
        return(
            // <ScrollView>
            //     <OrderDetails />
            //     <OrderDetails />
            //     {/* TODO: Dynamically render all orders from this.props.foodOrders (returning an array) */}
            // </ScrollView>
            <FlatList 
                data={Object.entries(this.props.foodOrders)}
                renderItem={({item}) => (
                    <OrderDetails
                        orderDetails={item[1]}
                        foodOrderId={item[0]}
                    />
                )}
                keyExtractor={order => order.joinerName}
            />
        ); 
    }
    
}

// <FlatList 
            //     data={}
            // />
export default OrderList;