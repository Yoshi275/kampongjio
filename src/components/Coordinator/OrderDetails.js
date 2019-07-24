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

    coordinatorState() {
        //this if statement is placed here and not ComponentDidMount because the userData would still be empty in ComponentDidMount()
        console.log(this.state.userData.displayName);
        if (this.props.orderDetails.joinerName === this.state.userData.displayName) {
            this.setState({paid: true, collected: true})
            console.log(this.state.paid);
            console.log(this.state.userData.displayName);
        } else {
            return null;
        }
    }
    calcPrice() {
        const count = parseFloat(this.props.jioJoinerNum);
        const eachDelivery = parseFloat(this.props.order.deliveryCost) / count;
        const paidPrice = parseFloat(this.props.orderDetails.price) + eachDelivery;
        const priceString = '$' +paidPrice.toFixed(2);
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
                    <TouchableOpacity onPress={() => Actions.jioJoinerEditOrder({ orderDetails: this.props.orderDetails, order: this.props.order })}>
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

    renderPaidCompleted() {
        const {
            cardSectionStyle,
            switchStyle,
            titleStyle
        } = styles

        if (this.props.orderDetails.joinerName === this.state.userData.displayName) {
            return null;
        } else {
            return (
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

        this.coordinatorState();
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
};

export default OrderDetails;