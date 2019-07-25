import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Switch, TouchableOpacity, Image } from 'react-native';
import { Edit } from '../../resources/icons';
import { db, auth } from '../../config';
import { Card, CardSection } from '../common';

class OrderDetails extends Component {
    state = {
        paid : this.props.orderDetails.hasPaid, 
        collected : this.props.orderDetails.hasCollected,
        uid: null,
        userData: {}
    }

    getUserInfoThenDatabase() {
        const user = auth.currentUser
        if(user != null) {
            this.setState({
                uid: user.uid,
            }, () => {
                let dbLocation = '/users/' + this.state.uid + '/';
                db
                .ref(dbLocation)
                .on('value', snapshot => {
                    if ( snapshot.val() === null ) {
                        console.log('NOTHING GRABBED IN DATA')
                        return null;
                    } else {
                        const data = snapshot.val()
                        this.setState({
                            userData: {
                                displayName: data.displayName,
                                username: data.username,
                                phoneNumber: data.phoneNumber,
                                birthDate: data.birthDate,
                                email: data.email,
                                photoURL: data.photoURL
                            }
                        })
                        console.log('USER INFO LOADED INTO INITIATED')
                    }
                });
            })
        }
    }
    
    componentDidMount() {
        this.getUserInfoThenDatabase()
    }

    componentDidUpdate() {
        this.handleSubmit()
    }

    calcPrice() {
        // TODO: account for minimum order in future. for now it's assumed that it hits minimum order
        const count = parseFloat(this.props.jioJoinerNum);
        const eachDelivery = parseFloat(this.props.order.deliveryCost) / count;
        const disc = (100 - parseFloat(this.props.order.discount)) / 100;
        const foodOrders = Object.values(this.props.order.foodOrders);
        let totalPrice = 0.00;
        for(let i = 0; i < foodOrders.length; i++) {
            totalPrice += parseFloat(foodOrders[i].price)
        }
        const isDiscountApplied = totalPrice >= parseFloat(this.props.order.minOrder)
        const paidPrice = isDiscountApplied
            ? parseFloat(this.props.orderDetails.price) * disc + eachDelivery
            : parseFloat(this.props.orderDetails.price) + eachDelivery
        // const paidPrice = parseFloat(this.props.orderDetails.price) * disc + eachDelivery;
        const priceString = '$' + paidPrice.toFixed(2);
        return priceString;
    }

    handleSubmit() {
        let postData = {
            hasPaid: this.state.paid,
            hasCollected: this.state.collected
        }

        const jioOrderId = this.props.jioOrderId;
        const jioJoinOrderId = this.props.jioJoinOrderId;
        let dbLocation = '/allOrders/' + jioOrderId + '/foodOrders/' + jioJoinOrderId + '/';

        db
            .ref(dbLocation)
            .update(postData)
            .then((success) => {
                console.log('Success Message: ', success) // success callback
            })
            .catch((error) => {
                console.log('Error Message: ', error) // error callback
            })
    }

    renderEdit() {
        if (this.props.orderDetails.joinerName === this.state.userData.displayName) {
            if(this.props.order.jioStatus === '1jioOpen') {
                return (
                    <TouchableOpacity onPress={() => Actions.jioJoinerEditOrder({ 
                        orderDetails: this.props.orderDetails,
                        order: this.props.order,
                        jioJoinOrderId: this.props.jioJoinOrderId,
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
        } else {
            return null;
        }
    }

    renderOrders() {
        // console.log(this.props.orderDetails.foodChoices);
        if ( this.props.orderDetails.foodChoices === null ) {
            return null;
        } else {
        return this.props.orderDetails.foodChoices.map(foodChoices => 
            <Text 
                style={styles.textStyle}
                key={this.props.orderDetails.joinerName + ' ' + foodChoices}
            >
                {foodChoices}
            </Text>
            );
        }
    }

    renderSpecialRequest() {
        const specialRequests = this.props.orderDetails.specialRequests;
        if(specialRequests != '') {
            return(
                <CardSection>
                    <View style={styles.specialReqStyle}>
                        <Text style={[styles.textStyle, {fontStyle: 'italic'}]}>
                            REQUEST: {specialRequests}
                        </Text>
                    </View>
                </CardSection>
            );
        }
    }

    renderPaidCompleted() {
        const {
            switchStyle,
            titleStyle
        } = styles

        if (this.props.orderDetails.joinerName === this.state.userData.displayName) {
            return null;
        } else {
            return (
                <CardSection>
                    <CardSection>
                        <Text style={[titleStyle, { fontWeight:'normal' }]}>PAID</Text>
                        <Switch 
                            style={switchStyle}
                            value={this.state.paid} 
                            onValueChange={() => this.setState({ paid: true })}
                        />
                    </CardSection>
                    <CardSection>
                        <Text style={[titleStyle, { fontWeight:'normal' }]}>COLLECTED</Text>
                        <Switch 
                            style={switchStyle}
                            value={this.state.collected} 
                            onValueChange={() => this.setState({ collected: true })}
                        />
                    </CardSection>
                </CardSection>
            );
        }
    }
    
    render() {
        const {
            textStyle,
            titleStyle,
            containerStyle,
            coordinatorStyle
        } = styles;

        // console.log(this.props.orderDetails);
        return (
            <View style={containerStyle}>
                <View style={coordinatorStyle}>
                    <Text style={titleStyle}>{this.props.orderDetails.joinerName}</Text>
                    {this.renderEdit()}
                </View>
                <CardSection>
                    <View style={{ flex: 5 }}>
                        {this.renderOrders()}
                    </View>
                    <Text style={[textStyle, { flex: 1 }]}>{this.calcPrice()}</Text>
                </CardSection>
                {this.renderSpecialRequest()}
                {this.renderPaidCompleted()}
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
    coordinatorStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    editStyle: {
        height: 24,
        width: 24,
    },
    specialReqStyle: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#FF7058'
    }
};

export default OrderDetails;