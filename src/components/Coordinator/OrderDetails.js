import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { Card, CardSection } from '../common';

class OrderDetails extends Component {
    state = {paid : this.props.orderDetails.hasPaid, collected : this.props.orderDetails.hasCollected}
    
    componentDidUpdate() {

    }

    handleSubmit() {
        let postData = {
            hasPaid: this.state.hasPaid,
            hasCollected: this.state.hasCollected
        }

        const jioOrderId = this.props.jioOrderId;
        const jioJoinOrderId = this.props.jioJoinOrderId;
        let dbLocation = '/allOrders/' + jioOrderId + '/foodOrders/' + jioJoinOrderId + '/';

        db
            .ref(dbLocation)
            .push(postData)
            .then((success) => {
                console.log('Success Message: ', success) // success callback
                Actions.mainPage(); // TODO: Add some way to confirm that order has been made/switch to dashboard when it's ready
            })
            .catch((error) => {
                console.log('Error Message: ', error) // error callback
            })
    }

    renderOrders() {
        return this.props.orderDetails.foodChoices.map(foodChoices => 
            <Text style={styles.textStyle}>{foodChoices}</Text>);
    }
    
    render() {
        const {
            textStyle,
            titleStyle,
            containerStyle,
            switchStyle,
            cardSectionStyle
        } = styles;

        console.log(this.props.orderDetails);
        return (
            <View style={containerStyle}>
                <Text>{this.props.jioJoinOrderId}</Text>
                <Text>{this.props.jioOrderId}</Text>
                <Text style={titleStyle}>{this.props.orderDetails.joinerName}</Text>
                <CardSection>
                    <View style={{ flex: 7 }}>
                        {this.renderOrders()}
                    </View>
                    <Text style={[textStyle, { flex: 1 }]}>{this.props.orderDetails.price}</Text>
                </CardSection>
                <CardSection>
                    <CardSection style={cardSectionStyle}>
                        <Text style={[titleStyle, { fontWeight:'normal' }]}>PAID</Text>
                        <Switch 
                            style={switchStyle}
                            value={this.state.paid} 
                            onValueChange={() => this.setState({ paid: true })}
                        />
                    </CardSection>
                    <CardSection style={cardSectionStyle}>
                        <Text style={[titleStyle, { fontWeight:'normal' }]}>COLLECTED</Text>
                        <Switch 
                            style={switchStyle}
                            value={this.state.collected} 
                            onValueChange={() => this.setState({ collected: true })}
                        />
                    </CardSection>
                </CardSection>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        borderWidth: 1,
        backgroundColor: '#FF7058',
        marginBottom: 5,
    },
    titleStyle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    textStyle: {
        fontSize: 18,
        color: '#000000',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
        marginBottom: 3,
    },
    switchStyle: {
        size: 22,
        marginLeft: 5,
        marginRight: 5
    },
    cardSectionStyle: {
        padding: 0
    }
};

export default OrderDetails;