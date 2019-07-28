//Not sure why the ScrollView is not working. Will fix it next time

import React, { Component } from 'react';
import { ScrollView, FlatList, Text, View } from 'react-native';
import OrderDetails from './OrderDetails';

class OrderList extends Component {
    constructor(props) {
        super(props);
        const count = typeof this.props.order.foodOrders != 'undefined' ? Object.keys(this.props.order.foodOrders).length : 0;
        this.state = { jioJoinerNum: count }
    }

    renderJio = ({item}) => (
        <OrderDetails
            order={this.props.order}
            orderDetails={item[1]}
            jioJoinOrderId={item[0]}
            jioOrderId={this.props.jioOrderId}
            jioJoinerNum={this.state.jioJoinerNum}
        />
    );

    keyExtractor = (item) => (
        item[1].joinerName
    );

    renderFoodOrders() {
        if(typeof this.props.order.foodOrders != 'undefined') {
            return(
                <FlatList 
                    data={Object.entries(this.props.order.foodOrders)}
                    renderItem={this.renderJio}
                    keyExtractor={this.keyExtractor}
                />
            )
        } else {
            return(
                <Text style={styles.errorStyle}>There are no orders. Please add your own order.</Text>
            )
        }
    }

    render() {
        return(
            <View>
               { this.renderFoodOrders() }
            </View>

        );
    }
    
}

const styles = {
    errorStyle: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center'
    }
}

export default OrderList;