import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { TimeOrange } from '../common';
import OrderList from './OrderList';

class CoordinatorFullJio extends Component {
    render() {
        const jioStatus = this.props.order.jioStatus === 'jioOpen' ? "Open" : "Closed";
        const jioLocation = this.props.order.jioLocation;
        const jioOpenTime = this.props.order.jioOpenTime;
        const jioCloseTime = this.props.order.jioCloseTime;
        const jioArrivalTime = this.props.order.jioArrivalTime;

        // console.log(this.props.order.foodOrders);
        return(
            <View>
                <Text style={styles.textStyle}>Status : {jioStatus}</Text>
                <Text style={styles.textStyle}>Location : {jioLocation}</Text>
                <TimeOrange>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[styles.textStyle, {color: '#000000'}]}>Jio Open : {jioOpenTime}</Text>
                        <Text style={[styles.textStyle, {color: '#000000'}]}>Jio Close : {jioCloseTime}</Text>
                        <Text style={[styles.textStyle, {color: '#000000'}]}>Arrival Time : {jioArrivalTime}</Text>
                    </View>
                </TimeOrange>
                <Text style={styles.labelStyle}>ORDERS</Text>
                <OrderList foodOrders={this.props.order.foodOrders}/>
            </View>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 18,
        color: '#FFFFFF',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
        marginBottom: 3,
    },
    labelStyle: {
        textAlign: 'center',
        fontSize: 28,
        marginLeft: 10,
        marginRight: 10,
        fontWeight: '400',
        color: '#FFFFFF'
    },
}
export default CoordinatorFullJio;