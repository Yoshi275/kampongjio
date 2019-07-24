import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, NavBar, TimeOrange, CardSection } from '../components/common';
import FullJioDetails from '../components/JioInformation/FullJioDetails';

class JioInformation extends Component {
    calcPrice() {
        const count = Object.keys(this.props.order.foodOrders).length;
        const eachDelivery = parseFloat(this.props.order.deliveryCost) / count;
        const disc = (100 - parseFloat(this.props.order.discount)) / 100;
        const paidPrice = parseFloat(this.props.orderDetails.price) * disc + eachDelivery;
        const priceString = '$' + paidPrice.toFixed(2);
        return priceString;
    }
    
    renderOrder() {
        const {
            containerOrderStyle, 
            titleStyle, 
            textStyle
        } = styles;

        if (this.props.fromDashboard) {
            return(
                <View style={containerOrderStyle}>
                    <Text style={titleStyle}>YOUR ORDER</Text>
                    <CardSection>
                        <View style={{ flex: 5 }}>
                            {this.props.orderDetails.foodChoices.map(foodChoices => 
                            <Text 
                                style={styles.textStyle}
                                key={this.props.orderDetails.joinerName + ' ' + foodChoices}
                            >
                                {foodChoices}
                            </Text>)}
                        </View>
                        <Text style={[textStyle, { flex: 1 }]}>{this.calcPrice()}</Text>
                    </CardSection>
                </View>
            );
        }
    }

    renderButton() {
        if (this.props.fromDashboard) {
            if (this.props.order.jioStatus === '1jioOpen') {
                return(
                    <Button onPress={() => Actions.jioJoinerEditOrder({
                        order: this.props.order,
                        jioOrderId: this.props.jioOrderId,
                        jioJoinOrderId: this.props.jioJoinOrderId,
                        orderDetails: this.props.orderDetails
                    })}>
                        EDIT ORDER
                    </Button>
                );
            } 
        } else {
            return(
                <Button onPress={() => { Actions.jioJoinerOrder({ 
                    order : this.props.order, 
                    jioOrderId: this.props.jioOrderId,
                    uid: this.props.uid
                }) }}>
                    + JOIN JIO
                </Button>
            );
        }
    }

    render() {
        return(
            <View style={styles.containerStyle}>
                <ScrollView>
                    <FullJioDetails order={this.props.order}/>
                    <TimeOrange>
                        <View style={{flex: 3}}>
                            <View style={{ flexDirection: 'column'}}>
                                <Text style={styles.textStyle}>Jio Open : {this.props.order.jioOpenTime}</Text>
                                <Text style={styles.textStyle}>Jio Close : {this.props.order.jioCloseTime}</Text>
                                <Text style={styles.textStyle}>Arrival Time : {this.props.order.jioArrivalTime}</Text>
                            </View>
                        </View>
                    </TimeOrange>
                    {this.renderOrder()}
                </ScrollView>
                <View>
                    {this.renderButton()}
                    <NavBar />
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#2D9B83',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    textStyle: {
        fontSize: 18,
        color: '#000000',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
        marginBottom: 3,
    },
    containerOrderStyle: {
        borderWidth: 1,
        backgroundColor: '#FF7058',
        marginBottom: 5,
    },
    titleStyle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
};

export default JioInformation;