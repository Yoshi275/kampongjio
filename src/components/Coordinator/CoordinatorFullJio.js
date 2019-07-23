import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { TimeOrange } from '../common';
import OrderList from './OrderList';
import { jioStatusText } from '../../data/jioStatus';
import { Edit } from '../../resources/icons';
import { Actions } from 'react-native-router-flux';

// TODO: Make jioStatus react directly to when the button in Coordinator page is pressed
class CoordinatorFullJio extends Component {
    renderEdit() {
        if (this.props.order.jioStatus === '1jioOpen') {
            return(
                <TouchableOpacity onPress={() => Actions.coordinatorEditJio({ 
                    order: this.props.order,
                    jioOrderId: this.props.jioOrderId })}>
                    <Image 
                        source={Edit}
                        style={styles.editStyle}
                    />
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }

    render() {
        const jioLocation = this.props.order.jioLocation;
        const jioOpenTime = this.props.order.jioOpenTime;
        const jioCloseTime = this.props.order.jioCloseTime;
        const jioArrivalTime = this.props.order.jioArrivalTime;

        // console.log(this.props.order.foodOrders);
        return(
            <View>
                <Text style={styles.textStyle}>Status : {jioStatusText(this.props.order.jioStatus)}</Text>
                <Text style={styles.textStyle}>Location : {jioLocation}</Text>
                <TimeOrange>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', flex: 3}}>
                        <View style={{ flexDirection: 'column'}}>
                            <Text style={[styles.textStyle, {color: '#000000'}]}>Jio Open : {jioOpenTime}</Text>
                            <Text style={[styles.textStyle, {color: '#000000'}]}>Jio Close : {jioCloseTime}</Text>
                            <Text style={[styles.textStyle, {color: '#000000'}]}>Arrival Time : {jioArrivalTime}</Text>
                        </View>
                    { this.renderEdit()}
                    </View>
                </TimeOrange>
                <Text style={styles.labelStyle}>ORDERS</Text>
                <OrderList 
                    order={this.props.order}
                    foodOrders={this.props.order.foodOrders}
                    jioOrderId={this.props.jioOrderId}
                />
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
    editStyle: {
        height: 25,
        width: 25,
    },
}
export default CoordinatorFullJio;