//Not sure why the ScrollView is not working. Will fix it next time

import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import OrderDetails from './OrderDetails';

class OrderList extends Component {
    render() {
        return(
            <ScrollView>
                <OrderDetails />
                <OrderDetails />
            </ScrollView>
        );
    }
}

export default OrderList;